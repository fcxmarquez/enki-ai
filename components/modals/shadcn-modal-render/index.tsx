"use client";

import { useUI, useUIActions } from "@/store";
import { SettingsModal } from "@/components/modals/settings";

export const ShadcnModalRender = () => {
  const { modals } = useUI();
  const { setSettingsModalOpen } = useUIActions();

  return (
    <>
      <SettingsModal open={modals.settings} onOpenChange={setSettingsModalOpen} />
    </>
  );
};
