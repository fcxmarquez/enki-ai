"use client";

import { useUI, useUIActions } from "@/store";
import { SettingsModal } from "@/components/modals/settings";
import { SearchChatsDialog } from "@/components/modals/search-chats";

export const ShadcnModalRender = () => {
  const { modals } = useUI();
  const { setSettingsModalOpen, setSearchChatsModalOpen } = useUIActions();

  return (
    <>
      <SettingsModal open={modals.settings} onOpenChange={setSettingsModalOpen} />
      <SearchChatsDialog
        open={modals.searchChats}
        onOpenChange={setSearchChatsModalOpen}
      />
    </>
  );
};
