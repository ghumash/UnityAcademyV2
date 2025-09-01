// src/shared/content/schema.ts
import { z } from "zod";

export const CourseFrontmatter = z.object({
  title: z.string().min(1),
  excerpt: z.string().trim().optional(),
  tags: z.array(z.string().min(1)).optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
  draft: z.boolean().optional(),
  cover: z.string().url().optional(),
});
export type CourseFrontmatter = z.infer<typeof CourseFrontmatter>;

export const NormalizedCourse = z.object({
  slug: z.string().min(1),
  locale: z.union([z.literal("ru"), z.literal("en"), z.literal("hy")]),
  title: z.string().min(1),
  excerpt: z.string().optional(),
  tags: z.array(z.string().min(1)).optional(),
  updatedAt: z.string().optional(), // ISO string only
  draft: z.boolean().optional(),
  cover: z.string().url().optional(),
  body: z.string().optional(),
});
export type NormalizedCourse = z.infer<typeof NormalizedCourse>;

export const PageFrontmatter = z.object({
  title: z.string().min(1),
  description: z.string().trim().optional(),
  updatedAt: z.union([z.string(), z.date()]).optional(),
  draft: z.boolean().optional(),
});
export type PageFrontmatter = z.infer<typeof PageFrontmatter>;

export const NormalizedPage = z.object({
  slug: z.string().min(1),
  locale: z.union([z.literal("ru"), z.literal("en"), z.literal("hy")]),
  title: z.string().min(1),
  description: z.string().optional(),
  updatedAt: z.string().optional(), // ISO
  draft: z.boolean().optional(),
  body: z.string().optional(),
});
export type NormalizedPage = z.infer<typeof NormalizedPage>;
