import { api } from "@/convex/_generated/api";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";

import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

import { GoBackButton } from "@/components/custom/go-back-button";
import { Separator } from "@/components/ui/separator";

import { CommentsSection } from "./comments-section";
import { BlogMetaData } from "./blog-metadata";
import { BlogCardImage } from "./blog-card-image";

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

  let userId = null;
  const token = await getToken();
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
      <BlogCardImage
        blogTitle={blogArticle.title}
        imageUrl={blogArticle.imageUrl}
      />
      {/* Blog title */}
      <div className="flex flex-col space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">
          {blogArticle.title}
        </h1>
        {/* Blog metadata */}
        <BlogMetaData
          blogCreationTime={blogArticle._creationTime}
          blogArticleId={blogArticleId}
          userId={userId}
        />
      </div>
      <Separator className="my-8" />
      {/* Blog content */}
      <p className="text-foreground/90 text-lg leading-relaxed whitespace-pre-wrap">
        {blogArticle.content}
      </p>
      <Separator className="my-8" />
      {/* Comments section */}
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
