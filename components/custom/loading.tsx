import { Loader2 } from "lucide-react";

type LoadingProps = {
  size?: number;
};
export const Loading = ({ size = 40 }: LoadingProps) => {
  return (
    <Loader2
      className="animate-spin text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      size={size}
    />
  );
};
