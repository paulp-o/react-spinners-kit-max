import { useState } from "react";

interface CodeBlockProps {
  usageCode: string;
  shadcnCommand?: string;
  npmCommand?: string;
}

export function CodeBlock({
  usageCode,
  shadcnCommand = "npx shadcn@latest add https://paulp-o.github.io/react-spinners-kit-max/r/spinner.json",
  npmCommand = "npm install react-spinners-kit-max",
}: CodeBlockProps) {
  const [copied, setCopied] = useState<string | null>(null);

  async function onCopy(value: string, label: string) {
    await navigator.clipboard.writeText(value);
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1200);
  }

  return (
    <div className="space-y-3">
      <div className="rounded-lg border border-slate-700 bg-slate-950/80 p-3">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
          <span>shadcn install</span>
          <button
            type="button"
            onClick={() => onCopy(shadcnCommand, "shadcn")}
            className="rounded bg-slate-800 px-2 py-1 hover:bg-slate-700"
          >
            {copied === "shadcn" ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto text-xs text-emerald-300">
          <code>{shadcnCommand}</code>
        </pre>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-950/80 p-3">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
          <span>npm install</span>
          <button
            type="button"
            onClick={() => onCopy(npmCommand, "npm")}
            className="rounded bg-slate-800 px-2 py-1 hover:bg-slate-700"
          >
            {copied === "npm" ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto text-xs text-emerald-300">
          <code>{npmCommand}</code>
        </pre>
      </div>

      <div className="rounded-lg border border-slate-700 bg-slate-950/80 p-3">
        <div className="mb-2 flex items-center justify-between text-xs text-slate-300">
          <span>Usage</span>
          <button
            type="button"
            onClick={() => onCopy(usageCode, "usage")}
            className="rounded bg-slate-800 px-2 py-1 hover:bg-slate-700"
          >
            {copied === "usage" ? "Copied" : "Copy"}
          </button>
        </div>
        <pre className="overflow-x-auto text-xs text-emerald-300">
          <code>{usageCode}</code>
        </pre>
      </div>
    </div>
  );
}