"use server";

import {
  BlogArticleFormData,
  blogArticleFormSchema,
} from "@/schemas/blogArticle";
import { fetchMutation } from "convex/nextjs";
import { getToken } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import { revalidatePath, updateTag } from "next/cache";

export const createBlogAction = async (data: BlogArticleFormData) => {
  const parsed = blogArticleFormSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error("Invalid data");
  }
  const token = await getToken();
  const imageUploadUrl = await fetchMutation(
    api.blogArticles.generateImageUploadUrl,
    {},
    { token }
  );
  const imageUploadResponse = await fetch(imageUploadUrl, {
    method: "POST",
    headers: {
      "Content-Type": parsed.data.image.type,
    },
    body: parsed.data.image,
  });
  if (!imageUploadResponse.ok) {
    throw new Error("Failed to upload image");
  }
  const { storageId } = await imageUploadResponse.json();
  await fetchMutation(
    api.blogArticles.createBlogArticle,
    {
      title: parsed.data.title,
      content: parsed.data.content,
      imageStorageId: storageId,
    },
    {
      token,
    }
  );
  updateTag("blog-articles-list");
};

export const revalidatePathAction = async (path: string) => {
  revalidatePath(path);
};
