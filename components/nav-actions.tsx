"use client";

import { Star, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useUIActions } from "@/store";

/**
 * Renders a navigation action bar with interactive controls, including settings and star buttons.
 *
 * Displays a static label, a settings button to open the settings modal, and a star icon button.
 */
export function NavActions() {
  const { setSettingsModalOpen } = useUIActions();

  const handleSettingsClick = () => {
    console.log("Settings button clicked, opening modal...");
    setSettingsModalOpen(true);
  };

  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="text-muted-foreground hidden font-medium md:inline-block">
        Edit Oct 08
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7"
        onClick={handleSettingsClick}
      >
        <Settings2 />
      </Button>
      <Button variant="ghost" size="icon" className="h-7 w-7">
        <Star />
      </Button>
    </div>
  );
}
