import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { cacheLife, cacheTag } from "next/cache";
import { RealTimeBlogList } from "./realtime-blog-list";

export const BlogList = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-articles-list");
  const preloadedBlogs = await preloadQuery(api.blogArticles.getBlogArticles);
  return <RealTimeBlogList preloadedBlogs={preloadedBlogs} />;
};
