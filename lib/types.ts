import { Id } from "@/convex/_generated/dataModel";

export type BlogArticleType = {
  _id: Id<"blogArticles">;
  _creationTime: number;
  title: string;
  content: string;
  imageStorageId: Id<"_storage">;
  imageUrl: string | null;
  authorId: string;
};
export type CommentType = {
  _id: Id<"comments">;
  _creationTime: number;
  content: string;
  blogArticleId: Id<"blogArticles">;
  authorId: string;
  authorName: string;
};
