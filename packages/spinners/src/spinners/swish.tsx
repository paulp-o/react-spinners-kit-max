import type { InternalRenderProps } from "../types";

export function renderSwish({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 40;
  const count = 3;

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: spinnerSize,
        height: spinnerSize,
      }}
    >
      {Array.from({ length: count }).flatMap((_, i) =>
        Array.from({ length: count }).map((__, j) => {
          const index = i * count + j;

          return (
            <div
              key={index}
              style={{
                position: "absolute",
                top: j * (spinnerSize / 3 + spinnerSize / 15),
                left: i * (spinnerSize / 3 + spinnerSize / 15),
                width: spinnerSize / 5,
                height: spinnerSize / 5,
                borderRadius: 3,
                backgroundColor: "var(--spinner-color, currentColor)",
                animation: "spinner-swish 0.9s ease infinite",
                transition: "all 0.3s ease",
                animationDelay: `${index * 0.1}s`,
                ["--spinner-back-color" as string]: "var(--spinner-secondary-color, currentColor)",
              }}
            />
          );
        }),
      )}
    </div>
  );
}