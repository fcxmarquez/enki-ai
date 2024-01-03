"use client";

import { useEffect, useRef, useState } from "react";
import { HamburgerButton } from "@/components/Buttons/HamburgerButton";
import SideNav from "@/components/Layout/SideNav";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    console.log(isOpen);
    setIsOpen((prevIsOpen) => !prevIsOpen);
    console.log(isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        navRef.current &&
        !(navRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="align-center flex h-12 items-center justify-between bg-primary-light">
      <HamburgerButton isOpen={isOpen} toggleMenu={toggleMenu} />
      <SideNav ref={navRef} isOpen={isOpen} />
    </header>
  );
};
