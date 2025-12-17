import { Skeleton } from "@/components/ui/skeleton";

export const BlogListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="w-full h-48 rounded-xl" />
          <div className="flex flex-col space-y-2">
            <Skeleton className="w-1/2 h-4 rounded-lg" />
            <Skeleton className="w-3/4 h-4 rounded-lg" />
            <Skeleton className="w-[calc(100%-1rem)] h-4 mt-1 rounded-lg mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
};
