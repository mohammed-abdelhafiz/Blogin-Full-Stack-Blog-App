import { Metadata } from "next";
import { PageHeader } from "@/components/custom/page-header";
import { BlogList } from "./blogList";
import { Suspense } from "react";
import { BlogListSkeleton } from "./blog-list-skeleton";

export const dynamic = "force-static";

export default async function BlogPage() {
  return (
    <div className="py-12">
      <PageHeader
        title="Our Blog"
        description="Insights, thoughts, and trends from our team."
      />
      <Suspense fallback={<BlogListSkeleton />}>
        <BlogList />
      </Suspense>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Blog",
};
