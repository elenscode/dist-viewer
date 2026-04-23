import type { ChartThumbnail } from '../types/chart';
import { ChartCard } from './ChartCard';

type ChartGridProps = {
  items: ChartThumbnail[];
  onOpen: (item: ChartThumbnail) => void;
};

export function ChartGrid({ items, onOpen }: ChartGridProps) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
      {items.map((item) => (
        <ChartCard key={item.id} item={item} onOpen={onOpen} />
      ))}
    </div>
  );
}
