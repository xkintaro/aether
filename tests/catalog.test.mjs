import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
const read = path => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const catalog = JSON.parse(read("demo/lib/component-catalog.json"));
const snapshot = JSON.parse(read("demo/lib/docs-component-snapshot.json"));

test("catalog exactly matches the independently extracted official documentation index", () => {
  const slugs = catalog.components.map(item => item.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.deepEqual([...slugs].sort(), snapshot.slugs);
  assert.equal(slugs.length, 66);
  assert.equal(catalog.source, "https://ui.shadcn.com/docs/components");
});

test("every documented component has a real locally imported example", () => {
  const loaders = read("demo/examples/registry.ts");
  const composed = {
    "data-table": ["@tanstack/react-table", "@/components/ui/table"],
    "date-picker": ["@/components/ui/calendar", "@/components/ui/popover"],
    direction: ["@/components/ui/direction"],
    typography: ["<h1", "<h2", "<h3", "<h4", "<blockquote", "<table", "<ul", "<code"],
  };
  for (const {slug, docs} of catalog.components) {
    assert.ok(loaders.includes(`"${slug}": () => import("./${slug}-example")`), slug);
    const source = read(`demo/examples/${slug}-example.tsx`);
    assert.match(source, /export default /, slug);
    for (const expected of composed[slug] ?? [`@/components/ui/${slug}`]) {
      assert.ok(source.includes(expected), `${slug}: missing real implementation ${expected}`);
    }
    assert.equal(docs, `https://ui.shadcn.com/docs/components/base/${slug}`);
  }
});

test("demo keeps the live package import and does not duplicate theme definitions", () => {
  const css = read("demo/app/globals.css");
  assert.ok(css.includes('@import "@xkintaro/aether-theme"'));
  assert.ok(!css.includes("--background:"));
  const pkg = JSON.parse(read("demo/package.json"));
  assert.equal(pkg.dependencies["@xkintaro/aether-theme"], "file:..");
});
