"use client";

import { useMemo, useState } from "react";
import JsonEditor from "@/components/JsonEditor";
import AppPreview from "@/components/AppPreview";
import ErrorPanel from "@/components/ErrorPanel";
import { repairConfigFromString } from "@/lib/repair-config";
import type { AppConfig } from "@/lib/schema";

const sampleConfig = {
  appName: "Student Habit Tracker",
  description: "A simple app to track habits and streaks.",
  theme: {
    mode: "light",
    primaryColor: "#2563eb",
    radius: "md",
  },
  pages: [
    {
      name: "Home",
      path: "/",
      title: "Dashboard",
      components: [
        {
          type: "Navbar",
          props: {},
        },
        {
          type: "Card",
          props: {
            title: "Welcome",
            content: "Track your habits daily and keep your streak alive.",
          },
        },
        {
          type: "Button",
          props: {
            label: "Add Habit",
          },
        },
      ],
    },
  ],
  collections: [
    {
      name: "habits",
      fields: [
        { name: "title", type: "string", required: true },
        { name: "streak", type: "number", required: false },
      ],
    },
  ],
  workflows: [
    {
      name: "Notify missed habit",
      trigger: "manual",
      steps: [
        {
          action: "notify",
          target: "user",
          payload: {
            message: "You missed a habit today",
          },
        },
      ],
    },
  ],
};

export default function HomePage() {
  const [jsonText, setJsonText] = useState(
    JSON.stringify(sampleConfig, null, 2)
  );
  const [repairedConfig, setRepairedConfig] = useState<AppConfig | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [changesMade, setChangesMade] = useState<string[]>([]);
  const [status, setStatus] = useState<string>("Ready");
  const [isValidating, setIsValidating] = useState(false);

  const previewConfig = useMemo(() => repairedConfig, [repairedConfig]);

  const handleValidate = () => {
    setIsValidating(true);
    setStatus("Validating...");

    try {
      const result = repairConfigFromString(jsonText);
      setErrors(result.errors);
      setWarnings(result.warnings);
      setChangesMade(result.changesMade);
      setRepairedConfig(result.repairedConfig);
      setStatus(result.valid ? "Config is valid" : "Config has issues");
    } catch {
      setErrors(["Unexpected validation error"]);
      setWarnings([]);
      setChangesMade([]);
      setRepairedConfig(null);
      setStatus("Validation failed");
    } finally {
      setIsValidating(false);
    }
  };

  const handleAutoHeal = () => {
    setIsValidating(true);
    setStatus("Auto-healing...");

    try {
      const result = repairConfigFromString(jsonText);

      if (result.repairedConfig) {
        const repairedText = JSON.stringify(result.repairedConfig, null, 2);
        setJsonText(repairedText);
        setRepairedConfig(result.repairedConfig);
      }

      setErrors(result.errors);
      setWarnings(result.warnings);
      setChangesMade(result.changesMade);
      setStatus("Auto-heal complete");
    } catch {
      setErrors(["Unexpected auto-heal error"]);
      setWarnings([]);
      setChangesMade([]);
      setStatus("Auto-heal failed");
    } finally {
      setIsValidating(false);
    }
  };

  const handleSave = () => {
    setStatus("Save button ready");
    alert("Save API will be connected next.");
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold text-slate-900">
              ConfigForge
            </h1>
            <p className="text-sm text-slate-600">
              Paste JSON, validate it, auto-heal broken parts, and preview the app.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              onClick={handleValidate}
              disabled={isValidating}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              Validate
            </button>

            <button
              onClick={handleAutoHeal}
              disabled={isValidating}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
            >
              Auto-Heal
            </button>

            <button
              onClick={handleSave}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              Save
            </button>

            <button
              onClick={() => setJsonText(JSON.stringify(sampleConfig, null, 2))}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700"
            >
              Load Sample
            </button>

            <div className="ml-auto text-sm text-slate-500">
              Status: {status}
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="space-y-4">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <h2 className="mb-3 text-lg font-semibold text-slate-900">
                JSON Config
              </h2>
              <JsonEditor value={jsonText} onChange={setJsonText} />
            </div>

            <ErrorPanel
              errors={errors}
              warnings={warnings}
              changesMade={changesMade}
            />
          </section>

          <section className="rounded-2xl bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-lg font-semibold text-slate-900">
              Live Preview
            </h2>
            <AppPreview config={previewConfig} />
          </section>
        </div>
      </div>
    </main>
  );
}