import { describe, it, expect, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import { Arimark } from "../src/index.js";

describe("Editor Lifecycle & Event Pipeline", () => {
  it("mounts editor host element properly", () => {
    const wrapper = mount(Arimark, {
      props: {
        modelValue: "Sample text",
      },
    });

    const host = wrapper.find(".arimark-crepe-host");
    expect(host.exists()).toBe(true);
    wrapper.unmount();
  });

  it("registers and removes keydown listener on window during lifecycle", async () => {
    const addSpy = vi.spyOn(window, "addEventListener");
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const wrapper = mount(Arimark, {
      props: {
        modelValue: "Test note",
      },
    });

    // Wait for onMounted async Crepe initialization to resolve
    await flushPromises();

    expect(addSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    wrapper.unmount();
    expect(removeSpy).toHaveBeenCalledWith("keydown", expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  it("forwards save, title-change, and tags-change events emitted from inner editor", async () => {
    const wrapper = mount(Arimark, {
      props: {
        modelValue: "Initial content",
      },
    });

    await flushPromises();

    const inner = wrapper.findComponent({ name: "ArimarkEditor" });
    if (inner.exists()) {
      inner.vm.$emit("title-change", "New Custom Title");
      inner.vm.$emit("tags-change", ["tag-a", "tag-b"]);
      inner.vm.$emit("save", "Saved content");

      expect(wrapper.emitted("title-change")).toBeTruthy();
      expect(wrapper.emitted("title-change")[0]).toEqual(["New Custom Title"]);

      expect(wrapper.emitted("tags-change")).toBeTruthy();
      expect(wrapper.emitted("tags-change")[0]).toEqual([["tag-a", "tag-b"]]);

      expect(wrapper.emitted("save")).toBeTruthy();
      expect(wrapper.emitted("save")[0]).toEqual(["Saved content"]);
    }

    wrapper.unmount();
  });
});
