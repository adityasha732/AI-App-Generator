import { z } from "zod";

const styleSchema = z
  .object({
    width: z.string().optional(),
    height: z.string().optional(),
    padding: z.string().optional(),
    margin: z.string().optional(),
    className: z.string().optional(),
  })
  .partial()
  .default({});

const componentSchema = z.object({
  id: z.string().optional(),
  type: z.string(),
  props: z.record(z.any()).default({}),
  style: styleSchema.optional(),
});

const pageSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  path: z.string().default("/"),
  title: z.string().optional(),
  components: z.array(componentSchema).default([]),
});

const collectionFieldSchema = z.object({
  name: z.string(),
  type: z
    .enum(["string", "number", "boolean", "date", "json"])
    .default("string"),
  required: z.boolean().default(false),
});

const collectionSchema = z.object({
  name: z.string(),
  fields: z.array(collectionFieldSchema).default([]),
});

const workflowStepSchema = z.object({
  action: z.string(),
  target: z.string().optional(),
  payload: z.record(z.any()).optional(),
});

const workflowSchema = z.object({
  name: z.string(),
  trigger: z.string().default("manual"),
  steps: z.array(workflowStepSchema).default([]),
});

export const appConfigSchema = z.object({
  appName: z.string().min(1, "appName is required"),

  description: z.string().optional().default(""),

  theme: z
    .object({
      mode: z.enum(["light", "dark", "system"]).default("light"),
      primaryColor: z.string().default("#2563eb"),
      radius: z.enum(["none", "sm", "md", "lg", "xl"]).default("md"),
    })
    .default({
      mode: "light",
      primaryColor: "#2563eb",
      radius: "md",
    }),

  pages: z.array(pageSchema).default([]),

  collections: z.array(collectionSchema).default([]),

  workflows: z.array(workflowSchema).default([]),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

export type PageConfig = z.infer<typeof pageSchema>;

export type ComponentConfig = z.infer<typeof componentSchema>;

export type CollectionConfig = z.infer<typeof collectionSchema>;

export type WorkflowConfig = z.infer<typeof workflowSchema>;