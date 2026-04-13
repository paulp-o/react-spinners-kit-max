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

export function Playground() {
  const [variant, setVariant] = useState<SpinnerVariant>("ball");
  const [presetSize, setPresetSize] = useState<PresetSize>("md");
  const [customSize, setCustomSize] = useState<number>(48);
  const [useCustomSize, setUseCustomSize] = useState(false);
  const [color, setColor] = useState("#00ff89");
  const [secondaryColor, setSecondaryColor] = useState("#4b4c56");

  const size = useCustomSize ? customSize : presetSize;
  const style = useMemo(
    () =>
      ({
        "--spinner-color": color,
        "--spinner-secondary-color": secondaryColor,
      }) as React.CSSProperties,
    [color, secondaryColor],
  );

  const usageCode = useMemo(() => {
    const sizeValue = useCustomSize ? customSize : `"${presetSize}"`;
    const lines = [
      "import { Spinner } from \"react-spinners-kit-max\";",
      "import \"react-spinners-kit-max/style.css\";",
      "",
      `export function Example() {`,
      `  return <Spinner variant=\"${variant}\" size={${sizeValue}} />;`,
      "}",
    ];
    return lines.join("\n");
  }, [variant, useCustomSize, customSize, presetSize]);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="variant">
            Variant
          </label>
          <select
            id="variant"
            value={variant}
            onChange={(event) => setVariant(event.target.value as SpinnerVariant)}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          >
            {variants.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-200">Size presets</p>
          <div className="flex flex-wrap gap-2">
            {(["sm", "md", "lg", "xl"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setUseCustomSize(false);
                  setPresetSize(item);
                }}
                className={`rounded px-3 py-1.5 text-sm ${
                  !useCustomSize && presetSize === item
                    ? "bg-emerald-500 text-slate-950"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="custom-size">
            Custom size (px)
          </label>
          <input
            id="custom-size"
            type="number"
            min={8}
            max={300}
            value={customSize}
            onChange={(event) => {
              setUseCustomSize(true);
              setCustomSize(Number(event.target.value));
            }}
            className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-200">
            Primary color
            <input
              type="color"
              value={color}
              onChange={(event) => setColor(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-700 bg-slate-950 p-1"
            />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-200">
            Secondary color
            <input
              type="color"
              value={secondaryColor}
              onChange={(event) => setSecondaryColor(event.target.value)}
              className="h-10 w-full rounded-md border border-slate-700 bg-slate-950 p-1"
              disabled={!twoColorSpinners.has(variant)}
            />
          </label>
        </div>
      </div>

      <div className="space-y-4 rounded-xl border border-slate-800 bg-slate-900/70 p-4">
        <div className="flex min-h-44 items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-950/70">
          <Spinner variant={variant} size={size} style={style} />
        </div>
        <CodeBlock usageCode={usageCode} />
      </div>
    </div>
  );
}