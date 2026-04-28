import { useCallback, useDeferredValue, useMemo, useState } from 'react';
import { Folder, Images, Search } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MOCK_TREE_DATA } from '@/api/mockTreeData';
import type { ProjectFileItem } from '@/types/chart';
import { CoordinateFilter } from '@/components/CoordinateFilter';
import { TreeNode } from '@/components/TreeNode';

type AppSidebarProps = {
  selectedIds: Set<string>;
  generatedCount: number;
  isGenerating: boolean;
  onToggleProjectItem: (item: ProjectFileItem, checked: boolean) => void;
  onGenerate: () => void;
};

export function AppSidebar({
  selectedIds,
  generatedCount,
  isGenerating,
  onToggleProjectItem,
  onGenerate,
}: AppSidebarProps) {
  const [query, setQuery] = useState('');
  const allCoordinateOptions = useMemo(() => {
    const coordinates = new Set<string>();
    const collectCoordinates = (items: ProjectFileItem[]) => {
      items.forEach((item) => {
        if (item.coordinate) {
          coordinates.add(`${item.coordinate.x},${item.coordinate.y}`);
        }
        if (item.children) {
          collectCoordinates(item.children);
        }
      });
    };
    collectCoordinates(MOCK_TREE_DATA);
    return Array.from(coordinates).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  }, []);
  const [selectedCoordinates, setSelectedCoordinates] = useState<Set<string>>(
    () => new Set(allCoordinateOptions),
  );
  const deferredQuery = useDeferredValue(query);
  const hasActiveQuery = deferredQuery.trim().length > 0;
  const handleToggle = useCallback(
    (item: ProjectFileItem, checked: boolean) => onToggleProjectItem(item, checked),
    [onToggleProjectItem],
  );
  const handleToggleAllCoordinates = useCallback(
    (checked: boolean) => {
      setSelectedCoordinates(checked ? new Set(allCoordinateOptions) : new Set());
    },
    [allCoordinateOptions],
  );
  const handleToggleCoordinate = useCallback((coordinateKey: string, checked: boolean) => {
    setSelectedCoordinates((current) => {
      const next = new Set(current);
      if (checked) {
        next.add(coordinateKey);
      } else {
        next.delete(coordinateKey);
      }
      return next;
    });
  }, []);

  const filteredData = useMemo(() => {
    const lowerQuery = deferredQuery.toLowerCase();
    const hasCoordinateFilter = selectedCoordinates.size > 0;

    const filterItems = (items: ProjectFileItem[]): ProjectFileItem[] => {
      return items.reduce<ProjectFileItem[]>((acc, item) => {
        const queryMatches = !hasActiveQuery || item.name.toLowerCase().includes(lowerQuery);
        const coordinateKey = item.coordinate ? `${item.coordinate.x},${item.coordinate.y}` : null;
        const coordinateMatches = !coordinateKey || (hasCoordinateFilter && selectedCoordinates.has(coordinateKey));
        const filteredChildren = item.children ? filterItems(item.children) : [];
        const itemMatches = queryMatches && coordinateMatches;

        if (itemMatches) {
          acc.push(item);
        } else if (filteredChildren.length > 0) {
          acc.push({ ...item, children: filteredChildren });
        }
        return acc;
      }, []);
    };

    return filterItems(MOCK_TREE_DATA);
  }, [deferredQuery, hasActiveQuery, selectedCoordinates]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="font-bold cursor-default hover:bg-transparent">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Folder className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold text-base">Project Files</span>
                <span className="text-xs text-slate-500">Tree View Explorer</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="px-2 mt-2 mb-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-500" />
            <Input
              type="search"
              placeholder="Search files or items..."
              className="w-full pl-8 h-9 bg-white"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Coordinates ({selectedCoordinates.size}/{allCoordinateOptions.length})</SidebarGroupLabel>
          <SidebarGroupContent>
            <CoordinateFilter
              allCoordinateOptions={allCoordinateOptions}
              selectedCoordinates={selectedCoordinates}
              onToggleAll={handleToggleAllCoordinates}
              onToggleCoordinate={handleToggleCoordinate}
            />
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Files ({selectedIds.size} selected)</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredData.map((file) => (
                <TreeNode
                  key={file.id}
                  item={file}
                  selectedIds={selectedIds}
                  onToggle={handleToggle}
                  autoExpand={hasActiveQuery}
                />
              ))}

              {filteredData.length === 0 && (
                <div className="px-4 py-8 text-center text-sm text-slate-500">
                  No files or items found with the selected coordinate filter.
                </div>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="border-t border-sidebar-border p-3">
        <Button className="w-full" size="lg" onClick={onGenerate} disabled={selectedIds.size === 0 || isGenerating}>
          <Images />
          {isGenerating ? 'Generating' : 'Generate thumbnails'}
        </Button>
        <div className="mt-2 text-xs text-slate-500">
          {selectedIds.size} selected · {generatedCount} thumbnails
        </div>
      </div>
    </Sidebar>
  );
}
