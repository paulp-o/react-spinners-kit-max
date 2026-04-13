import type { InternalRenderProps } from "../types";

export function renderRing({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 30;
  const ringBorder = spinnerSize / 10;

  return (
    <div
      style={{
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "100%",
          height: "100%",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxShadow: `inset 0 0 0 ${ringBorder}px var(--spinner-color, currentColor)`,
            animation: "spinner-ring-first 2s ease-in-out infinite",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            boxShadow: "inset 0 0 0 0 var(--spinner-color, currentColor)",
            animation: "spinner-ring-second 2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}