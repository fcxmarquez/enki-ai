import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store";

export const useConversations = () => {
  // Get messages from the store
  const conversations = useStore((state) => state.chat.conversations);

  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => conversations,
    // Since we're using Zustand for state management,
    // we can initialize with the store data
    initialData: conversations,
  });
};
