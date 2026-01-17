"use client";

import { FolderClosed, FolderPlus, MoreHorizontal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/**
 * Renders a sidebar group labeled "Projects" with a "Coming Soon" indicator.
 *
 * This section is not yet implemented. It displays project items with a blur effect
 * and a pill badge next to the label to indicate the feature is coming soon.
 *
 * @param projects - Array of projects items, each containing a name and URL.
 */
export function NavProjects({
  projects,
}: {
  projects: {
    name: string;
    url: string;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel className="flex items-center gap-2">
        Projects
        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-sidebar-accent text-sidebar-accent-foreground">
          Coming Soon
        </span>
      </SidebarGroupLabel>
      {/* Blurred content */}
      <div className="blur-[2px] pointer-events-none select-none opacity-40">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button title="New project" disabled>
                <div className="flex size-6 items-center justify-center">
                  <FolderPlus className="size-4 shrink-0" />
                </div>
                <span>New project</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          {projects.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <button title={item.name} disabled>
                  <div className="flex size-6 items-center justify-center">
                    <FolderClosed className="size-4 shrink-0" />
                  </div>
                  <span>{item.name}</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button className="text-sidebar-foreground/70" disabled>
                <MoreHorizontal />
                <span>More</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>
    </SidebarGroup>
  );
}
