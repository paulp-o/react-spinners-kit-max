import type { InternalRenderProps } from "../types";

export function renderBars({ size }: InternalRenderProps): React.ReactNode {
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
      {Array.from({ length: 5 }, (_, index) => {
        const xRatio = ((index * (((size ?? 40) / 5 + (size ?? 40) / 25) - (size ?? 40) / 12)) / (size ?? 40));

        return (
          <div
            key={`bars-${index}`}
            className="absolute"
            style={
              {
                left: `calc(var(--spinner-size, 40px) * ${xRatio})`,
                width: "calc(var(--spinner-size, 40px) / 20)",
                height: "100%",
                backgroundColor: "var(--spinner-color, currentColor)",
                animation: "spinner-bars 1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
                animationDelay: `${index * 0.15}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}