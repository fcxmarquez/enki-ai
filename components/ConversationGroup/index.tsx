import type { FC } from "react";

// this component will be used to group multiple Conversation components by day, week, or months

type ConversationGroupProps = {
  children: React.ReactNode;
  range: string;
};

export const ConversationGroup: FC<ConversationGroupProps> = ({ children, range }) => {
  return (
    <div>
      <p className="mb-1 text-xs text-text-paragraph">{range}</p>
      {children}
    </div>
  );
};
