interface GridBackgroundProps {
  size?: number;
  className?: string;
}

export function GridBackground({ size = 40, className = "" }: GridBackgroundProps) {
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 overflow-hidden style-contain ${className}`.trim()}>
      <div
        className="absolute inset-x-[-15%] top-[-6%] h-[78vh]"
        style={{
          backgroundImage: [
            `repeating-linear-gradient(to right, rgba(24,24,27,0.38) 0, rgba(24,24,27,0.38) 1px, transparent 1px, transparent ${size}px)`,
            `repeating-linear-gradient(to bottom, rgba(24,24,27,0.3) 0, rgba(24,24,27,0.3) 1px, transparent 1px, transparent ${size}px)`,
          ].join(", "),
          transform: "perspective(900px) rotateX(74deg) scale(1.3)",
          transformOrigin: "center top",
          maskImage: "radial-gradient(circle at 50% 48%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 33%, rgba(0,0,0,0.2) 64%, transparent 92%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 48%, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.75) 33%, rgba(0,0,0,0.2) 64%, transparent 92%)",
          willChange: "transform",
          contain: "strict",
        }}
      />
    </div>
  );
}