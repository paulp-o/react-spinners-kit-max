interface GradientBlobsProps {
  className?: string;
}

export function GradientBlobs({ className = "" }: GradientBlobsProps) {
  return (
    <div aria-hidden className={`pointer-events-none fixed inset-0 overflow-hidden ${className}`}>
      <div
        className="animate-mesh-drift-a absolute -left-[24%] -top-[26%] h-[78vmax] w-[78vmax] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(46,16,101,0.36) 0%, rgba(46,16,101,0.16) 38%, transparent 74%)",
        }}
      />
      <div
        className="animate-mesh-drift-b absolute -bottom-[30%] -right-[18%] h-[74vmax] w-[74vmax] rounded-full blur-3xl"
        style={{
          background: "radial-gradient(circle, rgba(8,51,68,0.34) 0%, rgba(8,51,68,0.14) 42%, transparent 76%)",
        }}
      />
    </div>
  );
}