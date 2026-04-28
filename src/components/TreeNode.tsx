import { memo } from 'react';
import { ChevronRight, File, Folder } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
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
  const coordinateText = item.coordinate ? `(${item.coordinate.x},${item.coordinate.y})` : null;
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
          <CollapsibleTrigger className={branchButtonClassName}>
            <ChevronRight className="transition-transform group-data-[state=open]/collapsible:rotate-90" />
            <BranchIcon className="mr-2 h-4 w-4 text-blue-500 shrink-0" />
            <span className={isRoot ? 'font-medium truncate' : 'truncate'}>{item.name}</span>
          </CollapsibleTrigger>
        ) : isRoot ? (
          <SidebarMenuButton className="flex-1" onClick={() => onToggle(item, !selectedIds.has(item.id))}>
            <BranchIcon className="mr-2 h-4 w-4 text-slate-400 shrink-0" />
            <span className="truncate">
              {item.name}
              {coordinateText && <span className="ml-1 text-xs text-slate-500">{coordinateText}</span>}
            </span>
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
            <span className="truncate">
              {item.name}
              {coordinateText && <span className="ml-1 text-xs text-slate-500">{coordinateText}</span>}
            </span>
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
        render={<li className={isRoot ? 'group/menu-item relative' : 'group/menu-sub-item relative'} />}
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

export const TreeNode = memo(
  TreeNodeComponent,
  (prevProps, nextProps) =>
    prevProps.item === nextProps.item &&
    prevProps.depth === nextProps.depth &&
    prevProps.autoExpand === nextProps.autoExpand &&
    prevProps.onToggle === nextProps.onToggle &&
    prevProps.selectedIds.has(prevProps.item.id) === nextProps.selectedIds.has(nextProps.item.id),
);
