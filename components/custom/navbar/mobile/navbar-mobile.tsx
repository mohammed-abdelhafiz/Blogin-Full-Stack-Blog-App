import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MobileNavLinks } from "./mobile-nav-links";
import { Menu } from "lucide-react";
import { MobileNavActions } from "./mobile-nav-actions";

export const NavbarMobile = () => {
  return (
    <nav className="flex items-center justify-between py-5">
      <Link href="/">
        <h1 className="text-2xl font-bold">
          Blog<span className="text-primary">in</span>
        </h1>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <Menu />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 sm:hidden" align="end">
          <MobileNavLinks />
          <DropdownMenuSeparator />
          <MobileNavActions />
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
