"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "../../loading-spinner";
import clsx from "clsx";

interface AuthActionsProps {
  isLoading: boolean;
  isAuthenticated: boolean;
  isMobile?: boolean;
}

export const AuthActions = ({
  isLoading,
  isAuthenticated,
  isMobile = false,
}: AuthActionsProps) => {
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      {isLoading ? (
        <LoadingSpinner
          centeredX={isMobile}
          className={clsx(!isMobile && "mr-2")}
        />
      ) : isAuthenticated ? (
        <Button
          variant="destructive"
          className="w-full md:w-auto cursor-pointer"
          onClick={() =>
            authClient.signOut({
              fetchOptions: {
                onSuccess: () => {
                  toast.success("Logged out successfully");
                  router.push("/");
                },
                onError: ({ error }) => {
                  toast.error(error.message);
                },
              },
            })
          }
        >
          Logout
        </Button>
      ) : (
        <div className="flex flex-col w-full sm:w-auto sm:flex-row gap-2">
          <Button variant="default" className="w-full sm:w-auto cursor-pointer">
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
          <Button variant="outline" className="w-full sm:w-auto cursor-pointer">
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
