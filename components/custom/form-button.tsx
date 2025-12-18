"use client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export const FormButton = ({
  isPending,
  children,
}: {
  isPending: boolean;
  children: React.ReactNode;
}) => {
  return (
    <Button type="submit" disabled={isPending}>
      {isPending ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
};
