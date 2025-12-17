import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ blogArticleId: Id<"blogArticles"> }>;
}) {
  let article;

  try {
    const { blogArticleId } = await params;
    article = await fetchQuery(api.blogArticles.getBlogArticleById, {
      id: blogArticleId,
    });
    if (!article) {
      return redirect("/blog");
    }
  } catch {
    return redirect("/blog");
  }

  return (
    <div>
      <Card className="pt-0">
        <CardHeader className="relative w-full h-48 overflow-hidden">
          <Image
            src={
              "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={article.title}
            fill
            className="rounded-t-lg"
          />
        </CardHeader>
        <CardContent>
          <Link
            href={`/blog/${article._id}`}
            className="text-xl hover:text-primary transition-colors font-bold"
          >
            {article.title}
          </Link>
          <p className="text-sm line-clamp-1 text-muted-foreground">
            {article.content}
          </p>
        </CardContent>
        <CardFooter>
          <Link
            href={`/blog/${article._id}`}
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Read More
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ blogArticleId: Id<"blogArticles"> }>;
}) => {
  const { blogArticleId } = await params;
  const blogArticle = await fetchQuery(api.blogArticles.getBlogArticleById, {
    id: blogArticleId,
  });
  return {
    title: blogArticle?.title,
    description: blogArticle?.content,
  };
};
