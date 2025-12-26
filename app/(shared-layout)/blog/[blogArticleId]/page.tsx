import { api } from "@/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";

import { redirect } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { GoBackButton } from "@/components/custom/go-back-button";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { CommentsSection } from "./comments-section";
import { BlogPresence } from "@/components/custom/blog-presence";
import { getToken } from "@/lib/auth-server";

interface BlogArticlePageProps {
  params: Promise<{ blogArticleId: Id<"blogArticles"> }>;
}

export default async function BlogArticlePage({
  params,
}: BlogArticlePageProps) {
  const blogArticleId = await getValidBlogId(params);

  const [blogArticle, preloadedComments] = await Promise.all([
    getBlogArticle(blogArticleId),
    preloadQuery(api.comments.getCommentsByBlogId, {
      blogArticleId,
    }),
  ]);

  const token = await getToken();
  let userId;
  if (token) {
    userId = await fetchQuery(api.presence.getUserId, {}, { token });
  }

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 animate-in fade-in duration-500 relative">
      <GoBackButton
        label="Back to blog"
        className="mb-4"
        variant="outline"
        href="/blog"
      />
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
        <div className="ml-1">
          <p className="text-muted-foreground text-sm">
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
          {userId && <BlogPresence roomId={blogArticleId} userId={userId} />}
        </div>
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
  const blogArticleId = await getValidBlogId(params);
  const blogArticle = await getBlogArticle(blogArticleId);
  return {
    title: blogArticle.title,
    description: blogArticle.content,
  };
};

async function getValidBlogId(params: BlogArticlePageProps["params"]) {
  const { blogArticleId } = await params;
  const isValidId = await fetchQuery(api.blogArticles.isValidBlogArticleId, {
    blogArticleId,
  });

  if (!isValidId) {
    console.log("Invalid blog article id redirecting to /blog");
    return redirect("/blog");
  }
  return blogArticleId;
}

async function getBlogArticle(blogArticleId: Id<"blogArticles">) {
  const blogArticle = await fetchQuery(api.blogArticles.getBlogArticleById, {
    blogArticleId,
  });
  if (!blogArticle) {
    console.log("Blog article not found redirecting to /blog");
    return redirect("/blog");
  }
  return blogArticle;
}
