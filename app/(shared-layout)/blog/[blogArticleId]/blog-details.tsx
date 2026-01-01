import { BlogPresence } from "@/components/custom/blog-presence";
import { Id } from "@/convex/_generated/dataModel";

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
        Published at{" "}
        {new Date(blogCreationTime).toLocaleString("en-EG", {
          timeZone: "Africa/Cairo",
          year: "numeric",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })}
      </p>
      {userId && <BlogPresence roomId={blogArticleId} userId={userId} />}
    </div>
  );
};
