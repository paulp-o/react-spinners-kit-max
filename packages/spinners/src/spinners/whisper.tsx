import type { CSSProperties } from "react";
import type { InternalRenderProps } from "../types";

const delays = [0.2, 0.4, 0.6, 0.4, 0.6, 0.8, 0.6, 0.8, 1];

export function renderWhisper({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 50;
  const countBallsInLine = 3;

  return (
    <div
      style={{
        position: "relative",
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
        animation: "spinner-whisper-spin 10s infinite",
      }}
    >
      {Array.from({ length: countBallsInLine * countBallsInLine }, (_, index) => (
        <div
          key={index}
          style={{
            float: "left",
            clear: "right",
            margin: `${spinnerSize / 15}px`,
            width: `${spinnerSize / 5}px`,
            height: `${spinnerSize / 5}px`,
            borderRadius: 2,
            backgroundColor: "var(--spinner-color, currentColor)",
            animationName: "spinner-whisper",
            animationDirection: "alternate",
            animationDuration: "800ms",
            animationIterationCount: "infinite",
            animationDelay: `${delays[index]}s`,
            ["--spinner-front-color" as string]: "var(--spinner-color, currentColor)",
            ["--spinner-back-color" as string]: "var(--spinner-secondary-color, currentColor)",
          } as CSSProperties}
        />
      ))}
    </div>
  );
}