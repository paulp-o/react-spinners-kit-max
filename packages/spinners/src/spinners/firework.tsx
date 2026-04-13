import type { InternalRenderProps } from "../types";

export function renderFirework({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-full"
      style={
        {
          borderStyle: "dotted",
          borderWidth: "calc(var(--spinner-size, 40px) / 10)",
          borderColor: "var(--spinner-color, currentColor)",
          animation: "spinner-firework 1.25s cubic-bezier(0.165, 0.84, 0.44, 1) infinite",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    />
  );
}