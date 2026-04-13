interface BorderBeamProps {
  className?: string;
}

export function BorderBeam({ className = "" }: BorderBeamProps) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${className}`}
>
      <div className="absolute -inset-[1px] rounded-[inherit] border-beam-mask">
        <div className="absolute -left-1/2 top-0 h-full w-1/2 border-beam-shimmer" />
      </div>
    </div>
  );
}