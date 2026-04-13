import type { InternalRenderProps } from "../types";

export function renderDomino({ size }: InternalRenderProps): React.ReactNode {
  const spinnerSize = size ?? 100;
  const countBars = 7;
  const rotates = [0, 0, 0, 10, 40, 60, 70];
  const translates = Array.from({ length: countBars + 2 }, (_, i) => -i * (spinnerSize / 8));

  return (
    <div style={{ position: "relative", width: spinnerSize, height: spinnerSize / 5 }}>
      {Array.from({ length: countBars }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            right: 0,
            width: spinnerSize / 30,
            height: spinnerSize / 5,
            transformOrigin: "50% 100%",
            backgroundColor: "var(--spinner-color, currentColor)",
            animation: "spinner-domino 3s linear infinite",
            animationDelay: `${index * -0.42}s`,
            transform: `translateX(${spinnerSize - index * 15}px) rotate(${rotates[index]}deg)`,
            opacity: index === 0 ? 0.22 : 1,
            ["--spinner-domino-t0" as string]: `${translates[0]}px`,
            ["--spinner-domino-t1" as string]: `${translates[1]}px`,
            ["--spinner-domino-t2" as string]: `${translates[2]}px`,
            ["--spinner-domino-t3" as string]: `${translates[3]}px`,
            ["--spinner-domino-t4" as string]: `${translates[4]}px`,
            ["--spinner-domino-t5" as string]: `${translates[5]}px`,
            ["--spinner-domino-t6" as string]: `${translates[6]}px`,
            ["--spinner-domino-t7" as string]: `${translates[7]}px`,
            ["--spinner-domino-t8" as string]: `${translates[8]}px`,
          }}
        />
      ))}
    </div>
  );
}