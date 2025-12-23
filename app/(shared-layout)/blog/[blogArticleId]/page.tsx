import { api } from "@/convex/_generated/api";
 import { fetchQuery, preloadQuery } from "convex/nextjs";

import { redirect } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { GoBackButton } from "@/components/custom/go-back-button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CommentsSection } from "./comments-section";

interface BlogArticlePageProps {
  params: Promise<{ blogArticleId: Id<"blogArticles"> }>;
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const { blogArticleId } = await params;
  const [blogArticle, preloadedComments] = await Promise.all([
    getBlogArticleById(blogArticleId),
    preloadQuery(api.comments.getCommentsByBlogId, {
      blogArticleId,
    }),
  ]);

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <GoBackButton label="Back to blog" className="mb-4" variant="outline" />
      <div className="h-[400px] w-full mb-8 rounded-xl overflow-hidden shadow-sm relative">
        <Image
          src={
            blogArticle.imageUrl ??
            "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"
          }
          alt={blogArticle.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="flex flex-col space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          {blogArticle.title}
        </h1>
        <p className="text-muted-foreground text-sm ml-1">
          Published at{" "}
          {new Date(blogArticle._creationTime).toLocaleString("en-GB", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
          })}
        </p>
      </div>
      <Separator className="my-8" />
      <p className="text-foreground/90 text-lg leading-relaxed whitespace-pre-wrap">
        {blogArticle.content}
      </p>
      <Separator className="my-8" />
      <CommentsSection preloadedComments={preloadedComments} />
    </div>
  );
}

export const generateMetadata = async ({ params }: BlogArticlePageProps) => {
  const { blogArticleId } = await params;
  const blogArticle = await getBlogArticleById(blogArticleId);
  return {
    title: blogArticle.title,
    description: blogArticle.content,
  };
};

export const getBlogArticleById = async (blogArticleId: Id<"blogArticles">) => {
  try {
    const blogArticle = await fetchQuery(api.blogArticles.getBlogArticleById, {
      blogArticleId,
    });

    if (!blogArticle) {
      return redirect("/blog");
    }

    return blogArticle;
  } catch {
    return redirect("/blog");
  }
};
