"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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

  const menuIconClass = isOpen ? "open" : "";

  return (
    <header className="h-12 bg-primary-light">
      <button
        className={`${styles.hamburger} ${menuIconClass} focus:outline-none`}
        onClick={toggleMenu}
      >
        <span className={`${styles["hamburger-top"]} ${menuIconClass}`}></span>
        <span className={`${styles["hamburger-middle"]} ${menuIconClass}`}></span>
        <span className={`${styles["hamburger-bottom"]} ${menuIconClass}`}></span>
      </button>
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
