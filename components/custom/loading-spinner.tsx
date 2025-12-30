import { Loader2 } from "lucide-react";
import clsx from "clsx";

type Colors = "primary" | "secondary" | "destructive" | "foreground";

type LoadingProps = {
  color?: Colors;
  size?: number;
  className?: string;
  absoluteCentered?: boolean;
};

export const LoadingSpinner = ({
  color = "primary",
  size = 20,
  className = "",
  absoluteCentered = false,
}: LoadingProps) => {
  return (
    <Loader2
      className={clsx(
        `animate-spin text-${color}`,
        className,
        absoluteCentered
          ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          : ""
      )}
      size={size}
      aria-label="Loading"
      role="status"
    />
  );
};
