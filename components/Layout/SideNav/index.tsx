import { useViewMobile } from "@/hooks/useViewMobile";
import { FC, ForwardedRef, forwardRef } from "react";
import { Box, Flex, Button } from "@chakra-ui/react";

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
    : `h-screen overflow-auto bg-background-sideNav self-start fixed`;

  const navStyle = isMobile ? { width: "80vw" } : { width: "300px" };

  return (
    <>
      <nav ref={ref} style={navStyle} className={navClass}>
        {/* The user profile */}
        <Flex justify={"center"}>
          <Box>
            <div className="flex items-center justify-center">
              <div className="h-24 w-24 rounded-full bg-white"></div>
            </div>
            <div className="flex items-center justify-center">
              <div className="text-white">Username</div>
            </div>
          </Box>
        </Flex>
        <Button>Hi Im a button</Button>
        {/* Chat history */}
        <div>
          <div className="flex items-center justify-center">
            <div className="text-white">Chat history</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-white">Chat history</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-white">Chat history</div>
          </div>
        </div>
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
