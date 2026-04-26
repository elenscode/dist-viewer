import type { ChartThumbnail } from '../types/chart';

type ChartFeaturePanelProps = {
  items: ChartThumbnail[];
  onClear: () => void;
};

export function ChartFeaturePanel({ items, onClear }: ChartFeaturePanelProps) {
  if (items.length === 0) return null;

  return (
    <aside className="w-full shrink-0 border-t border-slate-200 bg-white lg:w-[420px] lg:border-l lg:border-t-0">
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div>
          <h2 className="text-sm font-semibold text-slate-900">Selected Chart Features</h2>
          <p className="text-xs text-slate-500">{items.length} selected charts</p>
        </div>
        <button type="button" className="text-xs font-medium text-slate-500 hover:text-slate-900" onClick={onClear}>
          Clear
        </button>
      </div>

      <div className="max-h-[calc(100vh-9rem)] overflow-auto">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 text-left text-xs">
          <thead className="sticky top-0 bg-slate-50 text-slate-500">
            <tr>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Chart</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Equipment</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Signal</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Severity</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Mean</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Peak</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Drift</th>
              <th className="border-b border-slate-200 px-3 py-2 font-medium">Anomaly</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="odd:bg-white even:bg-slate-50/70">
                <td className="max-w-52 border-b border-slate-100 px-3 py-2">
                  <div className="truncate font-medium text-slate-900">{item.title}</div>
                  <div className="truncate text-slate-500">{item.projectPath}</div>
                </td>
                <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{item.equipment}</td>
                <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{item.signalType}</td>
                <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{item.severity}</td>
                <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{item.mean}</td>
                <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{item.peak}</td>
                <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{item.driftPct}%</td>
                <td className="border-b border-slate-100 px-3 py-2 text-slate-700">{item.anomalyScore}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </aside>
  );
}
