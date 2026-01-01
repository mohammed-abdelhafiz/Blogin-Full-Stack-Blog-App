"use client";
import { BlogPresence } from "@/components/custom/blog-presence";
import { Id } from "@/convex/_generated/dataModel";
import { formatDateForUser } from "@/lib/utils";

interface BlogDetailsProps {
  blogArticleId: Id<"blogArticles">;
  userId: string | null;
  blogCreationTime: number;
}

export const BlogDetails = ({
  blogArticleId,
  userId,
  blogCreationTime,
}: BlogDetailsProps) => {
  return (
    <div className="ml-1">
      <p className="text-muted-foreground text-sm">
        Published at {formatDateForUser(blogCreationTime)}
      </p>
      {userId && <BlogPresence roomId={blogArticleId} userId={userId} />}
    </div>
  );
};
