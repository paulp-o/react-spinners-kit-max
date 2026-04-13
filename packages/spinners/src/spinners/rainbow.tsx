import type { CSSProperties } from "react";
import type { InternalRenderProps } from "../types";

export function renderRainbow({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 50;

  return (
    <div
      style={{
        width: `${spinnerSize}px`,
        height: `${spinnerSize / 2}px`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${spinnerSize}px`,
          height: `${spinnerSize}px`,
          borderRadius: "50%",
          borderStyle: "solid",
          borderTopColor: "var(--spinner-color, currentColor)",
          borderRightColor: "var(--spinner-color, currentColor)",
          borderLeftColor: "transparent",
          borderBottomColor: "transparent",
          boxSizing: "border-box",
          transform: "rotate(-200deg)",
          animation: "spinner-rainbow 3s ease-in-out infinite",
          ["--spinner-size-unit" as string]: "1px",
        } as CSSProperties}
      />
    </div>
  );
}