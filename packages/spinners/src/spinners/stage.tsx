import type { InternalRenderProps } from "../types";

export function renderStage({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={(size ? { "--spinner-size": `${size}px` } : {}) as React.CSSProperties}
    >
      {Array.from({ length: 3 }, (_, index) => {
        const x = index * 0.4;
        const y = 0.4;

        return (
          <div
            key={`stage-${index}`}
            className="absolute rounded-full"
            style={
              {
                "--spinner-x": `calc(var(--spinner-size, 40px) * ${x})`,
                "--spinner-y": `calc(var(--spinner-size, 40px) * ${y})`,
                top: "var(--spinner-y)",
                left: "var(--spinner-x)",
                width: "calc(var(--spinner-size, 40px) / 5)",
                height: "calc(var(--spinner-size, 40px) / 5)",
                backgroundColor: "var(--spinner-color, currentColor)",
                animation: "spinner-stage 1s ease-in-out infinite",
                animationDelay: `${index * 0.2}s`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}