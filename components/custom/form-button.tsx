"use client";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "./loading-spinner";

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
          <LoadingSpinner color="foreground"/>
          <span>Loading...</span>
        </>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
};
