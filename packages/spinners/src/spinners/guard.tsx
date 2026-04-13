import type { InternalRenderProps } from "../types";

export function renderGuard({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="relative flex h-full w-full items-center justify-center"
      style={
        {
          perspective: "calc(var(--spinner-size, 40px) * 3)",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    >
      {Array.from({ length: 9 }, (_, index) => {
        const x = Math.floor(index / 3) * 0.375;
        const y = (index % 3) * 0.375;

        return (
          <div
            key={`guard-wrap-${index}`}
            className="absolute"
            style={
              {
                top: `calc(var(--spinner-size, 40px) * ${y})`,
                left: `calc(var(--spinner-size, 40px) * ${x})`,
                width: "var(--spinner-size, 40px)",
                height: "var(--spinner-size, 40px)",
              } as React.CSSProperties
            }
          >
            <div
              className="relative"
              style={
                {
                  width: "calc(var(--spinner-size, 40px) / 4)",
                  height: "calc(var(--spinner-size, 40px) / 4)",
                  transformStyle: "preserve-3d",
                  animation: "spinner-guard 1.5s cubic-bezier(0.23, 1, 0.32, 1) infinite",
                  animationDelay: `${index * 0.125}s`,
                } as React.CSSProperties
              }
            >
              <div
                className="absolute block"
                style={
                  {
                    width: "inherit",
                    height: "inherit",
                    backgroundColor: "var(--spinner-color, currentColor)",
                    transform: "rotateY(0deg) translateZ(calc(var(--spinner-size, 40px) / 8))",
                  } as React.CSSProperties
                }
              />
              <div
                className="absolute block"
                style={
                  {
                    width: "inherit",
                    height: "inherit",
                    backgroundColor: "var(--spinner-secondary-color, currentColor)",
                    transform: "rotateY(-90deg) translateZ(calc(var(--spinner-size, 40px) / 8))",
                  } as React.CSSProperties
                }
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}