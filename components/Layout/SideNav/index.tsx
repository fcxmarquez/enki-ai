import { useViewMobile } from "@/hooks/useViewMobile";
import { FC, ForwardedRef, forwardRef } from "react";
import { Flex } from "@chakra-ui/react";
import { ConversationGroup } from "@/components/ConversationGroup";
import { Conversation } from "@/components/Conversation";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import { UserProfile } from "@/components/UserProfile";
import { useChat, useChatActions } from "@/store";

type SideNavProps = {
  isOpen: boolean;
  onClickOutside?: () => void;
  ref?: ForwardedRef<HTMLDivElement>;
};

const SideNav: FC<SideNavProps> = forwardRef(({ isOpen, onClickOutside }, ref) => {
  const isMobile = useViewMobile(true);
  const { conversations, currentConversationId } = useChat();
  const { setCurrentConversation, deleteConversation } = useChatActions();

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
    e.stopPropagation(); // Prevent triggering the conversation selection
    deleteConversation(conversationId);
  };

  // Group conversations by date
  const groupedConversations = conversations.reduce<Record<string, typeof conversations>>(
    (groups, conv) => {
      const date = new Date(conv.lastModified);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let groupKey = "Previous 7 Days";
      if (date.toDateString() === today.toDateString()) {
        groupKey = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupKey = "Yesterday";
      }

      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
      groups[groupKey].push(conv);
      return groups;
    },
    {}
  );

  const baseNavClass = "fixed left-0 top-0 h-screen overflow-auto bg-background-sideNav";
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
                    className="absolute right-2 rounded p-1 text-red-500 opacity-0 transition-opacity duration-200 hover:bg-red-500/10 group-hover:opacity-100"
                    aria-label="Delete conversation"
                  >
                    <HiTrash size={"1.2rem"} />
                  </button>
                </div>
              ))}
            </ConversationGroup>
          ))}
        </Flex>

        <UserProfile username={"User"} />
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
