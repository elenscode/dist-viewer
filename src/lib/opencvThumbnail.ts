import { buildThumbnailLines, hashSeed } from './chartData';

type OpenCvRuntime = {
  Mat: new (...args: unknown[]) => { delete: () => void };
  Point: new (x: number, y: number) => unknown;
  Scalar: new (v0: number, v1: number, v2: number, v3?: number) => unknown;
  CV_8UC4: number;
  FONT_HERSHEY_SIMPLEX: number;
  line: (...args: unknown[]) => void;
  rectangle: (...args: unknown[]) => void;
  putText: (...args: unknown[]) => void;
  imshow: (canvas: HTMLCanvasElement, mat: unknown) => void;
  onRuntimeInitialized?: () => void;
};

const THUMBNAIL_WIDTH = 240;
const THUMBNAIL_HEIGHT = 120;
const PLOT_LEFT = 18;
const PLOT_TOP = 18;
const PLOT_RIGHT = 12;
const PLOT_BOTTOM = 20;
const DOWNSAMPLED_LINE_COUNT = 8;
const DOWNSAMPLED_POINT_COUNT = 24;
const LINE_8 = 8;

let openCvPromise: Promise<OpenCvRuntime> | null = null;

async function loadOpenCv(): Promise<OpenCvRuntime> {
  if (!openCvPromise) {
    openCvPromise = import('@techstark/opencv-js').then(async (module) => {
      const candidate = (module as { default?: unknown }).default ?? module;

      if (candidate instanceof Promise) {
        return (await candidate) as OpenCvRuntime;
      }

      const cv = candidate as OpenCvRuntime;
      if (typeof cv.Mat === 'function') return cv;

      await new Promise<void>((resolve) => {
        cv.onRuntimeInitialized = () => resolve();
      });

      return cv;
    });
  }

  return openCvPromise;
}

function drawLineSegments(cv: OpenCvRuntime, mat: unknown, id: string) {
  const seed = hashSeed(id);
  const color = new cv.Scalar(37, 99, 235, 96);
  const lines = buildThumbnailLines(id, THUMBNAIL_WIDTH - PLOT_LEFT - PLOT_RIGHT, THUMBNAIL_HEIGHT - PLOT_TOP - PLOT_BOTTOM, {
    maxLines: DOWNSAMPLED_LINE_COUNT,
    maxPoints: DOWNSAMPLED_POINT_COUNT,
  });

  lines.forEach((line, lineIndex) => {
    for (let index = 1; index < line.length; index += 1) {
      const previous = line[index - 1];
      const current = line[index];
      const jitter = ((seed >> (lineIndex % 10)) % 7) - 3;

      cv.line(
        mat,
        new cv.Point(Math.round(previous.x + PLOT_LEFT), Math.round(previous.y + PLOT_TOP + jitter)),
        new cv.Point(Math.round(current.x + PLOT_LEFT), Math.round(current.y + PLOT_TOP + jitter)),
        color,
        1,
        LINE_8,
      );
    }
  });
}

export async function buildOpenCvThumbnailPng(id: string): Promise<string> {
  const cv = await loadOpenCv();
  const source = new cv.Mat(
    THUMBNAIL_HEIGHT,
    THUMBNAIL_WIDTH,
    cv.CV_8UC4,
    new cv.Scalar(255, 255, 255, 255),
  );
  const canvas = document.createElement('canvas');

  canvas.width = THUMBNAIL_WIDTH;
  canvas.height = THUMBNAIL_HEIGHT;

  try {
    cv.rectangle(
      source,
      new cv.Point(PLOT_LEFT, PLOT_TOP),
      new cv.Point(THUMBNAIL_WIDTH - PLOT_RIGHT, THUMBNAIL_HEIGHT - PLOT_BOTTOM),
      new cv.Scalar(226, 232, 240, 255),
      1,
      LINE_8,
    );
    cv.line(
      source,
      new cv.Point(PLOT_LEFT, THUMBNAIL_HEIGHT - PLOT_BOTTOM),
      new cv.Point(THUMBNAIL_WIDTH - PLOT_RIGHT, THUMBNAIL_HEIGHT - PLOT_BOTTOM),
      new cv.Scalar(203, 213, 225, 255),
      1,
      LINE_8,
    );
    cv.line(
      source,
      new cv.Point(PLOT_LEFT, PLOT_TOP),
      new cv.Point(PLOT_LEFT, THUMBNAIL_HEIGHT - PLOT_BOTTOM),
      new cv.Scalar(226, 232, 240, 255),
      1,
      LINE_8,
    );
    cv.putText(
      source,
      'mock',
      new cv.Point(PLOT_LEFT + 4, 13),
      cv.FONT_HERSHEY_SIMPLEX,
      0.32,
      new cv.Scalar(100, 116, 139, 255),
      1,
      LINE_8,
    );

    drawLineSegments(cv, source, id);
    cv.imshow(canvas, source);

    return canvas.toDataURL('image/png');
  } finally {
    source.delete();
  }
}
