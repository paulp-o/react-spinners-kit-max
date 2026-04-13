import type { InternalRenderProps } from "../types";

export function renderImpulse({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 40;
  const ballSize = spinnerSize / 5;

  return (
    <div style={{ position: "relative", display: "flex", justifyContent: "center", alignItems: "center", width: spinnerSize, height: ballSize }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: 0,
            left: index * (ballSize + spinnerSize / 5),
            width: ballSize,
            height: ballSize,
            borderRadius: "50%",
            backgroundColor: "var(--spinner-color, currentColor)",
            animation: "spinner-impulse 1.25s linear infinite",
            animationDelay: `${index * 0.125}s`,
            ["--spinner-front-color" as string]: "var(--spinner-color, currentColor)",
            ["--spinner-back-color" as string]: "var(--spinner-secondary-color, currentColor)",
          }}
        />
      ))}
    </div>
  );
}