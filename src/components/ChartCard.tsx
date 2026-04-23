import type { ChartThumbnail } from '../types/chart';

type ChartCardProps = {
  item: ChartThumbnail;
  onOpen: (item: ChartThumbnail) => void;
};

export function ChartCard({ item, onOpen }: ChartCardProps) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className="overflow-hidden rounded-xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <img src={item.thumbnailUrl} alt={item.title} className="block h-36 w-full bg-slate-50 object-cover" />
      <div className="space-y-1 p-3">
        <div className="text-sm font-semibold text-slate-900">{item.title}</div>
        <div className="text-xs text-slate-500">
          {item.lineCount.toLocaleString()} lines · {item.pointCount} points
        </div>
      </div>
    </button>
  );
}
