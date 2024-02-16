"use client";

import { useRef, useState } from "react";
import { HamburgerButton } from "@/components/Buttons/HamburgerButton";
import SideNav from "@/components/Layout/SideNav";
import { useViewMobile } from "@/hooks/useViewMobile";
import { Box } from "@chakra-ui/react";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const isMobile = useViewMobile(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="align-center fixed top-0 z-10 flex h-12 w-screen items-center justify-between border-b border-gray-300 bg-header-default desktop:pl-72">
      {isMobile ? <HamburgerButton isOpen={isOpen} toggleMenu={toggleMenu} /> : null}
      <SideNav ref={navRef} isOpen={isOpen} onClickOutside={toggleMenu} />
      <Box className="absolute flex w-full justify-center desktop:relative">
        <h1>EnkiAI</h1>
      </Box>
    </header>
  );
};
