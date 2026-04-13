import { Spinner, type SpinnerVariant } from "react-spinners-kit-max";
import "react-spinners-kit-max/style.css";

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

export function Gallery() {
  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {variants.map((variant) => (
        <div
          key={variant}
          className="rounded-xl border border-slate-800 bg-slate-900/70 p-3 text-center"
        >
          <div className="flex h-16 items-center justify-center">
            <Spinner variant={variant} size="md" />
          </div>
          <p className="mt-2 text-xs text-slate-300">{variant}</p>
        </div>
      ))}
    </div>
  );
}