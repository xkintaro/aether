import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const pkg = JSON.parse(readFileSync(new URL("../package.json", import.meta.url)));
const read = name => readFileSync(new URL(`../styles/${name}`, import.meta.url), "utf8");

test("exports resolve and package payload contains only reusable theme sources", () => {
  for (const value of Object.values(pkg.exports)) assert.ok(existsSync(new URL(`../${value}`, import.meta.url)));
  assert.deepEqual(pkg.files, ["styles", "README.md"]);
});
test("light and dark palettes expose the same semantic tokens", () => {
  const css=read("tokens.css");
  const blocks=[...css.matchAll(/(?:^|\n)(:root|\.dark)\s*\{([^}]+)\}/g)];
  assert.equal(blocks.length,2);
  const keys=b=>[...b.matchAll(/(--[\w-]+)\s*:/g)].map(m=>m[1]).sort();
  assert.deepEqual(keys(blocks[0][2]),keys(blocks[1][2]));
  for (const token of ["background","foreground","primary","primary-foreground","sidebar","chart-1","destructive"]) assert.ok(keys(blocks[0][2]).includes("--"+token));
  assert.ok(!css.includes(".cream"));
});
test("font imports resolve, include Turkish subset and do not require next/font", () => {
  const css=read("fonts.css");
  for (const [,specifier] of css.matchAll(/@import "([^";]+)"/g)) {
    const fontCSS=readFileSync(require.resolve(specifier), "utf8");
    assert.ok(fontCSS.includes("latin-ext"));
  }
  assert.ok(css.includes('"Geist Variable"'));
  assert.ok(css.includes('"JetBrains Mono Variable"'));
});
test("Tailwind adapter preserves shadcn utilities without cyclic font variables", () => {
  const css=read("tailwind.css");
  assert.ok(css.includes("@custom-variant dark"));
  assert.ok(css.includes("--color-background: var(--background)"));
  assert.ok(css.includes("--font-heading: var(--font-jetbrains-mono)"));
  assert.ok(!css.includes("--font-sans: var(--font-sans)"));
});
