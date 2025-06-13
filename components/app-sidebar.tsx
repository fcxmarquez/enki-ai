"use client";

import * as React from "react";
import {
  Blocks,
  Calendar,
  MessageCircleQuestion,
  SquarePen,
  Settings2,
  Trash2,
  Search,
} from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { NavMain } from "@/components/nav-main";
import { NavChatHistory } from "@/components/nav-chat-history";
import { UserBadge } from "@/components/user-badge";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useChat, useChatActions } from "@/store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { conversations } = useChat();
  const { createNewConversation } = useChatActions();

  const handleNewChat = () => {
    createNewConversation("New conversation");
  };

  const chatHistory = conversations.map((conversation) => ({
    id: conversation.id,
    title: conversation.title,
    url: `#${conversation.id}`,
    date: new Date(conversation.lastModified).toISOString(),
  }));

  const data = {
    user: {
      email: "john.doe@gmail.com",
      avatar: "https://github.com/shadcn.png",
    },
    navMain: [
      {
        title: "New chat",
        onClick: handleNewChat,
        icon: SquarePen,
      },
      {
        title: "Search chats",
        onClick: () => {},
        icon: Search,
      },
    ],
    navSecondary: [
      {
        title: "Calendar",
        url: "#",
        icon: Calendar,
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
      },
      {
        title: "Templates",
        url: "#",
        icon: Blocks,
      },
      {
        title: "Trash",
        url: "#",
        icon: Trash2,
      },
      {
        title: "Help",
        url: "#",
        icon: MessageCircleQuestion,
      },
    ],
    projects: [
      {
        name: "Company Website",
        url: "#",
      },
      {
        name: "Company Blog",
        url: "#",
      },
      {
        name: "Travel to Spain",
        url: "#",
      },
    ],
  };

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <UserBadge user={data.user} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavChatHistory chats={chatHistory} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
