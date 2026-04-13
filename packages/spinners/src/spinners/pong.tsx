import type { CSSProperties } from "react";
import type { InternalRenderProps } from "../types";

export function renderPong({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 60;
  const ballSize = spinnerSize / 8;
  const playerTopA = spinnerSize / 3.5;
  const playerTopB = 0;

  return (
    <div
      style={{
        position: "relative",
        width: `${spinnerSize}px`,
        height: `${spinnerSize / 1.75}px`,
      }}
    >
      <div
        style={{
          position: "absolute",
          width: `${spinnerSize / 12}px`,
          height: `${spinnerSize / 3}px`,
          left: 0,
          borderRadius: 4,
          backgroundColor: "var(--spinner-color, currentColor)",
          animation: "spinner-pong-player 2s linear infinite",
          ["--spinner-pong-player-top-a" as string]: `${playerTopB}px`,
          ["--spinner-pong-player-top-b" as string]: `${playerTopA}px`,
        } as CSSProperties}
      />
      <div
        style={{
          position: "absolute",
          width: `${ballSize}px`,
          height: `${ballSize}px`,
          borderRadius: "50%",
          backgroundColor: "var(--spinner-color, currentColor)",
          animation: "spinner-pong-ball 2s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: `${spinnerSize / 12}px`,
          height: `${spinnerSize / 3}px`,
          right: 0,
          borderRadius: 4,
          backgroundColor: "var(--spinner-color, currentColor)",
          animation: "spinner-pong-player 2s linear infinite",
          ["--spinner-pong-player-top-a" as string]: `${playerTopA}px`,
          ["--spinner-pong-player-top-b" as string]: `${playerTopB}px`,
        } as CSSProperties}
      />
    </div>
  );
}