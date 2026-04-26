import { Maximize2 } from 'lucide-react';
import type { ChartThumbnail } from '../types/chart';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

type ChartCardProps = {
  item: ChartThumbnail;
  selected: boolean;
  onToggle: (item: ChartThumbnail, checked: boolean) => void;
  onOpen: (item: ChartThumbnail) => void;
};

export function ChartCard({ item, selected, onToggle, onOpen }: ChartCardProps) {
  return (
    <article
      className={`overflow-hidden rounded-lg border bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
        selected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'
      }`}
    >
      <button type="button" className="block w-full text-left" onClick={() => onToggle(item, !selected)}>
        <img src={item.thumbnailUrl} alt={item.title} className="block h-36 w-full bg-slate-50 object-cover" />
      </button>
      <div className="space-y-1 p-3">
        <div className="flex items-start gap-2">
          <div onClick={(event) => event.stopPropagation()}>
            <Checkbox checked={selected} onCheckedChange={(checked) => onToggle(item, !!checked)} />
          </div>
          <button type="button" className="min-w-0 flex-1 text-left" onClick={() => onToggle(item, !selected)}>
            <div className="truncate text-sm font-semibold text-slate-900">{item.title}</div>
            <div className="truncate text-xs text-slate-500">{item.equipment} · {item.signalType}</div>
          </button>
          <Button variant="outline" size="icon-sm" onClick={() => onOpen(item)} aria-label={`Open ${item.title}`}>
            <Maximize2 />
          </Button>
        </div>
        <div className="text-xs text-slate-500">
          {item.lineCount.toLocaleString()} lines · {item.pointCount} points · {item.severity}
        </div>
      </div>
    </article>
  );
}
