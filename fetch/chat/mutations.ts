import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatMessage, ChatService } from "@/lib/langchain/chatService";
import { useConfig } from "@/store";
import { MOCK_RESPONSE } from "@/constants/mock/mockResponse";

interface SendMessageStreamVariables {
  message: string;
  history?: ChatMessage[];
  onChunk?: (chunk: string) => void;
  onComplete?: (fullResponse: string) => void;
  onError?: (error: Error, partialResponse: string) => void;
}

export const useSendMessageStream = () => {
  const { config } = useConfig();

  return useMutation({
    mutationFn: async ({
      message,
      history = [],
      onChunk,
      onComplete,
      onError,
    }: SendMessageStreamVariables) => {
      const chatService = ChatService.getInstance(config);
      const responseChunks: string[] = [];

      try {
        for await (const chunk of chatService.sendMessageStream(message, history)) {
          responseChunks.push(chunk);
          onChunk?.(chunk);
        }

        const fullResponse = responseChunks.join("");
        onComplete?.(fullResponse);
        return fullResponse;
      } catch (error) {
        if (error instanceof Error) {
          onError?.(error, responseChunks.join(""));
        }
        throw error;
      }
    },
  });
};

export const useSendMessageStreamTest = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ onChunk, onComplete, onError }: SendMessageStreamVariables) => {
      const responseChunks: string[] = [];

      try {
        for (const chunk of MOCK_RESPONSE.split(" ")) {
          responseChunks.push(` ${chunk}`);
          await new Promise((resolve) => setTimeout(resolve, 1));
          onChunk?.(` ${chunk}`);
        }

        const fullResponse = responseChunks.join("");
        onComplete?.(fullResponse);
        return fullResponse;
      } catch (error) {
        if (error instanceof Error) {
          onError?.(error, responseChunks.join(""));
        }
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
};
