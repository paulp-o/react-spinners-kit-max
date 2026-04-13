interface GridBackgroundProps {
  size?: number;
  className?: string;
}

export function GridBackground({ size = 26, className = "" }: GridBackgroundProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 ${className}`.trim()}
      style={{
        backgroundImage: "radial-gradient(circle, rgba(39,39,42,0.28) 0.8px, transparent 0.8px)",
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
}