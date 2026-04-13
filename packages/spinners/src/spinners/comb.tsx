import type { InternalRenderProps } from "../types";

export function renderComb({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 100;
  const countBars = spinnerSize / 9;

  return (
    <div
      style={{
        position: "relative",
        width: `${spinnerSize}px`,
        height: `${spinnerSize / 5}px`,
      }}
    >
      {Array.from({ length: Math.ceil(countBars) }, (_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: `${spinnerSize / 60}px`,
            height: `${spinnerSize / 5}px`,
            left: `${index * 9}px`,
            transformOrigin: "center bottom",
            transform: "rotate(-90deg)",
            backgroundColor: "var(--spinner-color, currentColor)",
            animation: "spinner-comb 3s ease infinite",
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}