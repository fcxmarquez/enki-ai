"use client";

import { SearchChatsDialog } from "@/components/modals/search-chats";
import { SettingsModal } from "@/components/modals/settings";
import { useNewChatShortcut } from "@/hooks/useNewChatShortcut";
import { useUI, useUIActions } from "@/store";

export const ShadcnModalRender = () => {
  const { modals } = useUI();
  const { setSettingsModalOpen, setSearchChatsModalOpen } = useUIActions();
  useNewChatShortcut();

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
