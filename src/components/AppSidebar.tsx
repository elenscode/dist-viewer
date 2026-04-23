import { useState, useMemo } from 'react';
import { ChevronRight, File, Folder, Search } from 'lucide-react';
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
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { MOCK_TREE_DATA, TreeItem } from '@/api/mockTreeData';

type TreeNodeProps = {
  item: TreeItem;
  selectedIds: Set<string>;
  onToggle: (item: TreeItem, checked: boolean) => void;
  depth?: number;
};

function TreeNode({ item, selectedIds, onToggle, depth = 0 }: TreeNodeProps) {
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
        defaultOpen
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

export function AppSidebar() {
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const toggleId = (item: TreeItem, checked: boolean) => {
    const newSelected = new Set(selectedIds);
    const idsToProcess: string[] = [];

    const getDescendants = (node: TreeItem) => {
      idsToProcess.push(node.id);
      if (node.children) {
        node.children.forEach((child) => getDescendants(child));
      }
    };
    getDescendants(item);

    if (checked) {
      idsToProcess.forEach((id) => newSelected.add(id));
    } else {
      idsToProcess.forEach((id) => newSelected.delete(id));
    }
    setSelectedIds(newSelected);
  };

  const filteredData = useMemo(() => {
    if (!query.trim()) return MOCK_TREE_DATA;

    const lowerQuery = query.toLowerCase();

    const filterItems = (items: TreeItem[]): TreeItem[] => {
      return items.reduce<TreeItem[]>((acc, item) => {
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
  }, [query]);

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
                  onToggle={toggleId}
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
    </Sidebar>
  );
}
