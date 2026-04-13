import type { InternalRenderProps } from "../types";

const MID_POSITIONS = [
  { x: 0.75, y: 0.375 },
  { x: 0.375, y: 0 },
  { x: 0, y: 0.375 },
];

export function renderSwap({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="relative flex items-center justify-center"
      style={
        {
          width: "100%",
          height: "62.5%",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    >
      {Array.from({ length: 3 }, (_, index) => {
        const x = index * 0.375;
        const y = 0.375;
        const mid = MID_POSITIONS[index];

        return (
          <div
            key={`swap-${index}`}
            className="absolute rounded-full"
            style={
              {
                "--spinner-x": `calc(var(--spinner-size, 40px) * ${x})`,
                "--spinner-y": `calc(var(--spinner-size, 40px) * ${y})`,
                "--spinner-swap-mid-x": `calc(var(--spinner-size, 40px) * ${mid.x})`,
                "--spinner-swap-mid-y": `calc(var(--spinner-size, 40px) * ${mid.y})`,
                top: "var(--spinner-y)",
                left: "var(--spinner-x)",
                width: "calc(var(--spinner-size, 40px) / 4)",
                height: "calc(var(--spinner-size, 40px) / 4)",
                backgroundColor: "var(--spinner-color, currentColor)",
                animation: "spinner-swap 1.5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
                animationTimingFunction: index === 1 ? "cubic-bezier(1, 0, 0, 1)" : undefined,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}