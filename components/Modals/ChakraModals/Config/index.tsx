import {
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { InputConfig } from "@/components/inputs/InputConfig";

export const ModalConfig = () => {
  return (
    <ModalContent>
      <ModalHeader>Settings</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className="config-section border-b-2 pb-2">
          <h2>API Keys</h2>
          <p>
            <strong>Introduce your API keys here</strong>
          </p>
          <InputConfig
            label="OpenAI Key"
            id="openAIKey"
            placeholder="Enter your OpenAI Key"
          />
          <InputConfig
            label="Antropic Key"
            id="antropicKey"
            placeholder="Enter your Antropic Key"
          />
          <Button>Save</Button>
        </div>
      </ModalBody>
    </ModalContent>
  );
};

// Sections for the modal
// 1. Apikeys
// 2. Logout
