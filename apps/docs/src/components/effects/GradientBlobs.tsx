interface GradientBlobsProps {
  className?: string;
}

export function GradientBlobs({ className = "" }: GradientBlobsProps) {
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}>
      <div
        className="animate-mesh-drift-a absolute -left-[28%] -top-[30%] h-[85vmax] w-[85vmax] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(46,16,101,0.48) 0%, rgba(46,16,101,0.26) 34%, transparent 72%)",
        }}
      />
      <div
        className="animate-mesh-drift-b absolute -bottom-[34%] -right-[22%] h-[82vmax] w-[82vmax] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(8,51,68,0.45) 0%, rgba(8,51,68,0.24) 38%, transparent 74%)",
        }}
      />
      <div
        className="animate-mesh-drift-c absolute left-1/2 top-1/2 h-[60vmax] w-[60vmax] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(2,44,34,0.34) 0%, rgba(2,44,34,0.16) 40%, transparent 78%)",
        }}
      />
    </div>
  );
}