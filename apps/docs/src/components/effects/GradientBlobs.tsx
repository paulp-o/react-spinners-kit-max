interface GradientBlobsProps {
  className?: string;
}

const blobs = [
  { color: "#7c3aed", left: "8%", top: "-4%", size: "38rem", delay: "0s" },
  { color: "#06b6d4", left: "62%", top: "10%", size: "34rem", delay: "-5s" },
  { color: "#10b981", left: "42%", top: "58%", size: "32rem", delay: "-10s" },
];

export function GradientBlobs({ className = "" }: GradientBlobsProps) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {blobs.map((blob) => (
        <div
          key={`${blob.color}-${blob.left}-${blob.top}`}
          className="absolute rounded-full blur-3xl animate-float-blob"
          style={{
            left: blob.left,
            top: blob.top,
            width: blob.size,
            height: blob.size,
            background: blob.color,
            opacity: 0.07,
            animationDelay: blob.delay,
          }}
        />
      ))}
    </div>
  );
}