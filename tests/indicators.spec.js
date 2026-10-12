import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

describe("Ghost Indicator CSS Selectors", () => {
  const arimarkVueContent = readFileSync(
    resolve(__dirname, "../src/Arimark.vue"),
    "utf-8"
  );

  it("targets raw blockquote elements alongside legacy class", () => {
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+blockquote::after/
    );
    expect(arimarkVueContent).toMatch(/content:\s*"QUOTE"/);
  });

  it("targets raw hr elements alongside legacy class", () => {
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+hr::after/
    );
    expect(arimarkVueContent).toMatch(/content:\s*"DIVIDER"/);
  });

  it("targets raw ol elements for ordered lists", () => {
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+ol::after/
    );
    expect(arimarkVueContent).toMatch(/content:\s*"NUMS"/);
  });

  it("targets raw ul elements for bullet lists excluding task lists", () => {
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+ul:not\(\[data-type="taskList"\]\):not\(\.task-list\)::after/
    );
    expect(arimarkVueContent).toMatch(/content:\s*"LIST"/);
  });

  it("targets task lists via data-type and class", () => {
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+ul\[data-type="taskList"\]::after/
    );
    expect(arimarkVueContent).toMatch(/content:\s*"TASK"/);
  });

  it("targets Milkdown codeblock container classes and pre", () => {
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+\.milkdown-code-block::after/
    );
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+pre::after/
    );
    expect(arimarkVueContent).toMatch(/content:\s*"CODE"/);
  });

  it("targets table wrappers and table elements", () => {
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+table::after/
    );
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+\.table-wrapper::after/
    );
    expect(arimarkVueContent).toMatch(/content:\s*"TABLE"/);
  });

  it("targets extended headings h4, h5, and h6", () => {
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+h4::after/
    );
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+h5::after/
    );
    expect(arimarkVueContent).toMatch(
      /\.arimark-crepe-host\s+\.ProseMirror\s+>\s+h6::after/
    );
  });
});
