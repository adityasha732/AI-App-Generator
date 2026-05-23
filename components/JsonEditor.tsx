type JsonEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function JsonEditor({
  value,
  onChange,
}: JsonEditorProps) {
  return (
    <textarea
      className="h-[520px] w-full rounded-xl border border-slate-300 bg-white p-4 font-mono text-sm text-slate-900 caret-slate-900 outline-none focus:border-blue-500"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      spellCheck={false}
      placeholder="Paste JSON config here..."
    />
  );
}