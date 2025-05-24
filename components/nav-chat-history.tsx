"use client";

import { ChevronRight, MessageCircle, MoreHorizontal } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

/**
 * Renders a sidebar navigation group for chat history, organized by time periods.
 *
 * Displays a labeled "Chat History" section with collapsible time-based categories: "Today", 
 * "Yesterday", and "Previous 7 days". Each category contains chat items with message icons.
 * Includes action buttons for category-level actions and a static "More" menu item at the end.
 *
 * @param chatHistory - An array of chat history objects, each containing a period label and an array of chats.
 * @returns A JSX element representing the sidebar navigation for chat history.
 */
export function NavChatHistory({
  chatHistory,
}: {
  chatHistory: {
    period: string;
    chats: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chat History</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {chatHistory.map((period) => (
            <Collapsible key={period.period}>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button>
                    <span>{period.period}</span>
                  </button>
                </SidebarMenuButton>
                <CollapsibleTrigger asChild>
                  <SidebarMenuAction
                    className="bg-sidebar-accent text-sidebar-accent-foreground left-2 data-[state=open]:rotate-90"
                    showOnHover
                  >
                    <ChevronRight />
                  </SidebarMenuAction>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {period.chats.map((chat) => (
                      <SidebarMenuSubItem key={chat.title}>
                        <SidebarMenuSubButton asChild>
                          <button>
                            <div className="flex size-6 items-center justify-center">
                              <MessageCircle className="size-4 shrink-0" />
                            </div>
                            <span>{chat.title}</span>
                          </button>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ))}
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
