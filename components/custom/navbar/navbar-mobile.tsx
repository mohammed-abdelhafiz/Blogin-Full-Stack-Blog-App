"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Book, Home, Menu, Plus } from "lucide-react";
import { AuthActions } from "./auth-actions";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export const NavbarMobile = () => {
  const { setTheme } = useTheme();

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
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link
                href="/"
                className="flex w-full items-center justify-between"
              >
                Home <Home />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/blog"
                className="flex w-full items-center justify-between"
              >
                Blog <Book />
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href="/create"
                className="flex w-full items-center justify-between"
              >
                Create <Plus />
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Change Theme</DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <AuthActions />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};
