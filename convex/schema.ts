import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogArticles: defineTable({
    title: v.string(),
    content: v.string(),
    imageStorageId: v.id("_storage"),
    authorId: v.string(),
  }),
  comments: defineTable({
    blogArticleId: v.id("blogArticles"),
    content: v.string(),
    authorId: v.string(),
    authorName: v.string(),
  }),
});
