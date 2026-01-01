"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({ reset }: ErrorPageProps) {
  const router = useRouter();

  const handleRetry = () => {
    startTransition(() => {
      reset();
      router.refresh();
    });
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-6">
        <h1 className="text-9xl font-bold">Oops!</h1>
        <p className="text-2xl font-semibold">Something went wrong.</p>

        <Button onClick={handleRetry}>
          Try again
        </Button>
      </div>
    </div>
  );
}
