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
import { useChat, useChatActions } from "@/store";

export function NavChatHistory({
  chats,
}: {
  chats: {
    id: string;
    title: string;
    url: string;
    date: string;
  }[];
}) {
  const sortedGroupEntries = groupAndSortChats(chats);
  const { currentConversationId } = useChat();
  const { setCurrentConversation } = useChatActions();

  const handleConversationClick = (conversationId: string) => {
    setCurrentConversation(conversationId);
  };

  return (
    <SidebarGroup>
      {sortedGroupEntries.map(({ dateLabel, chats: chatsInGroup }) => (
        <div key={dateLabel} className="mb-4">
          <SidebarGroupLabel>{dateLabel}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuSub>
                {chatsInGroup.map((chat) => (
                  <SidebarMenuSubItem key={chat.id}>
                    <SidebarMenuSubButton
                      asChild
                      className={
                        currentConversationId === chat.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : ""
                      }
                    >
                      <button onClick={() => handleConversationClick(chat.id)}>
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
