import type { CSSProperties } from "react";
import type { InternalRenderProps } from "../types";

export function renderTrace({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 35;
  const countBalls = 4;
  const indexes = [0, 1, 3, 2];
  const step = spinnerSize / 2 + spinnerSize / 10;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
        transform: "rotate(45deg)",
      }}
    >
      {Array.from({ length: countBalls / 2 }, (_, i) =>
        Array.from({ length: countBalls / 2 }, (_, j) => {
          const flatIndex = i * 2 + j;
          const index = indexes[flatIndex];

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: `${i * step}px`,
                left: `${j * step}px`,
                width: `${spinnerSize / 5}px`,
                height: `${spinnerSize / 5}px`,
                borderRadius: "50%",
                backgroundColor: "transparent",
                border: `${spinnerSize / 10}px solid var(--spinner-secondary-color, currentColor)`,
                animation: "spinner-trace 4s cubic-bezier(0.75, 0, 0.5, 1) infinite normal",
                animationDelay: `${index}s`,
                ["--spinner-front-color" as string]: "var(--spinner-color, currentColor)",
                ["--spinner-back-color" as string]: "var(--spinner-secondary-color, currentColor)",
              } as CSSProperties}
            />
          );
        }),
      )}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: `${spinnerSize / 5}px`,
          height: `${spinnerSize / 5}px`,
          borderRadius: "50%",
          border: `${spinnerSize / 10}px solid var(--spinner-color, currentColor)`,
          backgroundColor: "var(--spinner-color, currentColor)",
          animation: "spinner-trace-move 4s cubic-bezier(0.75, 0, 0.5, 1) infinite",
          zIndex: 10,
        }}
      />
    </div>
  );
}