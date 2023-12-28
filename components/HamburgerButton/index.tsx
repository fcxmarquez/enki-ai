import { FC } from "react";
import styles from "./styles.module.css";

type HamburgerButtonProps = {
  isOpen: boolean;
  toggleMenu: () => void;
};

export const HamburgerButton: FC<HamburgerButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <button
      className={`${styles.hamburgerNew}  ${
        isOpen ? styles.open : ""
      } focus:outline-none`}
      onClick={toggleMenu}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  );
};
