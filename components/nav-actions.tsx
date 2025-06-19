"use client";

import { Star } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Renders a navigation action bar with interactive controls, including a popover menu of grouped actions.
 *
 * Displays a static label, a star icon button, and a menu button that opens a sidebar with multiple groups of menu items. The popover menu is initially open on mount and can be toggled by the user.
 */
export function NavActions() {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-muted-foreground hidden font-medium md:inline-block">
        Edit Oct 08
      </div>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star />
      </Button>
    </div>
  );
}
