import { memo, useCallback, useDeferredValue, useMemo, useState } from 'react';
import { ChevronRight, File, Folder, Images, Search } from 'lucide-react';
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
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MOCK_TREE_DATA } from '@/api/mockTreeData';
import type { ProjectFileItem } from '@/types/chart';

type TreeNodeProps = {
  item: ProjectFileItem;
  selectedIds: Set<string>;
  onToggle: (item: ProjectFileItem, checked: boolean) => void;
  depth?: number;
  autoExpand?: boolean;
};

function TreeNodeComponent({ item, selectedIds, onToggle, depth = 0, autoExpand = false }: TreeNodeProps) {
  const hasChildren = Boolean(item.children?.length);
  const isRoot = depth === 0;
  const BranchIcon = hasChildren ? Folder : File;
  const branchButtonClassName = isRoot
    ? 'peer/menu-button group/menu-button flex h-8 min-w-0 flex-1 items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&_svg]:size-4 [&_svg]:shrink-0 [&>span:last-child]:truncate'
    : 'flex h-7 min-w-0 flex-1 -translate-x-px cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-left text-sm text-sidebar-foreground outline-hidden hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0';

  const content = (
    <>
      <div className="flex items-center w-full group-hover:bg-sidebar-accent rounded-md">
        <div className={isRoot ? 'pl-2 pr-1 py-1' : 'pl-1 pr-1 py-1'} onClick={(e) => e.stopPropagation()}>
          <Checkbox
            checked={selectedIds.has(item.id)}
            onCheckedChange={(checked) => onToggle(item, !!checked)}
          />
        </div>

        {hasChildren ? (
          <CollapsibleTrigger
            className={branchButtonClassName}
          >
            {isRoot ? (
              <>
                <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                <BranchIcon className="mr-2 h-4 w-4 text-blue-500 shrink-0" />
                <span className="font-medium truncate">{item.name}</span>
              </>
            ) : (
              <>
                <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
                <BranchIcon className="mr-2 h-4 w-4 text-blue-500 shrink-0" />
                <span className="truncate">{item.name}</span>
              </>
            )}
          </CollapsibleTrigger>
        ) : isRoot ? (
          <SidebarMenuButton
            className="flex-1"
            onClick={() => onToggle(item, !selectedIds.has(item.id))}
          >
            <BranchIcon className="mr-2 h-4 w-4 text-slate-400 shrink-0" />
            <span className="truncate">{item.name}</span>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuSubButton
            render={
              <button
                onClick={() => onToggle(item, !selectedIds.has(item.id))}
                className="cursor-pointer flex-1 text-left flex items-center"
              />
            }
          >
            <BranchIcon className="mr-2 h-4 w-4 text-slate-400 shrink-0" />
            <span className="truncate">{item.name}</span>
          </SidebarMenuSubButton>
        )}
      </div>

      {hasChildren && (
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children?.map((child) => (
              <TreeNode
                key={child.id}
                item={child}
                selectedIds={selectedIds}
                onToggle={onToggle}
                depth={depth + 1}
                autoExpand={autoExpand}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      )}
    </>
  );

  if (hasChildren) {
    return (
      <Collapsible
        key={item.id}
        defaultOpen={autoExpand}
        open={autoExpand ? true : undefined}
        className="group/collapsible"
        render={
          <li className={isRoot ? 'group/menu-item relative' : 'group/menu-sub-item relative'} />
        }
      >
        {content}
      </Collapsible>
    );
  }

  return isRoot ? (
    <SidebarMenuItem key={item.id}>{content}</SidebarMenuItem>
  ) : (
    <SidebarMenuSubItem key={item.id}>{content}</SidebarMenuSubItem>
  );
}

const TreeNode = memo(
  TreeNodeComponent,
  (prevProps, nextProps) =>
    prevProps.item === nextProps.item &&
    prevProps.depth === nextProps.depth &&
    prevProps.autoExpand === nextProps.autoExpand &&
    prevProps.onToggle === nextProps.onToggle &&
    prevProps.selectedIds.has(prevProps.item.id) === nextProps.selectedIds.has(nextProps.item.id),
);

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
  const deferredQuery = useDeferredValue(query);
  const hasActiveQuery = deferredQuery.trim().length > 0;
  const handleToggle = useCallback(
    (item: ProjectFileItem, checked: boolean) => onToggleProjectItem(item, checked),
    [onToggleProjectItem],
  );

  const filteredData = useMemo(() => {
    if (!hasActiveQuery) return MOCK_TREE_DATA;

    const lowerQuery = deferredQuery.toLowerCase();

    const filterItems = (items: ProjectFileItem[]): ProjectFileItem[] => {
      return items.reduce<ProjectFileItem[]>((acc, item) => {
        const itemMatches = item.name.toLowerCase().includes(lowerQuery);
        const filteredChildren = item.children ? filterItems(item.children) : [];

        if (itemMatches) {
          acc.push(item);
        } else if (filteredChildren.length > 0) {
          acc.push({ ...item, children: filteredChildren });
        }
        return acc;
      }, []);
    };

    return filterItems(MOCK_TREE_DATA);
  }, [deferredQuery, hasActiveQuery]);

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
                  No files or items found matching "{query}".
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
