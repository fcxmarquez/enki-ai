import { FC } from "react";
import styles from "./styles.module.css";

type HamburgerButtonProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export const HamburgerButton: FC<HamburgerButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className={`${styles.hamburgerNew} z-50 ${
        isOpen ? styles.open : ""
      } focus:outline-hidden`}
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};
