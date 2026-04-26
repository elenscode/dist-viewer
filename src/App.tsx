import { useMemo, useState } from 'react';
import { fetchChartThumbnails } from './api/mockCharts';
import { ChartFeaturePanel } from './components/ChartFeaturePanel';
import { ChartGrid } from './components/ChartGrid';
import { ChartModal } from './components/ChartModal';
import { AppSidebar } from './components/AppSidebar';
import { SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import type { ChartThumbnail, ProjectFileItem } from './types/chart';

export default function App() {
  const [items, setItems] = useState<ChartThumbnail[]>([]);
  const [loading, setLoading] = useState(false);
  const [projectSelection, setProjectSelection] = useState<Set<string>>(new Set());
  const [chartSelection, setChartSelection] = useState<Set<string>>(new Set());
  const [modalItem, setModalItem] = useState<ChartThumbnail | null>(null);
  const [query, setQuery] = useState('');

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const next = await fetchChartThumbnails(Array.from(projectSelection));
      setItems(next);
      setChartSelection(new Set());
    } finally {
      setLoading(false);
    }
  };

  const toggleProjectItem = (item: ProjectFileItem, checked: boolean) => {
    setProjectSelection((current) => {
      const next = new Set(current);
      const idsToProcess: string[] = [];

      const collectIds = (node: ProjectFileItem) => {
        idsToProcess.push(node.id);
        node.children?.forEach((child) => collectIds(child));
      };

      collectIds(item);

      if (checked) {
        idsToProcess.forEach((id) => next.add(id));
      } else {
        idsToProcess.forEach((id) => next.delete(id));
      }

      return next;
    });
  };

  const toggleChart = (item: ChartThumbnail, checked: boolean) => {
    setChartSelection((current) => {
      const next = new Set(current);
      if (checked) next.add(item.id);
      else next.delete(item.id);
      return next;
    });
  };

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const normalized = query.toLowerCase();
    return items.filter((item) => item.title.toLowerCase().includes(normalized));
  }, [items, query]);

  const selectedCharts = useMemo(
    () => items.filter((item) => chartSelection.has(item.id)),
    [items, chartSelection],
  );

  return (
    <SidebarProvider>
      <AppSidebar
        selectedIds={projectSelection}
        generatedCount={items.length}
        isGenerating={loading}
        onToggleProjectItem={toggleProjectItem}
        onGenerate={handleGenerate}
      />
      <main className="flex min-h-full w-full flex-1 bg-slate-50">
        <div className="min-w-0 flex-1 overflow-auto p-4 md:p-6">
          <div className="mx-auto max-w-[1800px]">
          <header className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="flex items-start gap-3">
              <SidebarTrigger className="-ml-2 mt-1" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Equipment Log Explorer</h1>
                <p className="text-sm text-slate-500">
                  Select mock project files, generate chart thumbnails, then compare selected chart features.
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

        <section className="mb-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase text-slate-500">Project files</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{projectSelection.size}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase text-slate-500">Generated thumbnails</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{items.length}</div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <div className="text-xs font-medium uppercase text-slate-500">Selected charts</div>
            <div className="mt-1 text-2xl font-semibold text-slate-900">{selectedCharts.length}</div>
          </div>
        </section>

        {loading ? (
          <div className="grid grid-cols-1 gap-3 md:grid-cols-3 xl:grid-cols-5">
            {Array.from({ length: 15 }, (_, index) => (
              <div key={index} className="h-52 animate-pulse rounded-xl border border-slate-200 bg-white" />
            ))}
          </div>
        ) : (
          <ChartGrid
            items={filtered}
            selectedIds={chartSelection}
            onToggle={toggleChart}
            onOpen={setModalItem}
          />
        )}
      </div>
        </div>

      <ChartFeaturePanel items={selectedCharts} onClear={() => setChartSelection(new Set())} />
      <ChartModal item={modalItem} onClose={() => setModalItem(null)} />
      </main>
    </SidebarProvider>
  );
}
