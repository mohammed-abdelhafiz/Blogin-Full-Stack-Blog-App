"use client";

import { AuthActions } from "../shared/auth-actions";
import { ThemeToggle } from "../../theme-toggle";
import { useConvexAuth } from "convex/react";

export const DesktopNavActions = () => {
  const { isLoading, isAuthenticated } = useConvexAuth();

  return (
    <div className="flex items-center gap-5">
      <AuthActions isLoading={isLoading} isAuthenticated={isAuthenticated}/>
      <ThemeToggle />
    </div>
  );
};
