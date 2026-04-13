import { useMemo } from "react";
import { Spinner, type SpinnerVariant } from "react-spinners-kit-max";
import { CodeBlock } from "./CodeBlock";

type PresetSize = "sm" | "md" | "lg" | "xl";
type PreviewSurface = "dark" | "light" | "card";

interface PlaygroundProps {
  variants: SpinnerVariant[];
  twoColorSet: ReadonlySet<SpinnerVariant>;
  selectedVariant: SpinnerVariant;
  onSelectVariant: (variant: SpinnerVariant) => void;
  surface: PreviewSurface;
  onSurfaceChange: (surface: PreviewSurface) => void;
  presetSize: PresetSize;
  onPresetSizeChange: (size: PresetSize) => void;
  customSize: number;
  onCustomSizeChange: (size: number) => void;
  useCustomSize: boolean;
  onUseCustomSizeChange: (value: boolean) => void;
  primaryColor: string;
  onPrimaryColorChange: (value: string) => void;
  secondaryColor: string;
  onSecondaryColorChange: (value: string) => void;
  speed: 0.5 | 1 | 2;
  onSpeedChange: (value: 0.5 | 1 | 2) => void;
}

const colorPresets = [
  { id: "neon", label: "Neon", primary: "#00ff89", secondary: "#4b4c56" },
  { id: "ocean", label: "Ocean", primary: "#06b6d4", secondary: "#0e7490" },
  { id: "sunset", label: "Sunset", primary: "#f97316", secondary: "#dc2626" },
  { id: "purple", label: "Purple", primary: "#a855f7", secondary: "#7c3aed" },
  { id: "rose", label: "Rose", primary: "#f43f5e", secondary: "#be123c" },
  { id: "mono", label: "Mono", primary: "#ffffff", secondary: "#71717a" },
  { id: "emerald", label: "Emerald", primary: "#10b981", secondary: "#065f46" },
  { id: "amber", label: "Amber", primary: "#f59e0b", secondary: "#b45309" },
] as const;

