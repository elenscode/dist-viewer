const MOCK_BACKEND_IMAGE_DELAY_MS = 20;

function colorFromSeed(seed: number) {
  const hue = seed % 360;
  const accent = (hue + 42) % 360;
  return {
    primary: `hsl(${hue}, 70%, 52%)`,
    accent: `hsl(${accent}, 78%, 46%)`,
  };
}

function encodeSvg(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function buildMockThumbnailSvg(chartId: string, title: string, seed: number) {
  const { primary, accent } = colorFromSeed(seed);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360" role="img" aria-label="${title}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>
    <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${primary}" />
      <stop offset="100%" stop-color="${accent}" />
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#bg)" rx="14" />
  <g opacity="0.24" stroke="#cbd5e1" stroke-width="1">
    <line x1="0" y1="70" x2="640" y2="70" />
    <line x1="0" y1="140" x2="640" y2="140" />
    <line x1="0" y1="210" x2="640" y2="210" />
    <line x1="0" y1="280" x2="640" y2="280" />
  </g>
  <path d="M 0 210 C 70 120, 120 240, 190 180 S 330 90, 420 165 S 560 245, 640 130" fill="none" stroke="url(#line)" stroke-width="5" stroke-linecap="round"/>
  <circle cx="190" cy="180" r="8" fill="${primary}" />
  <circle cx="420" cy="165" r="8" fill="${accent}" />
  <text x="22" y="34" fill="#e2e8f0" font-size="20" font-family="Inter,Segoe UI,Arial,sans-serif">Mock backend thumbnail</text>
  <text x="22" y="330" fill="#94a3b8" font-size="16" font-family="Inter,Segoe UI,Arial,sans-serif">${chartId}</text>
</svg>`;
}

/**
 * Mock backend API boundary for thumbnail images.
 * Replace this with a real `fetch('/api/chart-thumbnails/:id')` call when backend is available.
 */
export async function fetchMockThumbnailImage(params: {
  chartId: string;
  title: string;
  seed: number;
}): Promise<string> {
  await new Promise((resolve) => window.setTimeout(resolve, MOCK_BACKEND_IMAGE_DELAY_MS));

  return encodeSvg(buildMockThumbnailSvg(params.chartId, params.title, params.seed));
}
