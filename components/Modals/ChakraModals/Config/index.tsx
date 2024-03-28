import { ModalHeader, ModalContent, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { InputConfig } from "@/components/inputs/InputConfig";

export const ModalConfig = () => {
  return (
    <ModalContent>
      <ModalHeader>Settings</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className="config-section">
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
        </div>
      </ModalBody>
    </ModalContent>
  );
};
