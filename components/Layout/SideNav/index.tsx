import { useViewMobile } from "@/hooks/useViewMobile";
import { FC, ForwardedRef, forwardRef } from "react";
import { Box, Flex } from "@chakra-ui/react";

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

  const chatHistoryBoxClassname = "flex items-center p-1";

  return (
    <>
      <nav ref={ref} style={navStyle} className={navClass}>
        {/* The user profile */}
        <Flex justify={"start"} className="p-4">
          <div className="h-8 w-8 rounded-lg bg-red-500"></div>
          <div className="ml-4 flex items-center justify-center">
            <div className="text-white">Username</div>
          </div>
        </Flex>
        {/* Chat history */}
        <Flex direction={"column"} className="p-4">
          <Box className={chatHistoryBoxClassname}>
            <div className="text-white">Chat history</div>
          </Box>
          <Box className={chatHistoryBoxClassname}>
            <div className="text-white">Chat history</div>
          </Box>
          <Box className={chatHistoryBoxClassname}>
            <div className="text-white">Chat history</div>
          </Box>
        </Flex>
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
