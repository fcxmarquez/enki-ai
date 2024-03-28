"use client";

import { useUI, useUIMutation } from "@/store/ui";
import { Modal, ModalOverlay } from "@chakra-ui/react";

export const ModalRender = () => {
  const { hideModal } = useUIMutation();
  const { app } = useUI();
  const { modal } = app;

  return (
    <Modal isOpen={modal.isOpen} onClose={hideModal} isCentered size="xl">
      <ModalOverlay />
      {modal.children}
    </Modal>
  );
};
