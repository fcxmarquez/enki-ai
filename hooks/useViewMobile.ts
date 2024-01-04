import { useState, useEffect } from "react";
import { breakpoints } from "@/constants/breakpoints";

export const useViewMobile = (toDesktop: boolean, viewport?: number) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWidth(width);
  };

  return toDesktop
    ? width < parseInt(breakpoints.desktop)
    : width < (viewport ?? parseInt(breakpoints.tablet));
};
