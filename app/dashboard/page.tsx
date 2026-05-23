export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Saved apps and version history will appear here.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
          No saved apps yet.
        </div>
      </div>
    </main>
  );
}