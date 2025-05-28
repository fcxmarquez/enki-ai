"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function ModelSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const modelsMock = ["gpt-4o", "Claude 4 Sonnet", "Gemini 2.5 Pro", "Grok 3"];

  return (
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
  <DropdownMenuItem 
    key={element} 
    onClick={() => setSelectedModel(element)}
  >
    {element}
  </DropdownMenuItem>
))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
