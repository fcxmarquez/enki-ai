import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ChatService } from "@/lib/langchain/chatService";
import { env } from "@/lib/environment";

// Initialize chat service
const createChatService = () => {
  console.log("env", env);
  console.log("env.OPENAI_API_KEY", env.OPENAI_API_KEY);

  if (!env.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }
  return new ChatService(env.OPENAI_API_KEY);
};

interface SendMessageVariables {
  message: string;
  onSuccess?: (response: string) => void;
  onError?: (error: Error) => void;
}

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  const chatService = createChatService();

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
