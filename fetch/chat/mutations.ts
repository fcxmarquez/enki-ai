import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatService } from "@/lib/langchain/chatService";
import { useConfig } from "@/store";

interface SendMessageVariables {
  message: string;
  onSuccess?: (response: string) => void;
  onError?: (error: Error) => void;
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation({
    mutationFn: async ({ message }: SendMessageVariables) => {
      const chatService = ChatService.getInstance(config);
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
      variables.onError?.(error);
    },
  });
};

interface SendMessageStreamVariables {
  message: string;
  onChunk?: (chunk: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error) => void;
}

export const useSendMessageStream = () => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation({
    mutationFn: async ({ message, onChunk, onComplete }: SendMessageStreamVariables) => {
      const chatService = ChatService.getInstance(config);
      let fullResponse = "";

      for await (const chunk of chatService.sendMessageStream(message)) {
        fullResponse += chunk;
        onChunk?.(chunk);
      }

      onComplete?.(fullResponse);
      return fullResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
    onError: (error, variables) => {
      variables.onError?.(error);
    },
  });
};
