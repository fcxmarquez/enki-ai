"use client";

import * as React from "react";
import {
  SquarePen,
  Search,
} from "lucide-react";

import { NavFavorites } from "@/components/nav-favorites";
import { NavMain } from "@/components/nav-main";
import { NavChats } from "@/components/nav-chats";
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
  favorites: [
    {
      name: "Project Management & Task Tracking",
      url: "#",
    },
    {
      name: "Family Recipe Collection & Meal Planning",
      url: "#",
    },
    {
      name: "Fitness Tracker & Workout Routines",
      url: "#",
    },
  ],
  chats: [
    {
      period: "Today",
      items: [
        {
          name: "How to implement authentication in Next.js",
          url: "#",
        },
        {
          name: "React state management best practices",
          url: "#",
        },
        {
          name: "TypeScript generic types explained",
          url: "#",
        },
      ],
    },
    {
      period: "Yesterday",
      items: [
        {
          name: "CSS Grid vs Flexbox comparison",
          url: "#",
        },
        {
          name: "Database optimization techniques",
          url: "#",
        },
      ],
    },
    {
      period: "Previous 7 days",
      items: [
        {
          name: "API design principles and patterns",
          url: "#",
        },
        {
          name: "Docker containerization guide",
          url: "#",
        },
      ],
    },
  ],
};

/**
 * Renders the application sidebar with user information, navigation, favorites, and chat history.
 *
 * Displays a structured sidebar UI including a user badge, main navigation, favorite items, and chat history grouped by time periods, using static data.
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
        <NavChats chats={data.chats} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
