import { Loader2 } from "lucide-react";
import clsx from "clsx";

type Colors = "primary" | "secondary" | "destructive" | "foreground";

type LoadingProps = {
  color?: Colors;
  size?: number;
  className?: string;
  centeredX?: boolean;
};

export const LoadingSpinner = ({
  color = "primary",
  size = 20,
  className = "",
  centeredX = false,
}: LoadingProps) => {
  return (
    <Loader2
      className={clsx(
        centeredX && "relative left-1/2 -translate-x-1/2",
        `animate-spin text-${color}`,
        className
      )}
      size={size}
      aria-label="Loading"
      role="status"
    />
  );
};
