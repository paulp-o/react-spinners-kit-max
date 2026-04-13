import type { InternalRenderProps } from "../types";

export function renderFill({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 20;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        width: spinnerSize,
        height: spinnerSize,
        border: `${spinnerSize / 8}px solid var(--spinner-color, currentColor)`,
        animation: "spinner-fill-rotate 3s cubic-bezier(0.77, 0, 0.175, 1) infinite",
      }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "var(--spinner-color, currentColor)",
          animation: "spinner-fill 3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
        }}
      />
    </div>
  );
}