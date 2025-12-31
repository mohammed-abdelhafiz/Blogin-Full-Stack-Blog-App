import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export const DesktopNavLinks = () => {
  return (
    <div className="flex items-center gap-8">
      <Link href="/blog">
        <h1 className="text-3xl font-bold">
          Blog<span className="text-primary">in</span>
        </h1>
      </Link>
      <div className="flex items-center">
        <Link href="/blog" className={buttonVariants({ variant: "ghost" })}>
          Blog
        </Link>
        <Link href="/create" className={buttonVariants({ variant: "ghost" })}>
          Create
        </Link>
      </div>
    </div>
  );
};
