"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Preloaded, usePreloadedQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";

interface RealTimeBlogListProps {
  preloadedBlogs: Preloaded<typeof api.blogArticles.getBlogArticles>;
}

export const RealTimeBlogList = ({ preloadedBlogs }: RealTimeBlogListProps) => {
  const blogArticles = usePreloadedQuery(preloadedBlogs);
  const router = useRouter();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogArticles.length ? (
        blogArticles.map((article) => (
          <Card key={article._id} className="pt-0">
            <CardHeader className="relative w-full h-48 overflow-hidden">
              <Image
                src={
                  article.imageUrl ??
                  "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"
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
        ))
      ) : (
        <div className="col-span-full flex justify-center flex-col items-center gap-y-12">
          <p className="text-lg font-bold tracking-wide text-muted-foreground text-center italic">
            We don&apos;t have any blog articles yet, Check back later or create new one now!
          </p>
          <Button variant="default" className="w-full max-w-xs cursor-pointer" onClick={() => router.push("/blog/create")}>
            Create New Article
          </Button>
        </div>
      )}
    </div>
  );
};
