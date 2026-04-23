import { useEffect } from 'react';
import type { ChartThumbnail } from '../types/chart';
import { PlotlyChart } from './PlotlyChart';

type ChartModalProps = {
  item: ChartThumbnail | null;
  onClose: () => void;
};

export function ChartModal({ item, onClose }: ChartModalProps) {
  useEffect(() => {
    if (!item) return undefined;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4" onClick={onClose}>
      <div
        className="w-full max-w-7xl rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{item.title}</h2>
            <p className="text-sm text-slate-500">
              {item.lineCount.toLocaleString()} lines × {item.pointCount} points / line
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        <div className="p-4">
          <PlotlyChart chartId={item.id} />
        </div>
      </div>
    </div>
  );
}
