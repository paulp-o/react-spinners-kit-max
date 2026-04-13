import type { InternalRenderProps } from "../types";

export function renderBall({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="flex items-center justify-center"
      style={
        {
          width: "100%",
          height: "50%",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    >
      <div
        className="rounded-full"
        style={
          {
            width: "calc(var(--spinner-size, 40px) / 3)",
            height: "calc(var(--spinner-size, 40px) / 3)",
            backgroundColor: "var(--spinner-color, currentColor)",
            animation: "spinner-ball 3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
          } as React.CSSProperties
        }
      />
    </div>
  );
}