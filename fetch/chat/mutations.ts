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
  });
};
