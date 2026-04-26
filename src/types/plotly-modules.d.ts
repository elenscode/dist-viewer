declare module 'plotly.js' {
  export type Data = Record<string, unknown>;
  export type Layout = Record<string, unknown>;
}

declare module 'react-plotly.js' {
  import type { ComponentType } from 'react';

  type PlotProps = {
    data: unknown[];
    layout?: Record<string, unknown>;
    config?: Record<string, unknown>;
    useResizeHandler?: boolean;
    className?: string;
    style?: Record<string, unknown>;
  };

  const Plot: ComponentType<PlotProps>;
  export default Plot;
}
