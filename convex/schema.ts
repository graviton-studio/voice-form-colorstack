import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import test from "node:test";

export default defineSchema({
  questionForm: defineTable({
    url: v.string(),
  }),
  questions: defineTable({
    formId: v.id("questionForm"),
    question: v.string(),
  }),
  replies: defineTable({
    questionId: v.id("questions"),
    userReply: v.string(),
  }),
});
