import { useCallback, useEffect, useMemo, useState } from "react";
import { Spinner, type SpinnerVariant } from "react-spinners-kit-max";
import { CodeBlock } from "./components/CodeBlock";
import { Gallery } from "./components/Gallery";
import { Playground } from "./components/Playground";
import { GradientBlobs } from "./components/effects/GradientBlobs";
import { GridBackground } from "./components/effects/GridBackground";
import { MeteorLines } from "./components/effects/MeteorLines";
import { TextGradient } from "./components/effects/TextGradient";

const variants: SpinnerVariant[] = [
  "ball",
  "grid",
  "swap",
  "bars",
  "wave",
  "push",
  "firework",
  "stage",
  "heart",
  "guard",
  "circle",
  "spiral",
  "pulse",
  "sequence",
  "domino",
  "impulse",
  "cube",
  "fill",
  "sphere",
  "flag",
  "clap",
  "rotate",
  "swish",
  "goo",
  "comb",
  "pong",
  "rainbow",
  "ring",
  "hoop",
  "flapper",
  "magic",
  "jellyfish",
  "trace",
  "classic",
  "whisper",
  "metro",
];

const marqueeVariants: SpinnerVariant[] = [
  "ball",
  "circle",
  "cube",
  "heart",
  "guard",
  "spiral",
  "wave",
  "firework",
  "rainbow",
  "magic",
  "metro",
  "classic",
];

const twoColorSet = new Set<SpinnerVariant>([
  "guard",
  "spiral",
  "sequence",
  "impulse",
  "cube",
  "swish",
  "trace",
  "whisper",
  "clap",
]);

const installCommand =
  "npx shadcn add https://paulp-o.github.io/react-spinners-kit-max/r/registry.json";

type GalleryFilter = "all" | "one" | "two";
type PresetSize = "sm" | "md" | "lg" | "xl";
type PreviewSurface = "dark" | "light" | "card";

