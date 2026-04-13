import type { InternalRenderProps } from "../types";

export function renderMagic({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 32;
  const countBalls = size === undefined ? 6 : Math.max(1, Math.floor(size / 12));

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: `${spinnerSize}px`,
        height: `${spinnerSize}px`,
        overflow: "hidden",
      }}
    >
      {Array.from({ length: countBalls }, (_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translateX(-50%) translateY(-50%) rotate(0deg)",
            width: `${index * (spinnerSize / countBalls)}px`,
            height: `${index * (spinnerSize / countBalls)}px`,
            borderRadius: "50%",
            backgroundColor: "transparent",
            border: "2px solid transparent",
            borderTopColor: "var(--spinner-color, currentColor)",
            animation: "spinner-magic 2s cubic-bezier(0.68, -0.75, 0.265, 1.75) infinite forwards",
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}