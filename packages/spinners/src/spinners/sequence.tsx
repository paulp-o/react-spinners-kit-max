import type { InternalRenderProps } from "../types";

export function renderSequence({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 40;
  const cubeWidth = spinnerSize / 8;
  const cubeHeight = spinnerSize / 1.75;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: spinnerSize,
        height: cubeHeight,
        perspective: spinnerSize * 3,
        overflow: "hidden",
        transform: "rotateY(20deg)",
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} style={{ position: "absolute", top: 0, left: index * (spinnerSize / 8 + spinnerSize / 11), width: "inherit", height: "inherit" }}>
          <div
            style={{
              position: "relative",
              width: cubeWidth,
              height: cubeHeight,
              transformStyle: "preserve-3d",
              animation: "spinner-sequence 1.75s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div
              style={{
                backfaceVisibility: "hidden",
                display: "block",
                position: "absolute",
                width: "inherit",
                height: "inherit",
                backgroundColor: "var(--spinner-color, currentColor)",
                transform: `rotateY(0deg) translateZ(${spinnerSize / 16}px)`,
              }}
            />
            <div
              style={{
                backfaceVisibility: "hidden",
                display: "block",
                position: "absolute",
                width: "inherit",
                height: "inherit",
                backgroundColor: "var(--spinner-secondary-color, currentColor)",
                transform: `rotateY(-90deg) translateZ(${spinnerSize / 16}px)`,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}