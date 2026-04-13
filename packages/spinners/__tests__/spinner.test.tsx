import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Spinner } from "../src/spinner";
import type { SpinnerProps, SpinnerVariant } from "../src/types";

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
] as const satisfies SpinnerVariant[];

describe("Spinner", () => {
  it.each(variants)("renders %s variant without crashing", (variant) => {
    render(<Spinner variant={variant} />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("maps named sizes to pixel values for styled spinners", () => {
    const { rerender } = render(<Spinner variant="ball" size="sm" />);
    let spinner = screen.getByRole("status");
    expect(spinner.innerHTML).toContain('size="20"');

    rerender(<Spinner variant="ball" size="md" />);
    spinner = screen.getByRole("status");
    expect(spinner.innerHTML).toContain('size="40"');

    rerender(<Spinner variant="ball" size="lg" />);
    spinner = screen.getByRole("status");
    expect(spinner.innerHTML).toContain('size="60"');

    rerender(<Spinner variant="ball" size="xl" />);
    spinner = screen.getByRole("status");
    expect(spinner.innerHTML).toContain('size="80"');
  });

  it("applies custom numeric size to styled spinner renderers", () => {
    render(<Spinner variant="ball" size={48} />);
    const spinner = screen.getByRole("status");
    expect(spinner.innerHTML).toContain('size="48"');
    expect(spinner.style.width).toBe("");
    expect(spinner.style.height).toBe("");
  });

  it("defaults size to md pixel value", () => {
    render(<Spinner variant="ball" />);
    expect(screen.getByRole("status").innerHTML).toContain('size="40"');
  });

  it("has role=status and default aria-label", () => {
    render(<Spinner variant="ball" />);
    expect(screen.getByRole("status", { name: "Loading" })).toBeInTheDocument();
  });

  it("supports custom aria-label", () => {
    render(<Spinner variant="ball" aria-label="데이터 로딩 중" />);
    expect(screen.getByRole("status", { name: "데이터 로딩 중" })).toBeInTheDocument();
  });

  it("forwards and merges className", () => {
    render(<Spinner variant="ball" className="mt-4" />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveClass("mt-4");
    expect(spinner).toHaveClass("inline-flex");
  });

  it("forwards style prop", () => {
    render(<Spinner variant="ball" style={{ color: "red" }} />);
    const color = screen.getByRole("status").style.color;
    expect(["red", "rgb(255, 0, 0)"]).toContain(color);
  });

  it("renders null when loading is false", () => {
    const { queryByRole } = render(<Spinner variant="ball" loading={false} />);
    expect(queryByRole("status")).toBeNull();
  });

  it("renders spinner when loading is true by default", () => {
    render(<Spinner variant="ball" />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("rejects invalid variant at type level", () => {
    // @ts-expect-error invalid variant must be rejected by SpinnerProps
    const invalidProps: SpinnerProps = { variant: "not-a-variant" };
    expect(invalidProps).toBeDefined();
  });
});