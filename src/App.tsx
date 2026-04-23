import { useEffect, useMemo, useState } from 'react';
import { fetchChartThumbnails } from './api/mockCharts';
import { ChartGrid } from './components/ChartGrid';
import { ChartModal } from './components/ChartModal';
import { AppSidebar } from './components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import type { ChartThumbnail } from './types/chart';

export default function App() {
  const [items, setItems] = useState<ChartThumbnail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<ChartThumbnail | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let alive = true;

    fetchChartThumbnails().then((next) => {
      if (!alive) return;
      setItems(next);
      setLoading(false);
    });

    return () => {
      alive = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const normalized = query.toLowerCase();
    return items.filter((item) => item.title.toLowerCase().includes(normalized));
  }, [items, query]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-h-full bg-slate-50 flex-1 w-full overflow-auto">
        <div className="mx-auto max-w-[1800px] p-4 md:p-6">
          <header className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-3">
              <SidebarTrigger className="-ml-2 mt-1" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Chart Thumbnail Explorer</h1>
                <p className="text-sm text-slate-500">
                  Preview first, then open one Plotly WebGL chart in a modal when needed.
                </p>
              </div>
            </div>

          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search chart title"
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none ring-0 md:w-72"
          />
        </header>

        <section className="mb-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600 shadow-sm">
          <div className="font-medium text-slate-900">PoC structure</div>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Grid and chart are split into React components.</li>
            <li>Thumbnails come from a mock async API that returns image URLs.</li>
            <li>Only the selected card mounts a live Plotly <code>scattergl</code> chart.</li>
          </ul>
        </section>

        {loading ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 15 }, (_, index) => (
              <div key={index} className="h-52 animate-pulse rounded-xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : (
          <ChartGrid items={filtered} onOpen={setSelected} />
        )}
      </div>

      <ChartModal item={selected} onClose={() => setSelected(null)} />
      </main>
    </SidebarProvider>
  );
}
