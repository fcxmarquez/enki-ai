"use client";

import { MessageCircle } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

/**
 * Renders a sidebar navigation group for chat history organized by time periods.
 *
 * Displays chat conversations grouped by "Today", "Yesterday", and "Previous 7 days" sections.
 * Each chat item shows a message icon and the chat title.
 *
 * @param chats - An array of chat objects grouped by time periods.
 */
export function NavChats({
  chats,
}: {
  chats: {
    period: string;
    items: {
      name: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {chats.map((group) => (
            <div key={group.period} className="mb-4">
              <SidebarGroupLabel className="text-xs text-muted-foreground mb-2">
                {group.period}
              </SidebarGroupLabel>
              {group.items.map((chat) => (
                <SidebarMenuItem key={chat.name}>
                  <SidebarMenuButton asChild>
                    <a href={chat.url} title={chat.name}>
                      <MessageCircle className="text-muted-foreground" />
                      <span className="truncate">{chat.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </div>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

