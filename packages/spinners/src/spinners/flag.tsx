import type { InternalRenderProps } from "../types";

export function renderFlag({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 40;
  const count = 4;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: spinnerSize,
        height: spinnerSize,
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const lineIndexBase = i * count;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              animation: "spinner-flag 1.5s cubic-bezier(0.86, 0, 0.07, 1) infinite",
              animationDelay: `${lineIndexBase * 0.05}s`,
              ["--spinner-size" as string]: `${spinnerSize}px`,
            }}
          >
            {Array.from({ length: count }).map((_, j) => (
              <div
                key={`${i}-${j}`}
                style={{
                  position: "absolute",
                  top: j * (spinnerSize / 6 + spinnerSize / 9) + spinnerSize / 10,
                  left: i * (spinnerSize / 6 + spinnerSize / 9),
                  width: spinnerSize / 6,
                  height: spinnerSize / 6,
                  backgroundColor: "var(--spinner-color, currentColor)",
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}