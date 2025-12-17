import z from "zod";

export const blogArticleSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters long")
    .max(50, "Title must be at most 50 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
});

export type BlogArticleData = z.infer<typeof blogArticleSchema>;
