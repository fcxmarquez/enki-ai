import { useState, useEffect, useCallback } from "react";
import { breakpoints } from "@/constants/systemDesign";

export const useViewMobile = (toDesktop: boolean, viewport?: number) => {
  const [width, setWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  const updateDimensions = useCallback(() => {
    const windowWidth = window.innerWidth;
    setWidth(windowWidth);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [updateDimensions]);

  if (!mounted) {
    return false;
  }

  return toDesktop
    ? width < parseInt(breakpoints.desktop)
    : width < (viewport ?? parseInt(breakpoints.tablet));
};
