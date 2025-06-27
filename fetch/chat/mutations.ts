import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatService } from "@/lib/langchain/chatService";
import { useConfig } from "@/store";
import { MOCK_RESPONSE } from "@/constants/mock/mockResponse";

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
  onError?: (error: Error, partialResponse: string) => void;
}

export const useSendMessageStream = () => {
  const queryClient = useQueryClient();
  const { config } = useConfig();

  return useMutation({
    mutationFn: async ({
      message,
      onChunk,
      onComplete,
      onError,
    }: SendMessageStreamVariables) => {
      const chatService = ChatService.getInstance(config);
      let fullResponse = "";

      try {
        for await (const chunk of chatService.sendMessageStream(message)) {
          fullResponse += chunk;
          onChunk?.(chunk);
        }

        onComplete?.(fullResponse);
        return fullResponse;
      } catch (error) {
        if (error instanceof Error) {
          onError?.(error, fullResponse);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};

export const useSendMessageStreamTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ onChunk, onComplete, onError }: SendMessageStreamVariables) => {
      let fullResponse = "";
      let i = 0;

      try {
        for (const chunk of MOCK_RESPONSE.split("")) {
          i++;
          fullResponse += chunk;
          await new Promise((resolve) => setTimeout(resolve, 1));
          console.log("i", i);
          if (i === 22) {
            throw new Error("Test error");
          }
          onChunk?.(chunk);
        }

        onComplete?.(fullResponse);
        return fullResponse;
      } catch (error) {
        if (error instanceof Error) {
          onError?.(error, fullResponse);
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
