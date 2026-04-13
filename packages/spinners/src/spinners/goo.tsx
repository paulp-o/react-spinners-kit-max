import type { InternalRenderProps } from "../types";

export function renderGoo({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 55;
  const center = spinnerSize / 4;
  const translateTargets = [-center, center];

  return (
    <div style={{ width: spinnerSize, height: spinnerSize, filter: 'url("#goo")' }}>
      <div style={{ position: "relative", width: spinnerSize, height: spinnerSize, animation: "spinner-goo-rotate 1.7s linear infinite" }}>
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={index}
            style={{
              position: "absolute",
              top: spinnerSize / 2 - spinnerSize / 6,
              left: spinnerSize / 2 - spinnerSize / 6,
              width: spinnerSize / 3,
              height: spinnerSize / 3,
              borderRadius: "50%",
              backgroundColor: "var(--spinner-color, currentColor)",
              animation: "spinner-goo 1.5s ease-in-out infinite",
              ["--spinner-translate-to" as string]: `${translateTargets[index]}px`,
            }}
          />
        ))}
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 15 -5"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}