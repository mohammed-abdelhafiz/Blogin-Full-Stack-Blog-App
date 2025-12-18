"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";

const arrowSizeMap = {
  "2": "size-2",
  "3": "size-3",
  "4": "size-4",
  "5": "size-5",
  "6": "size-6",
};

interface GoBackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  arrowSize?: keyof typeof arrowSizeMap;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export const GoBackButton = ({
  label = "Go Back",
  arrowSize = "4",
  variant = "ghost",
  type = "button",
  onClick,
  ...props
}: GoBackButtonProps) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e);
    } else {
      router.back();
    }
  };
  return (
    <Button
      type={type}
      onClick={handleClick}
      {...props}
      variant={variant}
      className={cn("cursor-pointer", props.className)}
    >
      <ArrowLeft className={arrowSizeMap[arrowSize]} />
      {label}
    </Button>
  );
};
