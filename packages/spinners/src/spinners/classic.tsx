import type { InternalRenderProps } from "../types";

export function renderClassic({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 30;
  const countBars = 16;

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
      {Array.from({ length: countBars }, (_, index) => {
        const rotate = (360 / countBars) * index;
        const translate = -(spinnerSize / 2);

        return (
          <div
            key={index}
            style={{
              position: "absolute",
              width: `${spinnerSize / 10}px`,
              height: `${spinnerSize / 4}px`,
              backgroundColor: "var(--spinner-color, currentColor)",
              opacity: 0.05,
              transform: `rotate(${rotate}deg) translate(0, ${translate}px)`,
              animation: `spinner-classic ${countBars * 0.06}s linear infinite`,
              animationDelay: `${index * 0.06}s`,
            }}
          />
        );
      })}
    </div>
  );
}