import Link from "next/link";
import { AuthActions } from "./auth-actions";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "../theme-toggle";

export const NavbarDesktop = () => {
  return (
    <nav className="flex items-center justify-between py-5">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Blog<span className="text-primary">in</span>
          </h1>
        </Link>
        <div className="flex items-center gap-1">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Home
          </Link>
          <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
            Blog
          </Link>
          <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
            Create
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <AuthActions />
        <ThemeToggle />
      </div>
    </nav>
  );
};
