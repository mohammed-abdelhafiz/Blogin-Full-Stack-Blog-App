"use client";

import { useConvexAuth } from "convex/react";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "../loading-spinner";

export const AuthActions = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2 w-full md:w-auto">
      {isLoading ? (
        <LoadingSpinner className="mr-2" />
      ) : isAuthenticated ? (
        <Button
          variant="destructive"
          className="w-full md:w-auto"
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
        <div className="flex flex-col w-full md:w-auto md:flex-row gap-2">
          <Button variant="default" className="w-full md:w-auto">
            <Link href="/auth/sign-up">Sign Up</Link>
          </Button>
          <Button variant="outline" className="w-full md:w-auto">
            <Link href="/auth/login">Login</Link>
          </Button>
        </div>
      )}
    </div>
  );
};
