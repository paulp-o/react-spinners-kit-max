import type { ReactNode } from "react";

interface TextGradientProps {
  children: ReactNode;
  className?: string;
}

export function TextGradient({ children, className = "" }: TextGradientProps) {
  return <span className={`text-gradient-animate ${className}`}>{children}</span>;
}