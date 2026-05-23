import type { ComponentType } from "react";

type RendererProps = {
  props?: Record<string, unknown>;
};

function Text({ props }: RendererProps) {
  return (
    <p className="text-sm text-slate-700">
      {(props?.text as string) ?? "Text component"}
    </p>
  );
}

function Button({ props }: RendererProps) {
  return (
    <button className="rounded-md bg-blue-600 px-4 py-2 text-white">
      {(props?.label as string) ?? "Button"}
    </button>
  );
}

function Input({ props }: RendererProps) {
  return (
    <input
      className="w-full rounded-md border border-slate-300 px-3 py-2"
      placeholder={(props?.placeholder as string) ?? "Input"}
      defaultValue={(props?.value as string) ?? ""}
    />
  );
}

function Card({ props }: RendererProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-sm font-medium text-slate-900">
        {(props?.title as string) ?? "Card"}
      </div>
      <div className="mt-2 text-sm text-slate-600">
        {(props?.content as string) ?? "Card content"}
      </div>
    </div>
  );
}

function Table({ props }: RendererProps) {
  const rows = Array.isArray(props?.rows) ? (props?.rows as string[][]) : [];
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-4 py-2 font-medium">Column 1</th>
            <th className="px-4 py-2 font-medium">Column 2</th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows.map((row, idx) => (
              <tr key={idx} className="border-t">
                <td className="px-4 py-2">{row[0] ?? ""}</td>
                <td className="px-4 py-2">{row[1] ?? ""}</td>
              </tr>
            ))
          ) : (
            <tr className="border-t">
              <td className="px-4 py-2 text-slate-500" colSpan={2}>
                Table component
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

function Form({ props }: RendererProps) {
  return (
    <form className="space-y-3 rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-sm font-medium text-slate-900">
        {(props?.title as string) ?? "Form"}
      </div>
      <input
        className="w-full rounded-md border border-slate-300 px-3 py-2"
        placeholder="Example field"
      />
      <button className="rounded-md bg-slate-900 px-4 py-2 text-white">
        Submit
      </button>
    </form>
  );
}

function Navbar() {
  return (
    <div className="rounded-lg bg-slate-900 px-4 py-3 text-white">Navbar</div>
  );
}

function Sidebar() {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      Sidebar
    </div>
  );
}

export const componentRegistry: Record<string, ComponentType<RendererProps>> = {
  Text,
  Button,
  Input,
  Card,
  Table,
  Form,
  Navbar,
  Sidebar,
};