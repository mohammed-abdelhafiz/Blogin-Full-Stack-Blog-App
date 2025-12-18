"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
type RealTimeBlogListProps = {
  preloaded_getBlogArticles: Preloaded<typeof api.blogArticles.getBlogArticles>;
};
export const RealTimeBlogList = ({
  preloaded_getBlogArticles,
}: RealTimeBlogListProps) => {
  const blogArticles = usePreloadedQuery(preloaded_getBlogArticles);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogArticles.map((article) => (
        <Card key={article._id} className="pt-0">
          <CardHeader className="relative w-full h-48 overflow-hidden">
            <Image
              src={
                article.imageUrl ??
                "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={article.title}
              fill
              loading="eager"
              className="rounded-t-lg object-cover"
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
      ))}
    </div>
  );
};
