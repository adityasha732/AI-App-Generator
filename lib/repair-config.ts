import { ZodError, type ZodIssue } from "zod";
import { appConfigSchema, type AppConfig } from "./schema";

export type RepairResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
  repairedConfig: AppConfig | null;
  changesMade: string[];
};

const FALLBACK_COMPONENT = "FallbackComponent";

function safeParseJson(input: string): { data: unknown | null; error?: string } {
  try {
    return { data: JSON.parse(input) };
  } catch {
    return { data: null, error: "Invalid JSON format" };
  }
}

function formatZodErrors(error: ZodError): string[] {
  return error.issues.map((issue: ZodIssue) => {
    const path = issue.path.length ? issue.path.join(".") : "root";
    return `${path}: ${issue.message}`;
  });
}

function repairUnknownComponents(raw: any, warnings: string[], changesMade: string[]) {
  if (!raw?.pages || !Array.isArray(raw.pages)) return raw;

  const repairedPages = raw.pages.map((page: any, pageIndex: number) => {
    if (!page?.components || !Array.isArray(page.components)) return page;

    const repairedComponents = page.components.map((component: any, componentIndex: number) => {
      const allowed = [
        "Text",
        "Button",
        "Input",
        "Card",
        "Table",
        "Form",
        "Navbar",
        "Sidebar",
      ];

      if (!component?.type || !allowed.includes(component.type)) {
        warnings.push(
          `pages.${pageIndex}.components.${componentIndex}.type: unknown component "${component?.type ?? "missing"}" replaced with fallback`
        );
        changesMade.push(
          `Replaced unknown component "${component?.type ?? "missing"}" with ${FALLBACK_COMPONENT}`
        );

        return {
          ...component,
          type: FALLBACK_COMPONENT,
          props: {
            ...(component?.props ?? {}),
            originalType: component?.type ?? "missing",
            warning: "Unknown component replaced with fallback",
          },
        };
      }

      return component;
    });

    return { ...page, components: repairedComponents };
  });

  return { ...raw, pages: repairedPages };
}

export function repairConfigFromString(input: string): RepairResult {
  const parsed = safeParseJson(input);

  if (!parsed.data) {
    return {
      valid: false,
      errors: [parsed.error ?? "Invalid JSON"],
      warnings: [],
      repairedConfig: null,
      changesMade: [],
    };
  }

  const warnings: string[] = [];
  const changesMade: string[] = [];

  const withComponentFallbacks = repairUnknownComponents(parsed.data as any, warnings, changesMade);

  const result = appConfigSchema.safeParse(withComponentFallbacks);

  if (!result.success) {
    return {
      valid: false,
      errors: formatZodErrors(result.error),
      warnings,
      repairedConfig: null,
      changesMade,
    };
  }

  return {
    valid: true,
    errors: [],
    warnings,
    repairedConfig: result.data,
    changesMade,
  };
}

export function repairConfigFromObject(input: unknown): RepairResult {
  const warnings: string[] = [];
  const changesMade: string[] = [];

  const withComponentFallbacks = repairUnknownComponents(input as any, warnings, changesMade);
  const result = appConfigSchema.safeParse(withComponentFallbacks);

  if (!result.success) {
    return {
      valid: false,
      errors: formatZodErrors(result.error),
      warnings,
      repairedConfig: null,
      changesMade,
    };
  }

  return {
    valid: true,
    errors: [],
    warnings,
    repairedConfig: result.data,
    changesMade,
  };
}