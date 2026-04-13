import type { CSSProperties } from "react";
import type { InternalRenderProps } from "../types";

export function renderFlapper({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 30;
  const radius = spinnerSize / 2;
  const countBalls = 7;
  const ballSize = spinnerSize / 1.5;
  const angle = 360 / countBalls;
  const offset = ballSize / 2;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
      }}
    >
      {Array.from({ length: countBalls }, (_, index) => {
        const y = Math.sin(angle * index * (Math.PI / 180)) * radius - offset;
        const x = Math.cos(angle * index * (Math.PI / 180)) * radius - offset;

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              top: `${spinnerSize / 2}px`,
              left: `${spinnerSize / 2}px`,
              width: `${ballSize}px`,
              height: `${ballSize}px`,
              borderRadius: "50%",
              backgroundColor: "var(--spinner-color, currentColor)",
              transform: `translateX(${y}px) translateY(${x}px) scale(0)`,
              animation: "spinner-flapper 0.8s linear infinite",
              animationDelay: `${index * 0.1}s`,
              ["--spinner-x" as string]: `${y}px`,
              ["--spinner-y" as string]: `${x}px`,
            } as CSSProperties}
          />
        );
      })}
    </div>
  );
}