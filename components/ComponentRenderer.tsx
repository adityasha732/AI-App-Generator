"use client";

import { componentRegistry } from "@/lib/component-registry";
import FallbackComponent from "./FallbackComponent";

type ComponentConfig = {
  id?: string;
  type: string;
  props?: Record<string, unknown>;
};

type PageConfig = {
  id?: string;
  name: string;
  path?: string;
  title?: string;
  components?: ComponentConfig[];
};

type ComponentRendererProps = {
  page: PageConfig;
};

export default function ComponentRenderer({
  page,
}: ComponentRendererProps) {
  const components = page.components ?? [];

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-900">
          {page.title ?? page.name}
        </h2>
        <p className="text-sm text-slate-500">{page.path ?? "/"}</p>
      </div>

      <div className="space-y-3">
        {components.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            No components in this page.
          </div>
        ) : (
          components.map((component, index) => {
            const Component = componentRegistry[component.type];

            if (typeof Component !== "function") {
              return (
                <FallbackComponent
                  key={component.id ?? `${component.type}-${index}`}
                  props={{
                    originalType: component.type,
                    warning: "Unknown component replaced with fallback",
                  }}
                />
              );
            }

            return (
              <Component
                key={component.id ?? `${component.type}-${index}`}
                props={component.props}
              />
            );
          })
        )}
      </div>
    </div>
  );
}