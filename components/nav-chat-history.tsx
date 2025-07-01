"use client";

import { Archive, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { groupAndSortChats } from "@/lib/utils";
import { useChat, useChatActions } from "@/store";
import { cn } from "@/lib/utils";

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
  const [hoveredChatId, setHoveredChatId] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

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
              <SidebarMenuSub className="border-0 ml-0">
                {chatsInGroup.map((chat) => (
                  <SidebarMenuSubItem key={chat.id}>
                    <SidebarMenuSubButton
                      asChild
                      className={cn(
                        currentConversationId === chat.id || openDropdownId === chat.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "",
                        "w-full h-full py-1 px-3"
                      )}
                    >
                      <button
                        onClick={() => handleConversationClick(chat.id)}
                        onMouseEnter={() => setHoveredChatId(chat.id)}
                        onMouseLeave={() => setHoveredChatId(null)}
                        className="flex items-center justify-between w-full"
                      >
                        <span>{chat.title}</span>

                        <DropdownMenu
                          onOpenChange={(open) =>
                            setOpenDropdownId(open ? chat.id : null)
                          }
                        >
                          <DropdownMenuTrigger>
                            <MoreHorizontal
                              className={`${
                                hoveredChatId === chat.id || openDropdownId === chat.id
                                  ? "opacity-100"
                                  : "opacity-0"
                              } transition-opacity`}
                            />
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </button>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </SidebarMenu>
          </SidebarGroupContent>
        </div>
      ))}
    </SidebarGroup>
  );
}
