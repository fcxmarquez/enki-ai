import {
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { InputConfig } from "@/components/Inputs/InputConfig";

const sectionClassName = "config-section mb-4 flex flex-col gap-4 pb-6";

export const ModalConfig = () => {
  return (
    <ModalContent>
      <ModalHeader>Settings</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className={sectionClassName}>
          <h2 className="font-bold">API Keys</h2>
          <p>Introduce your API keys here</p>
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
          <div className="flex w-full justify-start">
            <Button width={"100%"} maxWidth={"100px"} size="sm">
              Save
            </Button>
          </div>
        </div>
        <div className={sectionClassName}>
          <h2 className="font-bold">Profile</h2>
          <div className="flex w-full justify-start">
            <Button width={"100%"} maxWidth={"100px"} size="sm">
              Logout
            </Button>
          </div>
        </div>
      </ModalBody>
    </ModalContent>
  );
};

// Sections for the modal
// 1. Apikeys
// 2. Logout
