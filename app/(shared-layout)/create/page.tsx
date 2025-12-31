import { Metadata } from "next";
import { CreateBlogForm } from "./create-blog-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeader } from "@/components/custom/page-header";

export default async function CreatePage() {
  return (
    <div className="py-12">
      <PageHeader
        title="Create New Blog"
        description="Create a new blog article and share it with everyone."
      />
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader>
          <CardTitle>Create New Blog</CardTitle>
          <CardDescription>
            Create a new blog article and share it with everyone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateBlogForm />
        </CardContent>
      </Card>
    </div>
  );
}

export const metadata: Metadata = {
  title: "Create New Blog",
};
