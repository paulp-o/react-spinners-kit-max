import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

describe("build outputs", () => {
  it("contains required dist artifacts", () => {
    const pkgRoot = resolve(__dirname, "..");
    expect(existsSync(resolve(pkgRoot, "dist/index.mjs"))).toBe(true);
    expect(existsSync(resolve(pkgRoot, "dist/index.cjs"))).toBe(true);
    expect(existsSync(resolve(pkgRoot, "dist/index.d.ts"))).toBe(true);
    expect(existsSync(resolve(pkgRoot, "dist/style.css"))).toBe(true);
  });

  it("maps package exports to built files", () => {
    const pkgPath = resolve(__dirname, "../package.json");
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8")) as {
      exports?: Record<string, unknown>;
    };

    const rootExport = (pkg.exports?.["."] ?? {}) as {
      import?: string;
      require?: string;
      types?: string;
    };
    const cssExport = pkg.exports?.["./style.css"] as string | undefined;

    expect(rootExport.import).toBe("./dist/index.mjs");
    expect(rootExport.require).toBe("./dist/index.cjs");
    expect(rootExport.types).toBe("./dist/index.d.ts");
    expect(cssExport).toBe("./dist/style.css");
  });
});