import type { InternalRenderProps } from "../types";

export function renderHeart({ size }: InternalRenderProps): React.ReactNode {
  return (
    <div
      className="relative"
      style={
        {
          width: "100%",
          height: "90%",
          backgroundColor: "var(--spinner-color, currentColor)",
          clipPath:
            "polygon(50% 92%, 12% 56%, 6% 32%, 18% 14%, 36% 12%, 50% 24%, 64% 12%, 82% 14%, 94% 32%, 88% 56%)",
          animation: "spinner-heart 1s ease-in-out infinite",
          ...(size ? { "--spinner-size": `${size}px` } : {}),
        } as React.CSSProperties
      }
    />
  );
}