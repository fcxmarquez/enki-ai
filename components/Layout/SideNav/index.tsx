import { useViewMobile } from "@/hooks/useViewMobile";
import { FC, ForwardedRef, forwardRef } from "react";
import { Flex } from "@chakra-ui/react";
import { ConversationGroup } from "@/components/ConversationGroup";
import { Conversation } from "@/components/Conversation";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Trash2 } from "lucide-react";
import { UserProfile } from "@/components/UserProfile";
import { useChat, useChatActions, useUser } from "@/store";

type SideNavProps = {
  isOpen: boolean;
  onClickOutside?: () => void;
  ref?: ForwardedRef<HTMLDivElement>;
};

// Helper function to get the group key for a date
const getGroupKey = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "Today";
  if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
  return "Previous 7 Days";
};

const SideNav: FC<SideNavProps> = forwardRef(({ isOpen, onClickOutside }, ref) => {
  const isMobile = useViewMobile(true);
  const { conversations, currentConversationId } = useChat();
  const { setCurrentConversation, deleteConversation } = useChatActions();
  const { email } = useUser();
  const handleNewChat = () => {
    setCurrentConversation("");
    if (isMobile && onClickOutside) {
      onClickOutside();
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversation(conversationId);
    if (isMobile && onClickOutside) {
      onClickOutside();
    }
  };

  const handleDeleteConversation = (
    e: React.MouseEvent<HTMLButtonElement>,
    conversationId: string
  ) => {
    e.stopPropagation();
    deleteConversation(conversationId);
  };

  // Group conversations by date
  const groupedConversations = conversations.reduce<Record<string, typeof conversations>>(
    (groups, conv) => {
      const groupKey = getGroupKey(new Date(conv.lastModified));
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(conv);
      return groups;
    },
    {}
  );

  const baseNavClass = "fixed left-0 top-0 h-screen overflow-auto bg-background-side-nav";
  const mobileNavClass = "z-50 transition-transform duration-300 ease-in-out";
  const desktopNavClass = "self-start w-72";

  const navClass = isMobile
    ? `${baseNavClass} ${mobileNavClass} ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`
    : `${baseNavClass} ${desktopNavClass}`;

  return (
    <>
      <nav
        ref={ref}
        style={isMobile ? { width: "80vw" } : undefined}
        className={`${navClass} flex flex-col`}
      >
        <Flex className="flex-row justify-between p-4">
          <div className="flex items-center justify-center">
            <h1 className="text-xl italic">EnkiAI</h1>
          </div>
          <button
            onClick={handleNewChat}
            className="flex items-center justify-center hover:opacity-70"
            aria-label="Start new chat"
          >
            <HiMiniPencilSquare size={"1.5rem"} />
          </button>
        </Flex>

        <Flex direction={"column"} className="grow gap-4 p-4">
          {Object.entries(groupedConversations).map(([groupName, convs]) => (
            <ConversationGroup key={groupName} range={groupName}>
              {convs.map((conv) => (
                <div key={conv.id} className="group relative flex w-full items-center">
                  <button
                    className="w-full cursor-pointer text-left hover:opacity-70"
                    onClick={() => handleSelectConversation(conv.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSelectConversation(conv.id);
                      }
                    }}
                  >
                    <Conversation
                      title={conv.title}
                      selected={conv.id === currentConversationId}
                    />
                  </button>
                  <button
                    onClick={(e) => handleDeleteConversation(e, conv.id)}
                    className={`absolute right-2 rounded p-1 text-white transition-opacity duration-200 hover:bg-red-500/10 ${
                      isMobile ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                    aria-label="Delete conversation"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </ConversationGroup>
          ))}
        </Flex>

        <UserProfile username={email} />
      </nav>

      <div
        className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-50" : "pointer-events-none hidden"
        }`}
        onClick={onClickOutside}
        tabIndex={0}
        onKeyDown={onClickOutside}
        role="button"
      />
    </>
  );
});

export default SideNav;

SideNav.displayName = "SideNav";
