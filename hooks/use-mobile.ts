import * as React from "react";

const MOBILE_BREAKPOINT = 768;

/**
 * React hook that returns whether the current viewport width is below the mobile breakpoint.
 *
 * @returns `true` if the viewport width is less than 768 pixels, otherwise `false`.
 *
 * @remark The initial value is determined on mount and updates dynamically as the viewport size changes.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
