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

const data = {
  user: {
    email: "john.doe@gmail.com",
    avatar: "https://github.com/shadcn.png",
  },
  navMain: [
    {
      title: "New chat",
      onClick: () => {},
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
  chatHistory: [
    {
      title: "AI Model Comparison Research",
      url: "#",
      id: "1",
      date: "2025-05-24T15:30:00Z",
    },
    {
      title: "Project Timeline Planning",
      url: "#",
      id: "2",
      date: "2025-05-23T15:30:00Z",
    },
    {
      title: "Code Review Discussion",
      url: "#",
      id: "3",
      date: "2025-05-22T14:45:00Z",
    },
    {
      title: "Database Schema Design",
      url: "#",
      id: "4",
      date: "2024-03-15T11:20:00Z",
    },
    {
      title: "User Interface Mockups",
      url: "#",
      id: "5",
      date: "2024-03-12T16:30:00Z",
    },
    {
      title: "API Documentation Review",
      url: "#",
      id: "6",
      date: "2024-03-08T10:45:00Z",
    },
    {
      title: "Performance Optimization",
      url: "#",
      id: "7",
      date: "2024-02-28T13:15:00Z",
    },
    {
      title: "Security Audit Discussion",
      url: "#",
      id: "8",
      date: "2024-02-22T08:30:00Z",
    },
  ],
};

/**
 * Renders the application sidebar with user information, navigation, favorites, and workspaces.
 *
 * Displays a structured sidebar UI including a user badge, main and secondary navigation, favorite items, and workspace groups, using static data.
 *
 * @param props - Additional properties forwarded to the root {@link Sidebar} component.
 */
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <UserBadge user={data.user} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavChatHistory chats={data.chatHistory} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
