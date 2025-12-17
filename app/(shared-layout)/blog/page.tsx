import { Metadata } from "next";
import { BlogList } from "./blog-list";
import { PageHeader } from "@/components/custom/page-header";
import { Suspense } from "react";
import { BlogListSkeleton } from "./blog-list-skeleton";

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
