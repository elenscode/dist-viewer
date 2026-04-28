import { useMemo, useState } from 'react';
import type { ChartThumbnail } from '../types/chart';

type ChartFeaturePanelProps = {
  items: ChartThumbnail[];
  onClear: () => void;
};

type FeatureTab = 'signal' | 'ml';

type ChartMlInsight = {
  anomalyScore: number;
  anomalyBand: 'Low' | 'Medium' | 'High' | 'Critical';
  clusterLabel: string;
  clusterDistance: number;
  autoEncoderLoss: number;
  lstmForecastError: number;
  confidence: number;
};

function buildMlInsight(item: ChartThumbnail): ChartMlInsight {
  const anomalyBand: ChartMlInsight['anomalyBand'] =
    item.anomalyScore >= 0.85
      ? 'Critical'
      : item.anomalyScore >= 0.65
        ? 'High'
        : item.anomalyScore >= 0.4
          ? 'Medium'
          : 'Low';

  const clusterLabel =
    item.anomalyScore >= 0.8
      ? 'Cluster C · Fault'
      : Math.abs(item.driftPct) >= 3.5
        ? 'Cluster B · Drift'
        : 'Cluster A · Stable';

  const clusterDistance = Number((Math.abs(item.driftPct) * 0.11 + item.anomalyScore * 0.89).toFixed(3));
  const autoEncoderLoss = Number((item.anomalyScore * 0.72 + Math.abs(item.driftPct) * 0.04).toFixed(3));
  const lstmForecastError = Number((Math.abs(item.driftPct) * 0.17 + item.anomalyScore * 0.38).toFixed(3));
  const confidence = Number(
    (Math.min(0.99, 0.62 + item.anomalyScore * 0.28 + (item.severity === 'Critical' ? 0.08 : 0))).toFixed(2),
  );

  return {
    anomalyScore: item.anomalyScore,
    anomalyBand,
    clusterLabel,
    clusterDistance,
    autoEncoderLoss,
    lstmForecastError,
    confidence,
  };
}

export function ChartFeaturePanel({ items, onClear }: ChartFeaturePanelProps) {
  const [activeTab, setActiveTab] = useState<FeatureTab>('signal');

  const mlInsights = useMemo(() => items.map((item) => buildMlInsight(item)), [items]);

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

      <div className="flex gap-2 border-b border-slate-200 px-3 py-2">
        <button
          type="button"
          onClick={() => setActiveTab('signal')}
          className={`rounded-md px-3 py-1 text-xs font-medium transition ${
            activeTab === 'signal' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
        >
          Signal Features
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('ml')}
          className={`rounded-md px-3 py-1 text-xs font-medium transition ${
            activeTab === 'ml' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100'
          }`}
        >
          ML / DL Metrics
        </button>
      </div>

      <div className="max-h-[calc(100vh-11.5rem)] overflow-auto">
        {activeTab === 'signal' ? (
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
        ) : (
          <div className="space-y-3 p-3">
            {items.map((item, index) => {
              const insight = mlInsights[index];

              return (
                <article key={item.id} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="truncate text-xs font-semibold text-slate-900">{item.title}</h3>
                      <p className="truncate text-[11px] text-slate-500">{item.equipment}</p>
                    </div>
                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-[11px] font-medium text-indigo-700">
                      {insight.clusterLabel}
                    </span>
                  </div>

                  <dl className="grid grid-cols-2 gap-x-3 gap-y-2 text-[11px]">
                    <div>
                      <dt className="text-slate-500">Anomaly score</dt>
                      <dd className="font-medium text-slate-900">
                        {insight.anomalyScore} ({insight.anomalyBand})
                      </dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Cluster distance</dt>
                      <dd className="font-medium text-slate-900">{insight.clusterDistance}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">AutoEncoder loss</dt>
                      <dd className="font-medium text-slate-900">{insight.autoEncoderLoss}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">LSTM forecast error</dt>
                      <dd className="font-medium text-slate-900">{insight.lstmForecastError}</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Model confidence</dt>
                      <dd className="font-medium text-slate-900">{(insight.confidence * 100).toFixed(0)}%</dd>
                    </div>
                    <div>
                      <dt className="text-slate-500">Severity prior</dt>
                      <dd className="font-medium text-slate-900">{item.severity}</dd>
                    </div>
                  </dl>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
