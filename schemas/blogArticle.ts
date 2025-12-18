import { Id } from "@/convex/_generated/dataModel";
import z from "zod";

export const blogArticleFormSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  image: z.instanceof(File, {
    message: "Image is required",
  }),
});

export const commentFormSchema = z.object({
  content: z.string().min(3, "Content must be at least 3 characters long"),
  blogArticleId: z.custom<Id<"blogArticles">>(),
});

export type BlogArticleFormData = z.infer<typeof blogArticleFormSchema>;
export type CommentFormData = z.infer<typeof commentFormSchema>;
