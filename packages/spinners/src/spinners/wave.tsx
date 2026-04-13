import type { InternalRenderProps } from "../types";

export function renderWave({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="relative flex items-center justify-center overflow-hidden"
      style={
        {
          width: "250%",
          height: "100%",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    >
      {Array.from({ length: 10 }, (_, index) => {
        const unit = size ?? 30;
        const x = index * (unit / 5 + (unit / 15 - unit / 100));
        const xRatio = x / unit;

        return (
          <div
            key={`wave-${index}`}
            className="absolute"
            style={
              {
                top: "10%",
                left: `calc(var(--spinner-size, 30px) * ${xRatio})`,
                width: "calc(var(--spinner-size, 30px) / 5)",
                height: "calc(var(--spinner-size, 30px) / 10)",
                marginTop: "calc(var(--spinner-size, 30px) - var(--spinner-size, 30px) / 10)",
                transform: "skewY(0deg)",
                backgroundColor: "var(--spinner-color, currentColor)",
                animation: "spinner-wave 1.25s ease-in-out infinite",
                animationDelay: `${index * 0.15}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}