import { Checkbox } from '@/components/ui/checkbox';

type CoordinateFilterProps = {
  allCoordinateOptions: string[];
  selectedCoordinates: Set<string>;
  onToggleAll: (checked: boolean) => void;
  onToggleCoordinate: (coordinateKey: string, checked: boolean) => void;
};

export function CoordinateFilter({
  allCoordinateOptions,
  selectedCoordinates,
  onToggleAll,
  onToggleCoordinate,
}: CoordinateFilterProps) {
  const isAllSelected = selectedCoordinates.size === allCoordinateOptions.length;

  return (
    <div className="space-y-2 px-2 pb-2">
      <label className="flex items-center gap-2 text-sm">
        <Checkbox checked={isAllSelected} onCheckedChange={(checked) => onToggleAll(!!checked)} />
        <span>전체 선택</span>
      </label>
      <div className="max-h-40 overflow-auto rounded-md border border-sidebar-border bg-white p-2">
        <div className="grid grid-cols-2 gap-1">
          {allCoordinateOptions.map((coordinateKey) => {
            const [x, y] = coordinateKey.split(',');
            return (
              <label key={coordinateKey} className="flex items-center gap-2 text-xs">
                <Checkbox
                  checked={selectedCoordinates.has(coordinateKey)}
                  onCheckedChange={(checked) => onToggleCoordinate(coordinateKey, !!checked)}
                />
                <span>
                  ({x},{y})
                </span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
