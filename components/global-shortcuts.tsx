"use client";

import { useNewChatShortcut } from "@/hooks/useNewChatShortcut";

export function GlobalShortcuts() {
  useNewChatShortcut();
  return null;
}