function App() {
  const [selectedVariant, setSelectedVariant] = useState<SpinnerVariant>("guard");
  const [highlightedVariant, setHighlightedVariant] = useState<SpinnerVariant>("guard");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<GalleryFilter>("all");
  const [copiedInstall, setCopiedInstall] = useState(false);

  const [surface, setSurface] = useState<PreviewSurface>("dark");
  const [presetSize, setPresetSize] = useState<PresetSize>("lg");
  const [customSize, setCustomSize] = useState(72);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [primaryColor, setPrimaryColor] = useState("#00ff89");
  const [secondaryColor, setSecondaryColor] = useState("#4b4c56");
  const [paused, setPaused] = useState(false);

  const filteredVariants = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    return variants.filter((variant) => {
      const matchesKeyword = keyword.length === 0 || variant.includes(keyword);
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "two"
            ? twoColorSet.has(variant)
            : !twoColorSet.has(variant);
      return matchesKeyword && matchesFilter;
    });
  }, [searchQuery, filter]);


  useEffect(() => {
    if (!filteredVariants.includes(selectedVariant) && filteredVariants[0]) {
      setSelectedVariant(filteredVariants[0]);
      setHighlightedVariant(filteredVariants[0]);
    }
  }, [filteredVariants, selectedVariant]);

  useEffect(() => {
    if (!filteredVariants.includes(highlightedVariant) && filteredVariants[0]) {
      setHighlightedVariant(filteredVariants[0]);
    }
  }, [filteredVariants, highlightedVariant]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName?.toLowerCase();
      const editable = tag === "input" || tag === "textarea" || tag === "select" || target?.isContentEditable;

      if (event.key === "/" && !editable) {
        event.preventDefault();
        const search = document.getElementById("gallery-search") as HTMLInputElement | null;
        search?.focus();
        return;
      }

      if (editable || filteredVariants.length === 0) return;

      const currentIndex = Math.max(0, filteredVariants.indexOf(highlightedVariant));
      if (["ArrowRight", "ArrowDown"].includes(event.key)) {
        event.preventDefault();
        setHighlightedVariant(filteredVariants[(currentIndex + 1) % filteredVariants.length]);
      } else if (["ArrowLeft", "ArrowUp"].includes(event.key)) {
        event.preventDefault();
        setHighlightedVariant(filteredVariants[(currentIndex - 1 + filteredVariants.length) % filteredVariants.length]);
      } else if (event.key === "Enter") {
        event.preventDefault();
        setSelectedVariant(highlightedVariant);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [filteredVariants, highlightedVariant]);

  const copyInstall = useCallback(async () => {
    await navigator.clipboard.writeText(installCommand);
    setCopiedInstall(true);
    window.setTimeout(() => setCopiedInstall(false), 1200);
  }, []);

  const handleSelectVariant = useCallback((variant: SpinnerVariant) => {
    setSelectedVariant(variant);
    setHighlightedVariant(variant);
  }, []);

  const handleHighlightVariant = useCallback((variant: SpinnerVariant) => {
    setHighlightedVariant(variant);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-zinc-50">
      <GradientBlobs className="opacity-70" />
      <GridBackground className="opacity-25" />
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
        <header className="relative flex min-h-[40vh] flex-col items-center justify-center gap-5 overflow-hidden border-b border-zinc-900 py-12 text-center">
          <MeteorLines count={5} className="opacity-12" />
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl">
            <TextGradient className="text-zinc-50">React Spinners Kit Max</TextGradient>
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-zinc-400 sm:text-base">
            36 animated spinner components for React. Modernized from react-spinners-kit.
          </p>

          <div className="gpu-layer w-full max-w-4xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <div className="gpu-layer flex w-max animate-[marquee_34s_linear_infinite] gap-4 [--spinner-color:#ffffff] [--spinner-secondary-color:#71717a]">
              {[...marqueeVariants, ...marqueeVariants].map((variant, i) => (
                <div key={`${variant}-${i}`} className="flex flex-col items-center gap-2 rounded-lg border border-zinc-900 bg-zinc-950/80 px-3 py-3">
                  <Spinner variant={variant} size={44} />
                  <span className="font-mono text-[10px] text-zinc-500">{variant}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex w-full max-w-3xl items-center justify-between gap-3 rounded-xl border border-zinc-900 bg-zinc-950 px-4 py-3">
            <code className="overflow-x-auto text-left text-xs text-zinc-300 sm:text-sm">{installCommand}</code>
            <button
              type="button"
              onClick={copyInstall}
              className="shrink-0 rounded border border-zinc-800 bg-black px-2 py-1 text-xs text-zinc-400 transition hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
            >
              {copiedInstall ? "Copied!" : "Copy"}
            </button>
          </div>
        </header>

        <main className="space-y-12 py-8">
          <section id="studio" className="content-auto space-y-4">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Explore</h2>
              <p className="text-sm text-zinc-500">Use Arrow keys to move, Enter to select, and / to focus search.</p>
            </div>

            <div className="grid gap-4 lg:grid-cols-[1fr_400px]">
              <div className="min-w-0 rounded-2xl border border-zinc-900 bg-zinc-950 p-4 lg:max-h-[100vh] lg:overflow-y-auto">
                <Gallery
                  variants={variants}
                  filteredVariants={filteredVariants}
                  twoColorSet={twoColorSet}
                  selectedVariant={selectedVariant}
                  highlightedVariant={highlightedVariant}
                  searchQuery={searchQuery}
                  filter={filter}
                  onSearchQueryChange={setSearchQuery}
                  onFilterChange={setFilter}
                  onSelectVariant={handleSelectVariant}
                  onHighlightVariant={handleHighlightVariant}
                />
              </div>

              <div className="min-w-0 lg:sticky lg:top-0 lg:h-screen lg:overflow-y-auto">
                <Playground
                  variants={variants}
                  twoColorSet={twoColorSet}
                  selectedVariant={selectedVariant}
                  onSelectVariant={handleSelectVariant}
                  surface={surface}
                  onSurfaceChange={setSurface}
                  presetSize={presetSize}
                  onPresetSizeChange={setPresetSize}
                  customSize={customSize}
                  onCustomSizeChange={setCustomSize}
                  useCustomSize={useCustomSize}
                  onUseCustomSizeChange={setUseCustomSize}
                  primaryColor={primaryColor}
                  onPrimaryColorChange={setPrimaryColor}
                  secondaryColor={secondaryColor}
                  onSecondaryColorChange={setSecondaryColor}
                  paused={paused}
                  onPausedChange={setPaused}
                />
              </div>
            </div>
          </section>

          <div
            aria-hidden
            className="mx-auto h-px w-full max-w-5xl bg-[linear-gradient(90deg,transparent,rgba(124,58,237,0.25),transparent)]"
          />

          <section id="install" className="content-auto mx-auto max-w-4xl space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">Install</h2>
              <p className="text-sm text-zinc-500">Choose package manager and copy instantly.</p>
            </div>
            <CodeBlock
              tabs={[
                { id: "pnpm", label: "pnpm", code: "pnpm add react-spinners-kit-max" },
                { id: "npm", label: "npm", code: "npm install react-spinners-kit-max" },
                { id: "yarn", label: "yarn", code: "yarn add react-spinners-kit-max" },
                { id: "bun", label: "bun", code: "bun add react-spinners-kit-max" },
              ]}
            />
          </section>
        </main>

        <footer className="flex flex-col gap-3 border-t border-zinc-900 py-12 text-sm text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <p>Based on the original react-spinners-kit by Dmitry Morozoff. Remixed for shadcn.</p>
          <div className="flex items-center gap-4">
            <a className="transition hover:text-zinc-300" href="https://github.com/paulp-o/react-spinners-kit-max">
              GitHub
            </a>
            <a className="transition hover:text-zinc-300" href="https://www.npmjs.com/package/react-spinners-kit-max">
              npm
            </a>
            <a className="transition hover:text-zinc-300" href="https://github.com/dmitrymorozoff/react-spinners-kit">
              Original
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;