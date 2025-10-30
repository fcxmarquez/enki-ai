import { useChat } from "@/store";
import { BubbleChat } from "@/components/Feedback/BubbleChat";

export const Thread = () => {
  const { messages } = useChat();

  console.log("messages", messages);

  return (
    <>
      {messages.map((message) => (
        <BubbleChat
          key={message.id}
          message={message.content}
          name={message.role === "assistant" ? "EnkiAI" : "You"}
          role={message.role}
          status={message.status}
          isLastMessage={message.id === messages[messages.length - 1].id}
        />
      ))}
    </>
  );
};
