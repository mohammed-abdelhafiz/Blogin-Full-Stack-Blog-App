import { NavbarDesktop } from "./navbar-desktop";
import { NavbarMobile } from "./navbar-mobile";

export const Navbar = () => {
  return (
    <div className="bg-background/90 backdrop-blur-sm sticky top-0 z-50">
      <div className="sm:hidden">
        <NavbarMobile />
      </div>
      <div className="hidden sm:block">
        <NavbarDesktop />
      </div>
    </div>
  );
};
