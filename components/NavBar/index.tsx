"use client";

import { useEffect, useRef, useState } from "react";
import { HamburgerButton } from "@/components/HamburgerButton";

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
      <nav
        ref={navRef}
        style={{ width: "80vw" }}
        className={`fixed left-0 top-0 z-50 h-screen overflow-auto transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } bg-red-500`}
      >
        <div className="bg-red-500">
          <ul>
            <li>HI</li>
          </ul>
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
      ></div>
    </header>
  );
};
