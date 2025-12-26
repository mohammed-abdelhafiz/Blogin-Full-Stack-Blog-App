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

import { redirect } from "next/navigation";
import { getToken } from "@/lib/auth-server";

export default async function CreatePage() {
  const token = await getToken();
  if (!token) {
    return redirect("/auth/login");
  }

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
