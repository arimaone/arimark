import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { Arimark } from "../src/index.js";

describe("Arimark Component Contract", () => {
  it("exports a valid Vue component", () => {
    expect(Arimark).toBeDefined();
    expect(typeof Arimark).toBe("object");
  });

  it("registers standard props with expected types and defaults", () => {
    const props = Arimark.props || {};

    expect(props.modelValue).toBeDefined();
    expect(props.modelValue.type).toBe(String);
    expect(props.modelValue.default).toBe("");

    expect(props.placeholder).toBeDefined();
    expect(props.placeholder.type).toBe(String);
    expect(props.placeholder.default).toBe("Type '/' for commands");

    expect(props.readonly).toBeDefined();
    expect(props.readonly.type).toBe(Boolean);
    expect(props.readonly.default).toBe(false);

    expect(props.metadataFormat).toBeDefined();
    expect(props.metadataFormat.type).toBe(String);
    expect(props.metadataFormat.default).toBe("frontmatter");
  });

  it("declares the complete event contract", () => {
    const emits = Arimark.emits || [];
    expect(emits).toContain("update:modelValue");
    expect(emits).toContain("save");
    expect(emits).toContain("title-change");
    expect(emits).toContain("tags-change");
  });

  it("renders container structure with pure CSS classes", () => {
    const wrapper = mount(Arimark, {
      props: {
        modelValue: "# Hello World",
      },
    });

    expect(wrapper.find(".arimark-container").exists()).toBe(true);
    expect(wrapper.find(".arimark-editor-inner").exists()).toBe(true);
    wrapper.unmount();
  });
});
