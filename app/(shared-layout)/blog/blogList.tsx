import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { cacheLife, cacheTag } from "next/cache";

export const BlogList = async () => {
  "use cache";
  cacheLife("hours");
  cacheTag("blog-articles-list");
  const blogArticles = await fetchQuery(api.blogArticles.getBlogArticles);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogArticles.map((article) => (
        <Card key={article._id} className="pt-0">
          <CardHeader className="relative w-full h-48 overflow-hidden">
            <Image
              src={
                article.imageUrl ??
                "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"
              }
              alt={article.title}
              fill
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
