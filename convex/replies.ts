import {
  mutation,
  query,
  action,
  internalMutation,
  internalQuery,
  internalAction,
} from "./_generated/server";
import { v } from "convex/values";
//import { getAppIdea } from './openai/gpt';
import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { paginationOptsValidator } from "convex/server";
import { api } from "@/convex/_generated/api";
import { useQuery, useMutation, useAction } from "convex/react";
// Mutation to add a new questionForm
export const addQuestionForm = mutation({
  args: { url: v.string() },
  handler: async (ctx, args) => {
    const formId = await ctx.db.insert("questionForm", { url: args.url });
    return formId; // Return the new entry's ID
  },
});

// Mutation to add a new question
export const addQuestion = mutation({
  args: { formId: v.string(), question: v.string() },
  handler: async (ctx, args) => {
    const formId = ctx.db.normalizeId("questionForm", args.formId);
    if (!formId) {
      throw new Error("Invalid formId");
    }
    const form = await ctx.db.get(formId);
    if (!form) {
      throw new Error("Form not found");
    }
    await ctx.db.insert("questions", {
      formId: form._id,
      question: args.question,
    });
  },
});

// Mutation to add a new reply
export const addReply = mutation({
  args: { questionId: v.string(), userReply: v.string() },
  handler: async (ctx, args) => {
    const questionId = ctx.db.normalizeId("questions", args.questionId);
    if (!questionId) {
      throw new Error("Invalid questionId");
    }
    const question = await ctx.db.get(questionId);
    if (!question) {
      throw new Error("Form not found");
    }
    await ctx.db.insert("replies", {
      questionId: question._id,
      userReply: args.userReply,
    });
  },
});
