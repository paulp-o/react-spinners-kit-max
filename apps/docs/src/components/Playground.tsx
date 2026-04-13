import { useMemo, useState } from "react";
import { Spinner, type SpinnerVariant } from "react-spinners-kit-max";
import { CodeBlock } from "./CodeBlock";

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

const twoColorSpinners = new Set<SpinnerVariant>([
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

type PresetSize = "sm" | "md" | "lg" | "xl";

interface PlaygroundProps {
  selectedVariant: SpinnerVariant;
  onSelectVariant: (variant: SpinnerVariant) => void;
}

export function Playground({ selectedVariant, onSelectVariant }: PlaygroundProps) {
  const [presetSize, setPresetSize] = useState<PresetSize>("lg");
  const [customSize, setCustomSize] = useState(72);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [color, setColor] = useState("#fafafa");
  const [secondaryColor, setSecondaryColor] = useState("#71717a");

  const size = useCustomSize ? Math.max(12, customSize) : presetSize;
  const supportsSecondary = twoColorSpinners.has(selectedVariant);

  const style = useMemo(
    () =>
      ({
        "--spinner-color": color,
        "--spinner-secondary-color": supportsSecondary ? secondaryColor : color,
      }) as React.CSSProperties,
    [color, secondaryColor, supportsSecondary],
  );

  const usageCode = useMemo(() => {
    const sizeValue = useCustomSize ? customSize : `"${presetSize}"`;
    const styleLine = supportsSecondary
      ? `const style: CSSProperties = { "--spinner-color": "${color}", "--spinner-secondary-color": "${secondaryColor}" };`
      : `const style: CSSProperties = { "--spinner-color": "${color}" };`;

    return [
      'import { Spinner } from "react-spinners-kit-max";',
      'import type { CSSProperties } from "react";',
      "",
      styleLine,
      "",
      "export function Example() {",
      `  return <Spinner variant=\"${selectedVariant}\" size={${sizeValue}} style={style} />;`,
      "}",
    ].join("\n");
  }, [selectedVariant, presetSize, useCustomSize, customSize, color, secondaryColor, supportsSecondary]);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
      <div className="rounded-2xl border border-zinc-900 bg-zinc-950 p-6">
        <p className="mb-3 text-[11px] uppercase tracking-[0.18em] text-zinc-500">Preview</p>
        <div className="flex min-h-[320px] items-center justify-center rounded-xl border border-zinc-900 bg-black">
          <div style={style}>
            <Spinner variant={selectedVariant} size={size} />
          </div>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-zinc-900 bg-zinc-950 p-4">
        <div className="space-y-2">
          <label htmlFor="variant" className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
            Variant
          </label>
          <select
            id="variant"
            value={selectedVariant}
            onChange={(event) => onSelectVariant(event.target.value as SpinnerVariant)}
            className="w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
          >
            {variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Size</p>
          <div className="flex gap-2">
            {(["sm", "md", "lg", "xl"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setPresetSize(item);
                  setUseCustomSize(false);
                }}
                className={`rounded-md border px-3 py-1.5 text-xs font-medium transition ${
                  !useCustomSize && presetSize === item
                    ? "border-zinc-100 bg-zinc-100 text-black"
                    : "border-zinc-800 bg-black text-zinc-300 hover:text-zinc-100"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <input
            type="range"
            min={16}
            max={180}
            value={customSize}
            onChange={(event) => {
              setUseCustomSize(true);
              setCustomSize(Number(event.target.value));
            }}
            className="w-full accent-zinc-100"
          />
          <input
            type="number"
            min={16}
            max={240}
            value={customSize}
            onChange={(event) => {
              setUseCustomSize(true);
              setCustomSize(Number(event.target.value));
            }}
            className="w-full rounded-md border border-zinc-800 bg-black px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-600"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Primary</span>
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              className="h-10 w-full rounded-md border border-zinc-800 bg-black p-1"
            />
          </label>

          <label className="space-y-2">
            <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Secondary</span>
            <input
              type="color"
              value={secondaryColor}
              onChange={(event) => setSecondaryColor(event.target.value)}
              disabled={!supportsSecondary}
              className="h-10 w-full rounded-md border border-zinc-800 bg-black p-1 disabled:cursor-not-allowed disabled:opacity-40"
            />
          </label>
        </div>

        <CodeBlock
          tabs={[
            {
              id: "usage",
              label: "Usage",
              code: usageCode,
            },
          ]}
        />
      </div>
    </div>
  );
}