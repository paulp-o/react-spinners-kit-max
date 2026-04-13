import type { InternalRenderProps } from "../types";

export function renderPush({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={
        {
          width: "250%",
          height: "100%",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
          "--spinner-size-unit": "1px",
        } as React.CSSProperties
      }
    >
      {Array.from({ length: 10 }, (_, index) => {
        const unit = size ?? 30;
        const x = index * (unit / 5 + (unit / 15 - unit / 100));
        const xRatio = x / unit;

        return (
          <div
            key={`push-${index}`}
            className="absolute"
            style={
              {
                top: 0,
                left: `calc(var(--spinner-size, 30px) * ${xRatio})`,
                width: "calc(var(--spinner-size, 30px) / 5)",
                height: "100%",
                transform: "scaleY(0.05) translateX(-5px)",
                backgroundColor: "var(--spinner-color, currentColor)",
                animation: "spinner-push 1.25s ease-in-out infinite",
                animationDelay: `${index * 0.15}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}