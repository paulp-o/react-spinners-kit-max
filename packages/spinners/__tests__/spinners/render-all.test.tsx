import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderBall } from "../../src/spinners/ball";
import { renderGrid } from "../../src/spinners/grid";
import { renderSwap } from "../../src/spinners/swap";
import { renderBars } from "../../src/spinners/bars";
import { renderWave } from "../../src/spinners/wave";
import { renderPush } from "../../src/spinners/push";
import { renderFirework } from "../../src/spinners/firework";
import { renderStage } from "../../src/spinners/stage";
import { renderHeart } from "../../src/spinners/heart";
import { renderGuard } from "../../src/spinners/guard";
import { renderCircle } from "../../src/spinners/circle";
import { renderSpiral } from "../../src/spinners/spiral";
import { renderPulse } from "../../src/spinners/pulse";
import { renderSequence } from "../../src/spinners/sequence";
import { renderDomino } from "../../src/spinners/domino";
import { renderImpulse } from "../../src/spinners/impulse";
import { renderCube } from "../../src/spinners/cube";
import { renderFill } from "../../src/spinners/fill";
import { renderSphere } from "../../src/spinners/sphere";
import { renderFlag } from "../../src/spinners/flag";
import { renderClap } from "../../src/spinners/clap";
import { renderRotate } from "../../src/spinners/rotate";
import { renderSwish } from "../../src/spinners/swish";
import { renderGoo } from "../../src/spinners/goo";
import { renderComb } from "../../src/spinners/comb";
import { renderPong } from "../../src/spinners/pong";
import { renderRainbow } from "../../src/spinners/rainbow";
import { renderRing } from "../../src/spinners/ring";
import { renderHoop } from "../../src/spinners/hoop";
import { renderFlapper } from "../../src/spinners/flapper";
import { renderMagic } from "../../src/spinners/magic";
import { renderJellyfish } from "../../src/spinners/jellyfish";
import { renderTrace } from "../../src/spinners/trace";
import { renderClassic } from "../../src/spinners/classic";
import { renderWhisper } from "../../src/spinners/whisper";
import { renderMetro } from "../../src/spinners/metro";

const renderers = [
  ["ball", renderBall],
  ["grid", renderGrid],
  ["swap", renderSwap],
  ["bars", renderBars],
  ["wave", renderWave],
  ["push", renderPush],
  ["firework", renderFirework],
  ["stage", renderStage],
  ["heart", renderHeart],
  ["guard", renderGuard],
  ["circle", renderCircle],
  ["spiral", renderSpiral],
  ["pulse", renderPulse],
  ["sequence", renderSequence],
  ["domino", renderDomino],
  ["impulse", renderImpulse],
  ["cube", renderCube],
  ["fill", renderFill],
  ["sphere", renderSphere],
  ["flag", renderFlag],
  ["clap", renderClap],
  ["rotate", renderRotate],
  ["swish", renderSwish],
  ["goo", renderGoo],
  ["comb", renderComb],
  ["pong", renderPong],
  ["rainbow", renderRainbow],
  ["ring", renderRing],
  ["hoop", renderHoop],
  ["flapper", renderFlapper],
  ["magic", renderMagic],
  ["jellyfish", renderJellyfish],
  ["trace", renderTrace],
  ["classic", renderClassic],
  ["whisper", renderWhisper],
  ["metro", renderMetro],
] as const;

describe("all spinner render functions", () => {
  it.each(renderers)("%s returns styled-components jsx", (_name, rendererFn) => {
    const { container } = render(<>{rendererFn({ size: 40 } as never)}</>);
    const root = container.firstElementChild as HTMLElement | null;

    expect(root).toBeTruthy();
    const elements = [root, ...Array.from(root?.querySelectorAll("*") ?? [])] as HTMLElement[];
    const hasStyledClass = elements.some((element) => {
      const className = element.className;
      return typeof className === "string" && /(^|\s)sc-[A-Za-z0-9-]+(\s|$)/.test(className);
    });

    expect(hasStyledClass).toBe(true);
  });

  it("ball forwards numeric size to styled component tree", () => {
    const { container } = render(<>{renderBall({ size: 40 } as never)}</>);
    expect(container.innerHTML).toContain('size="40"');
  });

  it("cube renders exactly 6 face elements", () => {
    const { container } = render(<>{renderCube({ size: 40 } as never)}</>);
    const leafDivs = Array.from(container.querySelectorAll("div")).filter(
      (element) => element.children.length === 0,
    );
    expect(leafDivs.length).toBe(6);
  });

  it("guard renders cube elements", () => {
    const { container } = render(<>{renderGuard({ size: 40 } as never)}</>);
    const root = container.firstElementChild as HTMLElement | null;
    expect(root?.children.length).toBe(9);
  });

  it("jellyfish renders ring elements with styled class variations", () => {
    const { container } = render(<>{renderJellyfish({ size: 40 } as never)}</>);
    const root = container.firstElementChild as HTMLElement | null;
    expect(root?.children.length).toBe(6);

    const childClassNames = Array.from(root?.children ?? []).map(
      (child) => (child as HTMLElement).className,
    );
    expect(new Set(childClassNames).size).toBeGreaterThan(1);
  });
});