import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const variants = [
  "ball",
  "grid",
  "swap",
  "bars",
  "wave",
  "push",
  "firework",
  "stage",
  "heart",
  "guard",
  "circle",
  "spiral",
  "pulse",
  "sequence",
  "domino",
  "impulse",
  "cube",
  "fill",
  "sphere",
  "flag",
  "clap",
  "rotate",
  "swish",
  "goo",
  "comb",
  "pong",
  "rainbow",
  "ring",
  "hoop",
  "flapper",
  "magic",
  "jellyfish",
  "trace",
  "classic",
  "whisper",
  "metro",
] as const;

describe("styles.css", () => {
  it("contains @keyframes for all 36 spinner variants", () => {
    const stylesPath = resolve(__dirname, "../src/styles.css");
    const styles = readFileSync(stylesPath, "utf-8");

    for (const variant of variants) {
      expect(styles).toContain(`@keyframes spinner-${variant}`);
    }
  });

  it("contains prefers-reduced-motion block", () => {
    const stylesPath = resolve(__dirname, "../src/styles.css");
    const styles = readFileSync(stylesPath, "utf-8");

    expect(styles).toContain("@media (prefers-reduced-motion: reduce)");
  });
});