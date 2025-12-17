"use server";

import { BlogArticleData } from "@/schemas/blog";
import { fetchMutation } from "convex/nextjs";
import { getToken } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";

export const createBlogAction = async (data: BlogArticleData) => {
  const token = await getToken();
  await fetchMutation(api.blogArticles.createBlogArticle, data, {
    token,
  });
};
