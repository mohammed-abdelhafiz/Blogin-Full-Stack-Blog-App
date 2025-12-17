import { BlogArticleData } from "@/schemas/blogArticle";

export type BlogArticleWithId = BlogArticleData & { _id: string };
