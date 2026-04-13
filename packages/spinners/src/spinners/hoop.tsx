import type { InternalRenderProps } from "../types";

export function renderHoop({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 45;
  const countBallsInLine = 6;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
        perspective: "600px",
        transformStyle: "preserve-3d",
      }}
    >
      {Array.from({ length: countBallsInLine }, (_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: `${spinnerSize / 1.5}px`,
            height: `${spinnerSize / 1.5}px`,
            border: `${spinnerSize / 5}px solid var(--spinner-color, currentColor)`,
            borderRadius: "50%",
            backgroundColor: "transparent",
            transformStyle: "preserve-3d",
            transform: "scale(0) rotateX(60deg)",
            opacity: 1 - index * 0.2,
            animation: "spinner-hoop 3s cubic-bezier(0.67, 0.08, 0.46, 1.5) infinite",
            animationDelay: `${index * 200}ms`,
          }}
        />
      ))}
    </div>
  );
}