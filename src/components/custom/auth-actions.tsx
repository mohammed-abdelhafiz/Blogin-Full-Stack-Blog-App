"use client";

import { useConvexAuth } from "convex/react";
import { Button, buttonVariants } from "../ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const AuthActions = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      {isLoading ? (
        <Loader2 className="animate-spin size-5 mr-2 text-muted-foreground" />
      ) : isAuthenticated ? (
        <Button variant="destructive" onClick={() => authClient.signOut({
          fetchOptions:{
            onSuccess: () => {
              toast.success("Logged out successfully");
              router.push("/");
            },
            onError: ({error}) => {
              toast.error(error.message);
            }
          }
        })}>
          Logout
        </Button>
      ) : (
        <>
          <Link
            href="/auth/sign-up"
            className={buttonVariants({
              variant: "default",
            })}
          >
            Sign Up
          </Link>
          <Link
            href="/auth/login"
            className={buttonVariants({
              variant: "outline",
            })}
          >
            Login
          </Link>
        </>
      )}
    </div>
  );
};
