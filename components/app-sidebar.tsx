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

import { NavFavorites } from "@/components/nav-favorites";
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
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
      emoji: "📊",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
      emoji: "🍳",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
      emoji: "💪",
    },
  ],
  chatHistory: [
    {
      period: "Today",
      chats: [
        {
          title: "AI Model Comparison Research",
          url: "#",
        },
        {
          title: "Project Timeline Planning",
          url: "#",
        },
        {
          title: "Code Review Discussion",
          url: "#",
        },
      ],
    },
    {
      period: "Yesterday",
      chats: [
        {
          title: "Marketing Strategy Brainstorm",
          url: "#",
        },
        {
          title: "Bug Fixing Session",
          url: "#",
        },
      ],
    },
    {
      period: "Previous 7 days",
      chats: [
        {
          title: "Product Feature Analysis",
          url: "#",
        },
        {
          title: "Team Collaboration Notes",
          url: "#",
        },
      ],
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
        <NavFavorites favorites={data.favorites} />
        <NavChatHistory chatHistory={data.chatHistory} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
