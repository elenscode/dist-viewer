import Plot from 'react-plotly.js';
import { buildPlotlyFigure } from '../lib/chartData';

type PlotlyChartProps = {
  chartId: string;
};

export function PlotlyChart({ chartId }: PlotlyChartProps) {
  const figure = buildPlotlyFigure(chartId);

  return (
    <Plot
      data={figure.data}
      layout={figure.layout}
      config={{
        responsive: true,
        displaylogo: false,
        scrollZoom: true,
        modeBarButtonsToRemove: ['lasso2d', 'select2d'],
      }}
      useResizeHandler
      className="h-[70vh] w-full"
      style={{ width: '100%', height: '70vh' }}
    />
  );
}