export function Playground({
  variants,
  twoColorSet,
  selectedVariant,
  onSelectVariant,
  surface,
  onSurfaceChange,
  presetSize,
  onPresetSizeChange,
  customSize,
  onCustomSizeChange,
  useCustomSize,
  onUseCustomSizeChange,
  primaryColor,
  onPrimaryColorChange,
  secondaryColor,
  onSecondaryColorChange,
  speed,
  onSpeedChange,
}: PlaygroundProps) {
  const supportsSecondary = twoColorSet.has(selectedVariant);
  const size = useCustomSize ? Math.max(12, customSize) : presetSize;

  const style = useMemo(
    () =>
      ({
        "--spinner-color": primaryColor,
        "--spinner-secondary-color": supportsSecondary ? secondaryColor : primaryColor,
        "--spinner-duration-scale": 1 / speed,
      }) as React.CSSProperties,
    [primaryColor, secondaryColor, supportsSecondary, speed],
  );

  const usageCode = useMemo(() => {
    const sizeValue = useCustomSize ? customSize : `"${presetSize}"`;
    const speedLine = `const style: CSSProperties = { "--spinner-color": "${primaryColor}", "--spinner-secondary-color": "${
      supportsSecondary ? secondaryColor : primaryColor
    }", "--spinner-duration-scale": ${1 / speed} };`;

    return [
      'import { Spinner } from "react-spinners-kit-max";',
      'import type { CSSProperties } from "react";',
      "",
      speedLine,
      "",
      "export function Example() {",
      `  return <Spinner variant=\"${selectedVariant}\" size={${sizeValue}} style={style} />;`,
      "}",
    ].join("\n");
  }, [selectedVariant, presetSize, useCustomSize, customSize, primaryColor, secondaryColor, supportsSecondary, speed]);

  const previewSurfaceClass =
    surface === "dark"
      ? "bg-black border-zinc-900"
      : surface === "light"
        ? "bg-white border-zinc-300"
        : "bg-zinc-800 border-zinc-700";

  return (
    <div className="min-w-0 space-y-4 rounded-2xl border border-zinc-900 bg-zinc-950 p-4">
      <div className="space-y-1">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Inspector</p>
        <p className="font-mono text-sm text-zinc-300">{`<Spinner variant=\"${selectedVariant}\" />`}</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="variant" className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
          Variant
        </label>
        <select
          id="variant"
          value={selectedVariant}
          onChange={(event) => onSelectVariant(event.target.value as SpinnerVariant)}
          className="h-10 w-full rounded-md border border-zinc-800 bg-black px-3 text-sm text-zinc-100 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
        >
          {variants.map((variant) => (
            <option key={variant} value={variant}>
              {variant}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Preview surface</p>
        <div className="grid grid-cols-3 gap-2">
          {(["dark", "light", "card"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSurfaceChange(item)}
              className={`rounded-md border px-2 py-1.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 ${
                surface === item
                  ? "border-zinc-200 bg-zinc-100 text-black"
                  : "border-zinc-800 bg-black text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div
        className={`flex min-h-[220px] items-center justify-center overflow-hidden rounded-xl border ${previewSurfaceClass} [&_*]:[animation-duration:calc(var(--spinner-duration-scale,1)*1s)]`}
      >
        <div style={style}>
          <Spinner variant={selectedVariant} size={size} />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Size</p>
        <div className="grid grid-cols-[1fr_auto] gap-2">
          <div className="flex flex-wrap gap-2">
            {(["sm", "md", "lg", "xl"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  onPresetSizeChange(item);
                  onUseCustomSizeChange(false);
                }}
                className={`rounded-md border px-2 py-1 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 ${
                  !useCustomSize && presetSize === item
                    ? "border-zinc-200 bg-zinc-100 text-black"
                    : "border-zinc-800 bg-black text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <input
            type="number"
            min={16}
            max={240}
            value={customSize}
            onChange={(event) => {
              onUseCustomSizeChange(true);
              onCustomSizeChange(Number(event.target.value));
            }}
            className="h-8 w-20 rounded-md border border-zinc-800 bg-black px-2 text-xs text-zinc-100 outline-none focus-visible:ring-2 focus-visible:ring-zinc-500"
          />
        </div>
        <input
          type="range"
          min={16}
          max={180}
          value={customSize}
          onChange={(event) => {
            onUseCustomSizeChange(true);
            onCustomSizeChange(Number(event.target.value));
          }}
          className="w-full accent-zinc-100"
        />
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Color presets</p>
        <div className="flex flex-wrap gap-2">
          {colorPresets.map((preset) => {
            const active = primaryColor === preset.primary && secondaryColor === preset.secondary;
            return (
              <button
                key={preset.id}
                type="button"
                title={preset.label}
                onClick={() => {
                  onPrimaryColorChange(preset.primary);
                  onSecondaryColorChange(preset.secondary);
                }}
                className={`h-7 w-7 rounded-full border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 ${
                  active ? "border-zinc-100" : "border-zinc-700 hover:border-zinc-400"
                }`}
                style={{
                  background: `linear-gradient(135deg, ${preset.primary} 0%, ${preset.primary} 50%, ${preset.secondary} 50%, ${preset.secondary} 100%)`,
                }}
              />
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Primary</span>
          <input
            type="color"
            value={primaryColor}
            onChange={(event) => onPrimaryColorChange(event.target.value)}
            className="h-10 w-full rounded-md border border-zinc-800 bg-black p-1"
          />
        </label>

        <label className="space-y-2">
          <span className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Secondary</span>
          <input
            type="color"
            value={secondaryColor}
            onChange={(event) => onSecondaryColorChange(event.target.value)}
            disabled={!supportsSecondary}
            className="h-10 w-full rounded-md border border-zinc-800 bg-black p-1 disabled:cursor-not-allowed disabled:opacity-40"
          />
        </label>
      </div>

      <div className="space-y-2">
        <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">Speed</p>
        <div className="grid grid-cols-3 gap-2">
          {([0.5, 1, 2] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onSpeedChange(item)}
              className={`rounded-md border px-2 py-1.5 text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-500 ${
                speed === item
                  ? "border-zinc-200 bg-zinc-100 text-black"
                  : "border-zinc-800 bg-black text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {item}x
            </button>
          ))}
        </div>
      </div>

      <CodeBlock tabs={[{ id: "usage", label: "Usage", code: usageCode }]} />
    </div>
  );
}