import { NavbarDesktop } from "./navbar-desktop";
import { NavbarMobile } from "./navbar-mobile";

export const Navbar = () => {
  return (
    <>
      <div className="sm:hidden">
        <NavbarMobile />
      </div>
      <div className="hidden sm:block">
        <NavbarDesktop />
      </div>
    </>
  );
};
