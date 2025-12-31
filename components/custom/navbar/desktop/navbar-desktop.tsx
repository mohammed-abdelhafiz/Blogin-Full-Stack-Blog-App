import { DesktopNavActions } from "./desktop-nav-actions";
import { DesktopNavLinks } from "./desktop-nav-links";

export const NavbarDesktop = () => {
  return (
    <nav className="flex items-center justify-between py-5">
      <DesktopNavLinks />
      <DesktopNavActions />
    </nav>
  );
};
