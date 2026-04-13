import type { InternalRenderProps } from "../types";

export function renderGrid({ size }: InternalRenderProps): React.ReactNode {
  const dots = Array.from({ length: 9 }, (_, index) => {
    const x = Math.floor(index / 3) * ((size ?? 40) / 3 + (size ?? 40) / 12);
    const y = (index % 3) * ((size ?? 40) / 3 + (size ?? 40) / 12);

    return (
      <div
        key={`grid-${index}`}
        className="absolute rounded-full"
        style={
          {
            "--spinner-x": `calc(var(--spinner-size, 40px) * ${x / (size ?? 40)})`,
            "--spinner-y": `calc(var(--spinner-size, 40px) * ${y / (size ?? 40)})`,
            top: "var(--spinner-y)",
            left: "var(--spinner-x)",
            width: "calc(var(--spinner-size, 40px) / 6)",
            height: "calc(var(--spinner-size, 40px) / 6)",
            backgroundColor: "var(--spinner-color, currentColor)",
            animation: "spinner-grid 1.5s cubic-bezier(0.23, 1, 0.32, 1) infinite",
          } as React.CSSProperties
        }
      />
    );
  });

  return (
    <div
      className="relative flex items-center justify-center"
      style={
        {
          width: "100%",
          height: "100%",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    >
      {dots}
    </div>
  );
}