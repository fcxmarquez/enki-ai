import { useViewMobile } from "@/hooks/useViewMobile";
import { FC, ForwardedRef, forwardRef } from "react";

type SideNavProps = {
  isOpen: boolean;
  ref?: ForwardedRef<HTMLDivElement>;
};

const SideNav: FC<SideNavProps> = forwardRef(({ isOpen }, ref) => {
  const isMobile = useViewMobile(true);

  const navClass = isMobile
    ? `fixed left-0 top-0 z-50 h-screen overflow-auto transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } bg-primary-light`
    : `h-screen overflow-auto bg-primary-light self-start fixed`;

  const navStyle = isMobile ? { width: "80vw" } : { width: "300px" };

  return (
    <>
      <nav ref={ref} style={navStyle} className={navClass}>
        {/* The user profile */}
        <div>
          <div className="flex items-center justify-center">
            <div className="h-24 w-24 rounded-full bg-white"></div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-white">Username</div>
          </div>
        </div>
        {/* Chat history */}
        <div>
          <div className="flex items-center justify-center">
            <div className="text-white">Chat history</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-white">Chat history</div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-white">Chat history</div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-0 z-40 bg-black opacity-50 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-50" : "pointer-events-none opacity-0"
        }`}
      />
    </>
  );
});

export default SideNav;

SideNav.displayName = "SideNav";
