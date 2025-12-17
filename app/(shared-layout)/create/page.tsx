import { Metadata } from "next";
import { CreateBlogForm } from "./create-blog-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CreatePage() {
  return (
    <div className="py-12">
      <div className="text-center mb-12 space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Create blog
        </h1>
        <p className="text-lg text-muted-foreground">
          Share your thoughts with the big world.
        </p>
      </div>
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
