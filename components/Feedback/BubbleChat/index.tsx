interface BubbleChatProps {
  profileImg: string;
  message: string;
  name: string;
  isTyping?: boolean;
}

export const BubbleChat = ({ profileImg, message, name, isTyping }: BubbleChatProps) => {
  return (
    <div className="flex items-start gap-4">
      <img src={profileImg} alt={name} className="h-10 w-10 rounded-full object-cover" />
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold">{name}</span>
        <div className="bg-muted rounded-lg p-4">
          {isTyping ? (
            <div className="flex gap-1">
              <span className="animate-bounce">.</span>
              <span className="animate-bounce delay-100">.</span>
              <span className="animate-bounce delay-200">.</span>
            </div>
          ) : (
            <p className="whitespace-pre-wrap">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
