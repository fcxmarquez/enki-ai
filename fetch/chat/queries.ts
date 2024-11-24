import { useQuery } from "@tanstack/react-query";
import { useStore } from "@/store";

export const useMessages = () => {
  // Get messages from the store
  const messages = useStore((state) => state.chat.messages);

  return useQuery({
    queryKey: ["messages"],
    queryFn: () => messages,
    // Since we're using Zustand for state management,
    // we can initialize with the store data
    initialData: messages,
  });
};
