import type { InternalRenderProps } from "../types";

export function renderSphere({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 30;
  const radius = spinnerSize / 2;
  const ballSize = spinnerSize / 5;
  const offset = ballSize / 2;
  const count = 7;
  const angle = 360 / count;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: spinnerSize,
        height: spinnerSize,
        animation: "spinner-sphere-rotate 8s linear infinite",
      }}
    >
      {Array.from({ length: count }).map((_, index) => {
        const y = Math.sin(angle * index * (Math.PI / 180)) * radius - offset;
        const x = Math.cos(angle * index * (Math.PI / 180)) * radius - offset;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: spinnerSize / 2,
              left: spinnerSize / 2,
              width: ballSize,
              height: ballSize,
              borderRadius: "50%",
              backgroundColor: "var(--spinner-color, currentColor)",
              transform: `translateX(${y}px) translateY(${x}px)`,
              animation: "spinner-sphere 5s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
              animationDelay: `${index * 0.3}s`,
              ["--spinner-size" as string]: `${spinnerSize}px`,
              ["--spinner-x" as string]: `${y}px`,
              ["--spinner-y" as string]: `${x}px`,
            }}
          />
        );
      })}
    </div>
  );
}