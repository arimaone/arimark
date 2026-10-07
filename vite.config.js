import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.js"),
      name: "Arimark",
      fileName: (format) => (format === "es" ? "arimark.js" : "arimark.cjs"),
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "vue",
        /^@milkdown\/.*/,
      ],
      output: {
        globals: {
          vue: "Vue",
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "style.css";
          }
          return assetInfo.name || "[name][extname]";
        },
      },
    },
    cssCodeSplit: false,
  },
  server: {
    port: 3000,
    open: false,
  },
});
