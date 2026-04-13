import type { InternalRenderProps } from "../types";

type CubeFace = "front" | "back" | "bottom" | "top" | "left" | "right";

const faces: CubeFace[] = ["front", "back", "bottom", "top", "left", "right"];

function getFaceTransform(face: CubeFace, size: number): string {
  const rotateX = face === "top" ? 90 : face === "bottom" ? -90 : 0;
  const rotateY = face === "left" ? 90 : face === "right" ? -90 : face === "back" ? 180 : 0;
  return `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${size / 2}px)`;
}

export function renderCube({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 25;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: spinnerSize,
        height: spinnerSize,
        perspective: spinnerSize * 4,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, width: "inherit", height: "inherit" }}>
        <div
          style={{
            position: "relative",
            width: spinnerSize,
            height: spinnerSize,
            transformStyle: "preserve-3d",
            animation: "spinner-cube 3s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite",
          }}
        >
          {faces.map((face) => (
            <div
              key={face}
              style={{
                backfaceVisibility: "hidden",
                display: "block",
                position: "absolute",
                width: "inherit",
                height: "inherit",
                backgroundColor: face === "front" || face === "back" ? "var(--spinner-color, currentColor)" : "var(--spinner-secondary-color, currentColor)",
                transform: getFaceTransform(face, spinnerSize),
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}