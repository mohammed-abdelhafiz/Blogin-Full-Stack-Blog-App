import { Metadata } from "next";
import { PageHeader } from "@/components/custom/page-header";
import { BlogList } from "./blogList";

export default async function BlogPage() {
  return (
    <div className="py-12">
      <PageHeader
        title="Our Blog"
        description="Insights, thoughts, and trends from our team."
      />
      <BlogList />
    </div>
  );
}

export const metadata: Metadata = {
  title: "Blog",
};
