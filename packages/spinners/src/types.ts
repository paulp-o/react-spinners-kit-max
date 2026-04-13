export type SpinnerVariant =
  | "ball"
  | "grid"
  | "swap"
  | "bars"
  | "wave"
  | "push"
  | "firework"
  | "stage"
  | "heart"
  | "guard"
  | "circle"
  | "spiral"
  | "pulse"
  | "sequence"
  | "domino"
  | "impulse"
  | "cube"
  | "fill"
  | "sphere"
  | "flag"
  | "clap"
  | "rotate"
  | "swish"
  | "goo"
  | "comb"
  | "pong"
  | "rainbow"
  | "ring"
  | "hoop"
  | "flapper"
  | "magic"
  | "jellyfish"
  | "trace"
  | "classic"
  | "whisper"
  | "metro";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: SpinnerVariant;
  size?: "sm" | "md" | "lg" | "xl" | number;
  loading?: boolean;
  "aria-label"?: string;
}

export interface InternalRenderProps {
  size?: number;
}