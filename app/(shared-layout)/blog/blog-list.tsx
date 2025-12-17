import { api } from "@/convex/_generated/api";
import { preloadQuery } from "convex/nextjs";
import { RealTimeBlogList } from "./real-time-blogList";

export const BlogList = async () => {
  const preloaded_getBlogArticles = await preloadQuery(
    api.blogArticles.getBlogArticles
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <RealTimeBlogList preloaded_getBlogArticles={preloaded_getBlogArticles} />
    </div>
  );
};
