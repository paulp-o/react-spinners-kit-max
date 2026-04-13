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

  it("applies named size classes", () => {
    const { rerender } = render(<Spinner variant="ball" size="sm" />);
    expect(screen.getByRole("status")).toHaveClass("w-4", "h-4");

    rerender(<Spinner variant="ball" size="md" />);
    expect(screen.getByRole("status")).toHaveClass("w-8", "h-8");

    rerender(<Spinner variant="ball" size="lg" />);
    expect(screen.getByRole("status")).toHaveClass("w-12", "h-12");

    rerender(<Spinner variant="ball" size="xl" />);
    expect(screen.getByRole("status")).toHaveClass("w-16", "h-16");
  });

  it("applies custom numeric size via inline styles and css variable", () => {
    render(<Spinner variant="ball" size={48} />);
    const spinner = screen.getByRole("status");
    expect(spinner).toHaveStyle({ width: "48px", height: "48px" });
    expect(spinner.style.getPropertyValue("--spinner-size")).toBe("48px");
  });

  it("defaults size to md", () => {
    render(<Spinner variant="ball" />);
    expect(screen.getByRole("status")).toHaveClass("w-8", "h-8");
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