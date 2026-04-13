import { useMemo, useState } from "react";

interface CodeTab {
  id: string;
  label: string;
  code: string;
}

interface CodeBlockProps {
  tabs: CodeTab[];
  defaultTab?: string;
}

export function CodeBlock({ tabs, defaultTab }: CodeBlockProps) {
  const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.id ?? "");
  const [copied, setCopied] = useState(false);

  const currentTab = useMemo(
    () => tabs.find((tab) => tab.id === activeTab) ?? tabs[0],
    [activeTab, tabs],
  );

  async function handleCopy() {
    if (!currentTab) return;
    await navigator.clipboard.writeText(currentTab.code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  if (!currentTab) return null;

  return (
    <div className="relative rounded-xl border border-zinc-800 bg-zinc-950 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="inline-flex flex-wrap rounded-md border border-zinc-800 bg-black p-1">
          {tabs.map((tab) => {
            const isActive = tab.id === currentTab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded px-2.5 py-1 text-[11px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 ${
                  isActive
                    ? "bg-zinc-100 text-black"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="rounded border border-zinc-800 bg-black px-2 py-1 text-[11px] text-zinc-300 transition hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <pre className="overflow-x-auto rounded-md border border-zinc-900 bg-black p-3 text-[12px] leading-5 text-zinc-300">
        <code>{currentTab.code}</code>
      </pre>
    </div>
  );
}