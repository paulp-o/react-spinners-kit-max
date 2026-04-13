import type { InternalRenderProps } from "../types";

export function renderSpiral({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="relative flex items-center justify-center"
      style={
        {
          width: "100%",
          height: "25%",
          perspective: "calc(var(--spinner-size, 40px) * 3)",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={`spiral-wrap-${index}`}
          className="absolute"
          style={
            {
              top: 0,
              left: `calc(var(--spinner-size, 40px) / 4 * ${index})`,
              width: "inherit",
              height: "inherit",
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
                animation: "spinner-spiral 3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
                animationDelay: `${index * 0.15}s`,
              } as React.CSSProperties
            }
          >
            <div
              className="absolute block"
              style={
                {
                  backfaceVisibility: "hidden",
                  width: "inherit",
                  height: "inherit",
                  backgroundColor: "var(--spinner-color, currentColor)",
                  transform: "rotateX(0deg) rotateY(0deg) translateZ(calc(var(--spinner-size, 40px) / 8))",
                } as React.CSSProperties
              }
            />
            <div
              className="absolute block"
              style={
                {
                  backfaceVisibility: "hidden",
                  width: "inherit",
                  height: "inherit",
                  backgroundColor: "var(--spinner-color, currentColor)",
                  transform: "rotateX(0deg) rotateY(180deg) translateZ(calc(var(--spinner-size, 40px) / 8))",
                } as React.CSSProperties
              }
            />
            <div
              className="absolute block"
              style={
                {
                  backfaceVisibility: "hidden",
                  width: "inherit",
                  height: "inherit",
                  backgroundColor: "var(--spinner-secondary-color, currentColor)",
                  transform: "rotateX(-90deg) rotateY(0deg) translateZ(calc(var(--spinner-size, 40px) / 8))",
                } as React.CSSProperties
              }
            />
            <div
              className="absolute block"
              style={
                {
                  backfaceVisibility: "hidden",
                  width: "inherit",
                  height: "inherit",
                  backgroundColor: "var(--spinner-secondary-color, currentColor)",
                  transform: "rotateX(90deg) rotateY(0deg) translateZ(calc(var(--spinner-size, 40px) / 8))",
                } as React.CSSProperties
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}