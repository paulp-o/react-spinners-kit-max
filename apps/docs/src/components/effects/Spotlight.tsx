interface SpotlightProps {
  x: number;
  y: number;
  active: boolean;
  className?: string;
}

export function Spotlight({ x, y, active, className = "" }: SpotlightProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300 ${
        active ? "opacity-100" : "opacity-0"
      } ${className}`.trim()}
      style={{
        background: `radial-gradient(220px circle at ${x}px ${y}px, rgba(124,58,237,0.10), rgba(6,182,212,0.06) 35%, transparent 72%)`,
      }}
    />
  );
}