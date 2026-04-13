import { useState } from "react";
import { Spinner, type SpinnerVariant } from "react-spinners-kit-max";
import { BorderBeam } from "./effects/BorderBeam";
import { Spotlight } from "./effects/Spotlight";

type GalleryFilter = "all" | "one" | "two";

interface GalleryProps {
  variants: SpinnerVariant[];
  filteredVariants: SpinnerVariant[];
  twoColorSet: ReadonlySet<SpinnerVariant>;
  selectedVariant: SpinnerVariant;
  highlightedVariant: SpinnerVariant;
  searchQuery: string;
  filter: GalleryFilter;
  onSearchQueryChange: (value: string) => void;
  onFilterChange: (filter: GalleryFilter) => void;
  onSelectVariant: (variant: SpinnerVariant) => void;
  onHighlightVariant: (variant: SpinnerVariant) => void;
}

export function Gallery({
  variants,
  filteredVariants,
  twoColorSet,
  selectedVariant,
  highlightedVariant,
  searchQuery,
  filter,
  onSearchQueryChange,
  onFilterChange,
  onSelectVariant,
  onHighlightVariant,
}: GalleryProps) {
  const [hoverState, setHoverState] = useState({ variant: "" as SpinnerVariant | "", x: 0, y: 0, active: false });
  const [copiedVariant, setCopiedVariant] = useState<SpinnerVariant | null>(null);

  async function copySnippet(variant: SpinnerVariant) {
    await navigator.clipboard.writeText(`<Spinner variant=\"${variant}\" />`);
    setCopiedVariant(variant);
    window.setTimeout(() => setCopiedVariant(null), 900);
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <input
            id="gallery-search"
            value={searchQuery}
            onChange={(event) => onSearchQueryChange(event.target.value)}
            placeholder="Search spinner..."
            className="h-10 w-full rounded-md border border-zinc-800 bg-black px-3 text-sm text-zinc-100 outline-none transition placeholder:text-zinc-500 focus-visible:ring-2 focus-visible:ring-zinc-500 sm:max-w-xs"
          />
          <p className="text-xs text-zinc-500">{filteredVariants.length} results</p>
        </div>

        <div className="flex flex-wrap gap-2">
          {([
            { id: "all", label: `All (${variants.length})` },
            { id: "one", label: "One Color" },
            { id: "two", label: "Two Color" },
          ] as const).map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onFilterChange(item.id)}
                className={`rounded-full border px-3 py-1 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 ${
                  active
                    ? "border-zinc-200 bg-zinc-100 text-black"
                    : "border-zinc-800 bg-black text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-3">
        {filteredVariants.map((variant) => {
          const isSelected = selectedVariant === variant;
          const isHighlighted = highlightedVariant === variant;
          const copied = copiedVariant === variant;

          return (
            <button
              key={variant}
              type="button"
              onClick={() => onSelectVariant(variant)}
              onFocus={() => onHighlightVariant(variant)}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setHoverState({ variant, x: event.clientX - rect.left, y: event.clientY - rect.top, active: true });
              }}
              onMouseLeave={() => setHoverState((current) => ({ ...current, active: false }))}
              className={`group relative overflow-hidden rounded-lg border bg-zinc-950 p-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 ${
                isSelected
                  ? "border-zinc-500"
                  : isHighlighted
                    ? "border-zinc-700"
                    : "border-zinc-900 hover:border-zinc-700 hover:bg-zinc-900"
              }`}
            >
              <Spotlight
                x={hoverState.x}
                y={hoverState.y}
                active={hoverState.active && hoverState.variant === variant}
                className="mix-blend-screen"
              />
              <BorderBeam />

              <div className="absolute right-1 top-1 z-20 opacity-0 transition group-hover:opacity-100">
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    void copySnippet(variant);
                  }}
                  className="rounded border border-zinc-700 bg-black/80 px-1.5 py-0.5 text-[10px] text-zinc-300 backdrop-blur hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
                >
                  {copied ? "✓" : "Copy"}
                </button>
              </div>

              <div className="aspect-square w-full [--spinner-color:#71717a] [--spinner-secondary-color:#a1a1aa] transition group-hover:[--spinner-color:#fafafa]">
                <div className="flex h-full items-center justify-center">
                  <Spinner variant={variant} size="md" />
                </div>
              </div>
              <p className="mt-1 truncate text-center font-mono text-[11px] text-zinc-500 transition group-hover:text-zinc-300">
                {variant}{twoColorSet.has(variant) ? " • 2c" : ""}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}