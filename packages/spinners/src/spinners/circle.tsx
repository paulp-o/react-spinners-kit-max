import type { InternalRenderProps } from "../types";

export function renderCircle({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="h-full w-full rounded-full"
      style={
        {
          borderStyle: "solid",
          borderWidth: "calc(var(--spinner-size, 30px) / 5)",
          borderColor: "var(--spinner-color, currentColor)",
          borderRightColor: "transparent",
          animation: "spinner-circle 0.75s linear infinite",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    />
  );
}