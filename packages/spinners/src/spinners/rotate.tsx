import type { InternalRenderProps } from "../types";

export function renderRotate({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 45;
  const ballSize = spinnerSize / 5;

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
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            left: "50%",
            top: "0%",
            width: ballSize,
            height: ballSize,
            borderRadius: "50%",
            backgroundColor: "var(--spinner-color, currentColor)",
            transform: "translateX(-50%) translateY(100%)",
            transformOrigin: "0 250% 0",
            animation: "spinner-rotate 4s both infinite",
            animationTimingFunction: `cubic-bezier(0.5, ${index * 0.3}, 0.9, 0.9)`,
          }}
        />
      ))}
    </div>
  );
}