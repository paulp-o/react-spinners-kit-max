import type { InternalRenderProps } from "../types";

export function renderJellyfish({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 60;
  const countRings = 6;

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
      {Array.from({ length: countRings }, (_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: `${index * (spinnerSize / countRings)}px`,
            height: `${(index * (spinnerSize / countRings)) / 2}px`,
            border: "2px solid var(--spinner-color, currentColor)",
            borderRadius: "50%",
            backgroundColor: "transparent",
            animation: "spinner-jellyfish 2.5s ease infinite",
            animationDelay: `${index * 100}ms`,
          }}
        />
      ))}
    </div>
  );
}