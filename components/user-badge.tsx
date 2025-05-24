"use client";

import { Archive, ChevronDown, Settings2, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

/**
 * Renders a user badge with a dropdown menu for user actions.
 *
 * Displays the user's email and provides menu options such as "Settings", "Archive", and "Logout" within a sidebar menu interface.
 *
 * @param user - The user information, including email and avatar.
 */
export function UserBadge({
  user,
}: {
  user: {
    email: string;
    avatar: string;
  };
}) {
  const optionsMock = [
    {
      name: "Settings",
      icon: Settings2,
    },
    {
      name: "Archive",
      icon: Archive,
    },
  ];

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton className="w-fit px-1.5">
              <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-5 items-center justify-center rounded-md">
                <div className="size-3" /> {/* Change to user reference */}
              </div>
              <ChevronDown className="opacity-50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-64 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              {user.email}
            </DropdownMenuLabel>
            {optionsMock.map((option, index) => (
              <DropdownMenuItem
                key={option.name}
                onClick={() => {}}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center">
                  <option.icon className="size-4 shrink-0" />
                </div>
                {option.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center">
                <LogOut className="size-4" />
              </div>
              <div>Logout</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
