import {
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Button,
  useToast,
  Text,
  Divider,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { InputConfig } from "@/components/Inputs/InputConfig";
import { useConfig } from "@/store";
import { useState } from "react";
import { Config, ModelType } from "@/store/types";

const sectionClassName = "config-section mb-4 flex flex-col gap-4 pb-6";

const MODEL_OPTIONS = [
  {
    value: "claude-3-5-sonnet-20241022",
    label: "Claude 3.5 Sonnet",
    requiresKey: "anthropicKey",
  },
  {
    value: "gpt-4o-mini",
    label: "GPT-4o-mini",
    requiresKey: "openAIKey",
  },
] as const;

export const ModalConfig = () => {
  const { config, setConfig, clearConfig } = useConfig();
  const toast = useToast();
  const [formData, setFormData] = useState<Config>({
    openAIKey: config.openAIKey || "",
    anthropicKey: config.anthropicKey || "",
    selectedModel: config.selectedModel || "claude-3-5-sonnet-20241022",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedModel = e.target.value as ModelType;
    setFormData((prev) => ({
      ...prev,
      selectedModel,
    }));
  };

  const handleSave = () => {
    // Find the selected model configuration
    const selectedModelConfig = MODEL_OPTIONS.find(
      (option) => option.value === formData.selectedModel
    );

    // Check if the required API key for the selected model is present
    if (selectedModelConfig && !formData[selectedModelConfig.requiresKey]) {
      toast({
        title: "Error",
        description: `${selectedModelConfig.label} requires a valid API key`,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setConfig(formData);

    toast({
      title: "Success",
      description: "Settings saved successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  const handleLogout = () => {
    clearConfig();
    toast({
      title: "Success",
      description: "Logged out successfully",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <ModalContent maxW="500px">
      <ModalHeader className="pb-2">Settings</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <div className={sectionClassName}>
          <Text as="h2" fontWeight="bold" fontSize="lg" mb={2}>
            Model Selection
          </Text>
          <FormControl>
            <FormLabel>Select AI Model</FormLabel>
            <Select value={formData.selectedModel} onChange={handleModelChange}>
              {MODEL_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <Divider my={4} />
        <div className={sectionClassName}>
          <Text as="h2" fontWeight="bold" fontSize="lg" mb={2}>
            API Keys
          </Text>
          <Text fontSize="sm" color="gray.500" mb={4}>
            Provide the API key for your selected model. Your keys are securely stored in
            your browser.
          </Text>
          <InputConfig
            label="OpenAI Key"
            id="openAIKey"
            placeholder="sk-..."
            value={formData.openAIKey}
            onChange={handleInputChange}
            type="password"
          />
          <InputConfig
            label="Anthropic Key"
            id="anthropicKey"
            placeholder="sk-ant-..."
            value={formData.anthropicKey}
            onChange={handleInputChange}
            type="password"
          />
          <div className="mt-4 flex w-full justify-start">
            <Button
              colorScheme="blue"
              width="100%"
              maxWidth="120px"
              size="sm"
              onClick={handleSave}
            >
              Save Settings
            </Button>
          </div>
        </div>
        <Divider my={4} />
        <div className={sectionClassName}>
          <Text as="h2" fontWeight="bold" fontSize="lg" mb={2}>
            Profile
          </Text>
          <div className="flex w-full justify-start">
            <Button
              colorScheme="red"
              variant="outline"
              width="100%"
              maxWidth="120px"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
      </ModalBody>
    </ModalContent>
  );
};
