import ComponentRenderer from "./ComponentRenderer";

type PageConfig = {
  id?: string;
  name: string;
  path?: string;
  title?: string;
  components?: {
    id?: string;
    type: string;
    props?: Record<string, unknown>;
  }[];
};

type AppConfig = {
  appName: string;
  description?: string;
  pages?: PageConfig[];
};

type AppPreviewProps = {
  config: AppConfig | null;
  selectedPageIndex?: number;
};

export default function AppPreview({
  config,
  selectedPageIndex = 0,
}: AppPreviewProps) {
  if (!config) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Preview will appear here.
      </div>
    );
  }

  const pages = config.pages ?? [];
  const page = pages[selectedPageIndex] ?? pages[0];

  if (!page) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        No page found in the config.
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 border-b border-slate-100 pb-4">
        <div className="text-sm uppercase tracking-wide text-slate-500">
          {config.appName}
        </div>
        <div className="text-lg font-semibold text-slate-900">
          {config.description ?? "Generated app preview"}
        </div>
      </div>

      <ComponentRenderer page={page} />
    </div>
  );
}