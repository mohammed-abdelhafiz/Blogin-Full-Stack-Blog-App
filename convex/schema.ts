import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  blogArticles: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.string(),
  }),
});
