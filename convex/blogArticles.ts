import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new blog article with the given title, content
export const createBlogArticle = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const blogArticle = await ctx.db.insert("blogArticles", {
      title: args.title,
      content: args.content,
      imageStorageId: args.imageStorageId,
      authorId: user._id,
    });
    return blogArticle;
  },
});

export const getBlogArticles = query({
  handler: async (ctx) => {
    const blogArticles = await ctx.db
      .query("blogArticles")
      .order("desc")
      .collect();
    return await Promise.all(
      blogArticles.map(async (blogArticle) => {
        const imageUrl = blogArticle.imageStorageId
          ? await ctx.storage.getUrl(blogArticle.imageStorageId)
          : null;
        return {
          ...blogArticle,
          imageUrl,
        };
      })
    );
  },
});

export const getBlogArticleById = query({
  args: { id: v.id("blogArticles") },
  handler: async (ctx, args) => {
    const blogArticle = await ctx.db.get("blogArticles", args.id);
    return blogArticle;
  },
});

export const generateImageUploadUrl = mutation({
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return uploadUrl;
  },
});
