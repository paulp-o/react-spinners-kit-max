import { useMemo } from "react";

interface MeteorLinesProps {
  count?: number;
  className?: string;
}

export function MeteorLines({ count = 8, className = "" }: MeteorLinesProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 4}s`,
        duration: `${3 + Math.random() * 2.5}s`,
      })),
    [count],
  );

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className="absolute top-[-8%] h-px w-16 -rotate-45 bg-gradient-to-r from-white/35 via-white/20 to-transparent animate-meteor-line"
          style={{
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </div>
  );
}