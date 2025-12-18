import { GoBackButton } from "@/components/custom/go-back-button";
import { ThemeToggle } from "@/components/custom/theme-toggle";
import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <GoBackButton className="absolute top-5 left-5" />
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
