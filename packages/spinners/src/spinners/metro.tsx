import type { InternalRenderProps } from "../types";

export function renderMetro({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 40;
  const countBalls = 9;
  const ballSize = spinnerSize / 8;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
        animation: "spinner-metro-rotate 3s infinite ease-in",
      }}
    >
      {Array.from({ length: countBalls }, (_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            width: `${spinnerSize}px`,
            height: `${spinnerSize}px`,
            transform: `rotate(${(360 / countBalls) * (index + 1)}deg)`,
            opacity: 0,
            animation: "spinner-metro-ball 2s infinite linear",
            animationDelay: `${(index * 2) / countBalls}s`,
          }}
        >
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              width: `${ballSize}px`,
              height: `${ballSize}px`,
              borderRadius: "50%",
              backgroundColor: "var(--spinner-color, currentColor)",
              transform: "translateX(-50%)",
            }}
          />
        </div>
      ))}
    </div>
  );
}