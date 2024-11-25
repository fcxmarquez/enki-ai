import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatService } from "@/lib/langchain/chatService";
import { useConfig } from "@/store";
import { ModelType } from "@/store/types";

// Initialize chat service with provided config
const createChatService = (config: {
  openAIKey?: string;
  anthropicKey?: string;
  selectedModel: ModelType;
}) => {
  if (!config.openAIKey && !config.anthropicKey) {
    throw new Error("No API keys configured. Please add your API keys in settings.");
  }

  return new ChatService({
    openAIKey: config.openAIKey,
    anthropicKey: config.anthropicKey,
    selectedModel: config.selectedModel,
  });
};

interface SendMessageVariables {
  message: string;
  onSuccess?: (response: string) => void;
  onError?: (error: Error) => void;
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { config } = useConfig();
  const chatService = createChatService(config);

  return useMutation({
    mutationFn: async ({ message }: SendMessageVariables) => {
      const response = await chatService.sendMessage(message);
      return response as string;
    },
    onSuccess: (data, variables) => {
      // Invalidate and refetch relevant queries if needed
      queryClient.invalidateQueries({ queryKey: ["messages"] });

      // Call the success callback if provided
      variables.onSuccess?.(data);
    },
    onError: (error, variables) => {
      // Call the error callback if provided
      variables.onError?.(error as Error);
    },
  });
};
