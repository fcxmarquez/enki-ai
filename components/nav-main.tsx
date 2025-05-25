"use client";

import { type LucideIcon } from "lucide-react";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

/**
 * Renders a sidebar navigation menu with a list of items, each displaying an icon and title.
 *
 * @param items - Array of navigation items, each with a title, icon, and click handler.
 * @returns A sidebar menu component populated with the provided navigation items.
 */
export function NavMain({
  items,
}: {
  items: {
    title: string;
    icon: LucideIcon;
    onClick: () => void;
  }[];
}) {
  return (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton asChild isActive={false} onClick={item.onClick}>
            <div>
              <div className="flex size-6 items-center justify-center">
                <item.icon className="size-4 shrink-0 text-muted-foreground" />
              </div>
              <span>{item.title}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
