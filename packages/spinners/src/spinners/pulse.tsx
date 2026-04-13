import type { InternalRenderProps } from "../types";

export function renderPulse({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 40;
  const cubeWidth = spinnerSize / 5;
  const cubeHeight = spinnerSize / 2.5;
  const wrapperHeight = spinnerSize / 2.5;

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: spinnerSize, height: wrapperHeight }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: index * (spinnerSize / 3 + spinnerSize / 15),
            width: cubeWidth,
            height: cubeHeight,
            backgroundColor: "var(--spinner-color, currentColor)",
            animation: "spinner-pulse 1.5s cubic-bezier(0.895, 0.03, 0.685, 0.22) infinite",
            animationDelay: `${index * 0.15}s`,
          }}
        />
      ))}
    </div>
  );
}