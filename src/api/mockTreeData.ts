export type TreeItem = {
  id: string;
  name: string;
  type: 'file' | 'folder' | 'item';
  children?: TreeItem[];
};

export const MOCK_TREE_DATA: TreeItem[] = [
  {
    id: 'f1',
    name: 'Dashboard Configuration',
    type: 'file',
    children: [
      {
        id: 'g1',
        name: 'Executive Summary',
        type: 'folder',
        children: [
          { id: 'i1', name: 'Revenue Chart', type: 'item' },
          { id: 'i2', name: 'User Growth', type: 'item' },
        ],
      },
      { id: 'i3', name: 'Active Sessions', type: 'item' },
    ],
  },
  {
    id: 'f2',
    name: 'Sales Reports',
    type: 'file',
    children: [
      { id: 'i4', name: 'Q1 Performance', type: 'item' },
      {
        id: 'g2',
        name: 'Forecasts',
        type: 'folder',
        children: [
          { id: 'i5', name: 'Q2 Projections', type: 'item' },
          { id: 'i6', name: 'Annual Review', type: 'item' },
        ],
      },
    ],
  },
  {
    id: 'f3',
    name: 'Marketing Campaigns',
    type: 'file',
    children: [
      { id: 'i7', name: 'Social Media Reach', type: 'item' },
      { id: 'i8', name: 'Email Open Rates', type: 'item' },
      { id: 'i9', name: 'Conversion Funnel', type: 'item' },
    ],
  },
  {
    id: 'f4',
    name: 'System Logs',
    type: 'file',
    children: [
      { id: 'i10', name: 'Error Rates', type: 'item' },
      { id: 'i11', name: 'Latency Metrics', type: 'item' },
    ],
  },
];
