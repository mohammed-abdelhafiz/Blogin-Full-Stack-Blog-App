import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";

// Create a new blog article with the given title, content
export const createBlogArticle = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const blogArticle = await ctx.db.insert("blogArticles", {
      title: args.title,
      content: args.content,
      authorId: user._id,
    });
    return blogArticle;
  },
});
