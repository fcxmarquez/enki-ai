"use client";

import { useRef, useState } from "react";
import { HamburgerButton } from "@/components/Buttons/HamburgerButton";
import SideNav from "@/components/Layout/SideNav";
import { useViewMobile } from "@/hooks/useViewMobile";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const isMobile = useViewMobile(true);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="align-center fixed top-0 z-10 flex h-12 w-screen items-center justify-between bg-primary-light">
      {isMobile ? <HamburgerButton isOpen={isOpen} toggleMenu={toggleMenu} /> : null}
      <SideNav ref={navRef} isOpen={isOpen} onClickOutside={toggleMenu} />
    </header>
  );
};
