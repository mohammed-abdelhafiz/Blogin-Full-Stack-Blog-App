import { Metadata } from "next";
import { PageHeader } from "@/components/custom/page-header";
import { RealTimeBlogList } from "./real-time-blogList";
import { preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const dynamic = "force-static";

export default async function BlogPage() {
  const preloaded_getBlogArticles = await preloadQuery(
    api.blogArticles.getBlogArticles
  );
  return (
    <div className="py-12">
      <PageHeader
        title="Our Blog"
        description="Insights, thoughts, and trends from our team."
      />
      <RealTimeBlogList preloaded_getBlogArticles={preloaded_getBlogArticles} />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Blog",
};
