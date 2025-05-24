import { useState, useEffect } from "react";
import { breakpoints } from "@/constants/systemDesign";

export const useViewMobile = (toDesktop: boolean, viewport?: number) => {
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWidth(width);
  };

  if (!mounted) {
    return false;
  }

  return toDesktop
    ? width < parseInt(breakpoints.desktop)
    : width < (viewport ?? parseInt(breakpoints.tablet));
};
