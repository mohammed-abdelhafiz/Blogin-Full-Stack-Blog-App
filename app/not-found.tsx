import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-9xl font-bold">404</h1>
        <p className="text-2xl font-semibold">
          Sorry, the page you are looking for does not exist.
        </p>
        <Link href="/blog" className={buttonVariants({ variant: "default" })}>
          Go back to home
        </Link>
      </div>
    </div>
  );
}
