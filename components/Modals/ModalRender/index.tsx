"use client";

import { useUI, useUIActions } from "@/store";
import { Modal, ModalOverlay } from "@chakra-ui/react";

export const ModalRender = () => {
  const { hideModal } = useUIActions();
  const { modal } = useUI();

  return (
    <Modal isOpen={modal.isOpen} onClose={hideModal} isCentered size="xl">
      <ModalOverlay />
      {modal.children}
    </Modal>
  );
};
