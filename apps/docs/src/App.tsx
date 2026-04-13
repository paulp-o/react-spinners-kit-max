import { useState } from "react";
import { Spinner, type SpinnerVariant } from "react-spinners-kit-max";
import { CodeBlock } from "./components/CodeBlock";
import { Gallery } from "./components/Gallery";
import { Playground } from "./components/Playground";
import { GradientBlobs } from "./components/effects/GradientBlobs";
import { GridBackground } from "./components/effects/GridBackground";
import { MeteorLines } from "./components/effects/MeteorLines";
import { TextGradient } from "./components/effects/TextGradient";

const installCommand =
  "npx shadcn add https://paulp-o.github.io/react-spinners-kit-max/r/registry.json";

function App() {
  const [selectedVariant, setSelectedVariant] = useState<SpinnerVariant>("guard");
  const [copiedInstall, setCopiedInstall] = useState(false);

  async function copyInstall() {
    await navigator.clipboard.writeText(installCommand);
    setCopiedInstall(true);
    window.setTimeout(() => setCopiedInstall(false), 1200);
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-zinc-50">
      <GradientBlobs className="opacity-90" />
      <GridBackground className="opacity-40" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.03] mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{ background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)" }}
      />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <header className="relative flex min-h-[78vh] flex-col items-center justify-center gap-8 overflow-hidden border-b border-zinc-900 py-24 text-center">
          <MeteorLines count={10} className="opacity-25" />
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div
              className="animate-aurora-flow absolute left-[-12%] top-[12%] h-28 w-[74%] rounded-full blur-3xl"
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.16) 30%, rgba(6,182,212,0.14) 64%, transparent 100%)",
              }}
            />
            <div
              className="animate-aurora-flow absolute right-[-14%] top-[28%] h-24 w-[68%] rounded-full blur-3xl"
              style={{
                animationDelay: "-9s",
                background: "linear-gradient(90deg, transparent 0%, rgba(6,182,212,0.12) 28%, rgba(16,185,129,0.13) 58%, transparent 100%)",
              }}
            />
            <div
              className="animate-aurora-flow absolute left-[8%] top-[44%] h-20 w-[66%] rounded-full blur-3xl"
              style={{
                animationDelay: "-18s",
                background: "linear-gradient(90deg, transparent 0%, rgba(46,16,101,0.15) 35%, rgba(8,51,68,0.11) 62%, transparent 100%)",
              }}
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(39,39,42,0.28),transparent_55%)]" />
          <div className="relative flex items-center gap-6 [--spinner-color:#ffffff] [--spinner-secondary-color:#71717a]">
            <Spinner variant="guard" size={112} />
            <Spinner variant="cube" size={96} />
            <Spinner variant="spiral" size={84} />
          </div>
          <div className="relative space-y-4">
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl">
              <TextGradient className="text-zinc-50">React Spinners Kit Max</TextGradient>
            </h1>
            <p className="mx-auto max-w-2xl text-base text-zinc-400 sm:text-lg">
              36 beautifully animated, shadcn-compatible spinners for modern React apps. Drop-in ready.
            </p>
          </div>
          <div className="relative flex flex-wrap justify-center gap-3">
            <a
              href="#gallery"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Browse Gallery
            </a>
            <a
              href="https://github.com/paulp-o/react-spinners-kit-max"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-zinc-800 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:border-zinc-700"
            >
              GitHub
            </a>
          </div>
          <div className="relative flex w-full max-w-3xl items-center justify-between gap-3 rounded-xl border border-zinc-900 bg-zinc-950 px-4 py-3">
            <code className="overflow-x-auto text-left text-xs text-zinc-300 sm:text-sm">{installCommand}</code>
            <button
              type="button"
              onClick={copyInstall}
              className="shrink-0 rounded border border-zinc-800 bg-black px-2 py-1 text-xs text-zinc-400 transition hover:text-zinc-100"
            >
              {copiedInstall ? "Copied!" : "Copy"}
            </button>
          </div>
        </header>

        <main className="space-y-24 py-16">
          <section id="gallery" className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Gallery</h2>
              <p className="text-sm text-zinc-500">
                Click any spinner to pin it into the live playground.
              </p>
            </div>
            <Gallery selectedVariant={selectedVariant} onSelectVariant={setSelectedVariant} />
          </section>

          <div
            aria-hidden
            className="mx-auto h-px w-full max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(124,58,237,0.25),transparent)]"
          />

          <section id="playground" className="space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Playground</h2>
              <p className="text-sm text-zinc-500">
                Tune size and colors, then copy production-ready code.
              </p>
            </div>
            <Playground
              selectedVariant={selectedVariant}
              onSelectVariant={setSelectedVariant}
            />
          </section>

          <div
            aria-hidden
            className="mx-auto h-px w-full max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(124,58,237,0.25),transparent)]"
          />

          <section id="install" className="mx-auto max-w-4xl space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Install & Usage</h2>
              <p className="text-sm text-zinc-500">Pick your preferred setup and copy-paste.</p>
            </div>
            <CodeBlock
              tabs={[
                {
                  id: "shadcn",
                  label: "shadcn/ui (Recommended)",
                  code: [
                    "npx shadcn add https://paulp-o.github.io/react-spinners-kit-max/r/registry.json",
                    "",
                    'import { Spinner } from "@/components/ui/spinner"',
                    "",
                    '<Spinner variant=\"guard\" size=\"lg\" />',
                  ].join("\n"),
                },
                {
                  id: "npm",
                  label: "npm package",
                  code: [
                    "npm install react-spinners-kit-max",
                    "",
                    'import { Spinner } from "react-spinners-kit-max"',
                    'import "react-spinners-kit-max/style.css"',
                    "",
                    '<Spinner variant=\"guard\" size=\"lg\" />',
                  ].join("\n"),
                },
              ]}
            />
          </section>
        </main>

        <footer className="flex flex-col gap-3 border-t border-zinc-900 py-12 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Based on the original react-spinners-kit by Dmitry Morozoff. Remixed for shadcn.
          </p>
          <div className="flex items-center gap-4">
            <a className="transition hover:text-zinc-300" href="https://github.com/paulp-o/react-spinners-kit-max">
              GitHub
            </a>
            <a className="transition hover:text-zinc-300" href="https://www.npmjs.com/package/react-spinners-kit-max">
              npm
            </a>
            <a
              className="transition hover:text-zinc-300"
              href="https://github.com/dmitrymorozoff/react-spinners-kit"
            >
              Original
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;