"use client";

import { SettingsModal } from "@/components/modals/settings";
import { useUI, useUIActions } from "@/store";

export const ShadcnModalRender = () => {
  const { modals } = useUI();
  const { setSettingsModalOpen } = useUIActions();

  return <SettingsModal open={modals.settings} onOpenChange={setSettingsModalOpen} />;
};
