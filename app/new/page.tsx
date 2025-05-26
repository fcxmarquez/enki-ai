"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { NavActions } from "@/components/nav-actions";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

/**
 * Renders a page layout with a sidebar, header, breadcrumb navigation, and main content area.
 *
 * The layout includes a sidebar with toggle functionality, a header with breadcrumb navigation labeled "Project Management & Task Tracking," navigation action buttons, and two styled content blocks centered within the main area.
 */
export default function Page() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const modelsMock = ["gpt-4o", "Claude 4 Sonnet", "Gemini 2.5 Pro", "Grok 3"];

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-3">
            <SidebarTrigger />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <DropdownMenu onOpenChange={setIsDropdownOpen}>
              <DropdownMenuTrigger className="focus-visible:ring-transparent" asChild>
                <Button variant="ghost" className="text-foreground">
                  GPT 4o
                  <ChevronDown
                    className={`h-4 w-4 flex-shrink-0 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : "rotate-0"}`}
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {modelsMock.map((element) => (
                  <DropdownMenuItem key={element}>{element}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="ml-auto px-3">
            <NavActions />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-4 py-10">
          <div className="bg-muted/50 mx-auto h-24 w-full max-w-3xl rounded-xl" />
          <div className="bg-muted/50 mx-auto h-full w-full max-w-3xl rounded-xl" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
