import { useViewMobile } from "@/hooks/useViewMobile";
import { FC, ForwardedRef, forwardRef } from "react";
import { Flex } from "@chakra-ui/react";
import { ConversationGroup } from "@/components/ConversationGroup";
import { Conversation } from "@/components/Conversation";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { UserProfile } from "@/components/UserProfile";

type SideNavProps = {
  isOpen: boolean;
  onClickOutside?: () => void;
  ref?: ForwardedRef<HTMLDivElement>;
};

const SideNav: FC<SideNavProps> = forwardRef(({ isOpen, onClickOutside }, ref) => {
  const isMobile = useViewMobile(true);

  const navClass = isMobile
    ? `fixed left-0 top-0 z-50 h-screen overflow-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-background-sideNav`
    : `fixed left-0 h-screen overflow-auto bg-background-sideNav self-start fixed w-72`;

  const navStyle = isMobile ? { width: "80vw" } : undefined;

  // todo: discuss with ai about the decision of separate each section into a component, is it necessary?

  return (
    <>
      <nav ref={ref} style={navStyle} className={`${navClass} flex flex-col`}>
        {/* Header */}
        <Flex className="direction flex-row justify-between p-4">
          <div className="flex items-center justify-center">
            <h1 className="text-xl italic">EnkiAI</h1>
          </div>
          <div className="flex items-center justify-center">
            <HiMiniPencilSquare size={"1.5rem"} />
          </div>
        </Flex>
        {/* Chat history */}
        <Flex direction={"column"} className="grow gap-4 p-4">
          <ConversationGroup range={"Today"}>
            <Conversation title={"Chat history"} selected />
            <Conversation title={"Chat history"} />
          </ConversationGroup>
          <ConversationGroup range={"Yesterday"}>
            <Conversation title={"Chat history"} />
          </ConversationGroup>
        </Flex>
        {/* The user profile */}
        <UserProfile username={"User"} />
      </nav>
      {/* Close button */}
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
