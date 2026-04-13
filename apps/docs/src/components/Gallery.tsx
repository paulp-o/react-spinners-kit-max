import { useState } from "react";
import { Spinner, type SpinnerVariant } from "react-spinners-kit-max";
import { BorderBeam } from "./effects/BorderBeam";
import { Spotlight } from "./effects/Spotlight";

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

interface GalleryProps {
  selectedVariant: SpinnerVariant;
  onSelectVariant: (variant: SpinnerVariant) => void;
}

export function Gallery({ selectedVariant, onSelectVariant }: GalleryProps) {
  const [hoverState, setHoverState] = useState({
    variant: "" as SpinnerVariant | "",
    x: 0,
    y: 0,
    active: false,
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] gap-4">
      {variants.map((variant) => {
        const isActive = selectedVariant === variant;

        return (
          <button
            key={variant}
            type="button"
            onClick={() => onSelectVariant(variant)}
            onMouseMove={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              setHoverState({
                variant,
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
                active: true,
              });
            }}
            onMouseLeave={() => {
              setHoverState((current) => ({ ...current, active: false }));
            }}
            className={`group relative overflow-hidden rounded-xl border bg-zinc-950 p-3 text-left transition ${
              isActive
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
            <div className="aspect-square w-full [--spinner-color:#71717a] [--spinner-secondary-color:#a1a1aa] transition group-hover:[--spinner-color:#fafafa] group-hover:[--spinner-secondary-color:#ffffff]">
              <div className="flex h-full items-center justify-center">
                <Spinner variant={variant} size="md" />
              </div>
            </div>
            <p className="mt-2 truncate text-center font-mono text-[11px] text-zinc-500 transition group-hover:text-zinc-300">
              {variant}
            </p>
          </button>
        );
      })}
    </div>
  );
}