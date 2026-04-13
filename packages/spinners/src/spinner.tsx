import { cva } from "class-variance-authority";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "./lib/utils";
import { renderBall } from "./spinners/ball";
import { renderBars } from "./spinners/bars";
import { renderCircle } from "./spinners/circle";
import { renderClap } from "./spinners/clap";
import { renderClassic } from "./spinners/classic";
import { renderComb } from "./spinners/comb";
import { renderCube } from "./spinners/cube";
import { renderDomino } from "./spinners/domino";
import { renderFill } from "./spinners/fill";
import { renderFirework } from "./spinners/firework";
import { renderFlag } from "./spinners/flag";
import { renderFlapper } from "./spinners/flapper";
import { renderGoo } from "./spinners/goo";
import { renderGrid } from "./spinners/grid";
import { renderGuard } from "./spinners/guard";
import { renderHeart } from "./spinners/heart";
import { renderHoop } from "./spinners/hoop";
import { renderImpulse } from "./spinners/impulse";
import { renderJellyfish } from "./spinners/jellyfish";
import { renderMagic } from "./spinners/magic";
import { renderMetro } from "./spinners/metro";
import { renderPong } from "./spinners/pong";
import { renderPulse } from "./spinners/pulse";
import { renderPush } from "./spinners/push";
import { renderRainbow } from "./spinners/rainbow";
import { renderRing } from "./spinners/ring";
import { renderRotate } from "./spinners/rotate";
import { renderSequence } from "./spinners/sequence";
import { renderSphere } from "./spinners/sphere";
import { renderSpiral } from "./spinners/spiral";
import { renderStage } from "./spinners/stage";
import { renderSwap } from "./spinners/swap";
import { renderSwish } from "./spinners/swish";
import { renderTrace } from "./spinners/trace";
import { renderWave } from "./spinners/wave";
import { renderWhisper } from "./spinners/whisper";
import type { InternalRenderProps, SpinnerProps, SpinnerVariant } from "./types";

const spinnerVariants = cva("inline-flex items-center justify-center", {
  variants: {
    size: {
      sm: "w-4 h-4",
      md: "w-8 h-8",
      lg: "w-12 h-12",
      xl: "w-16 h-16",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const renderers: Record<SpinnerVariant, (props: InternalRenderProps) => ReactNode> = {
  ball: renderBall,
  grid: renderGrid,
  swap: renderSwap,
  bars: renderBars,
  wave: renderWave,
  push: renderPush,
  firework: renderFirework,
  stage: renderStage,
  heart: renderHeart,
  guard: renderGuard,
  circle: renderCircle,
  spiral: renderSpiral,
  pulse: renderPulse,
  sequence: renderSequence,
  domino: renderDomino,
  impulse: renderImpulse,
  cube: renderCube,
  fill: renderFill,
  sphere: renderSphere,
  flag: renderFlag,
  clap: renderClap,
  rotate: renderRotate,
  swish: renderSwish,
  goo: renderGoo,
  comb: renderComb,
  pong: renderPong,
  rainbow: renderRainbow,
  ring: renderRing,
  hoop: renderHoop,
  flapper: renderFlapper,
  magic: renderMagic,
  jellyfish: renderJellyfish,
  trace: renderTrace,
  classic: renderClassic,
  whisper: renderWhisper,
  metro: renderMetro,
};

export function Spinner({
  variant,
  size = "md",
  loading = true,
  className,
  style,
  "aria-label": ariaLabel = "Loading",
  ...props
}: SpinnerProps) {
  if (!loading) {
    return null;
  }

  const sizeValue = typeof size === "number" ? size : undefined;
  const sizeVariant = typeof size === "string" ? size : undefined;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={cn(spinnerVariants({ size: sizeVariant }), className)}
      style={{
        ...(sizeValue ? { width: sizeValue, height: sizeValue, "--spinner-size": `${sizeValue}px` } : {}),
        ...style,
      } as CSSProperties}
      {...props}
    >
      {renderers[variant]({ size: sizeValue })}
    </div>
  );
}