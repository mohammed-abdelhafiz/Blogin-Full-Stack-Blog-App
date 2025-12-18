import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { authComponent } from "./auth";

export const getCommentsByBlogId = query({
  args: { blogArticleId: v.id("blogArticles") },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .filter((builder) =>
        builder.eq(builder.field("blogArticleId"), args.blogArticleId)
      )
      .order("desc")
      .collect();
    return comments;
  },
});

export const createComment = mutation({
  args: {
    blogArticleId: v.id("blogArticles"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const commentId = await ctx.db.insert("comments", {
      blogArticleId: args.blogArticleId,
      content: args.content,
      authorId: user._id,
      authorName: user.name,
    });
    return commentId;
  },
});
