type ErrorPanelProps = {
  errors: string[];
  warnings: string[];
  changesMade?: string[];
};

export default function ErrorPanel({
  errors,
  warnings,
  changesMade = [],
}: ErrorPanelProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-red-200 bg-red-50 p-4">
        <div className="mb-2 text-sm font-semibold text-red-700">Errors</div>
        {errors.length === 0 ? (
          <div className="text-sm text-red-700">No errors.</div>
        ) : (
          <ul className="list-disc space-y-1 pl-5 text-sm text-red-700">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <div className="mb-2 text-sm font-semibold text-amber-700">Warnings</div>
        {warnings.length === 0 ? (
          <div className="text-sm text-amber-700">No warnings.</div>
        ) : (
          <ul className="list-disc space-y-1 pl-5 text-sm text-amber-700">
            {warnings.map((warning, index) => (
              <li key={index}>{warning}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
        <div className="mb-2 text-sm font-semibold text-slate-700">
          Auto-heal changes
        </div>
        {changesMade.length === 0 ? (
          <div className="text-sm text-slate-500">No changes yet.</div>
        ) : (
          <ul className="list-disc space-y-1 pl-5 text-sm text-slate-700">
            {changesMade.map((change, index) => (
              <li key={index}>{change}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}