"use client";

import { MoreHorizontal } from "lucide-react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { groupAndSortChats } from "@/lib/utils";

export function NavChatHistory({
  chats,
}: {
  chats: {
    title: string;
    url: string;
    date: string;
  }[];
}) {
  const sortedGroupEntries = groupAndSortChats(chats);

  return (
    <SidebarGroup>
      {sortedGroupEntries.map(({ dateLabel, chats: chatsInGroup }) => (
        <div key={dateLabel} className="mb-4">
          <SidebarGroupLabel>{dateLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuSub>
                {chatsInGroup.map((chat) => (
                  <SidebarMenuSubItem key={chat.title}>
                    <SidebarMenuSubButton asChild>
                      <button>
                        <span>{chat.title}</span>
                      </button>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
      ))}

      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-sidebar-foreground/70">
              <MoreHorizontal />
              <span>More</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
