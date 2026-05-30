/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@pageStyles": path.resolve(__dirname, "./src/styles/pages"),
      "@fonts": path.resolve(__dirname, "./src/assets/fonts"),
      "@images": path.resolve(__dirname, "./src/assets/images"),
      "@bg": path.resolve(__dirname, "./src/assets/images/bg"),
      "@etc": path.resolve(__dirname, "./src/assets/images/etc"),
      "@thumbnails": path.resolve(__dirname, "./src/assets/images/thumbnails"),
      "@buttons": path.resolve(__dirname, "./src/assets/images/ui/buttons"),
      "@frames": path.resolve(__dirname, "./src/assets/images/ui/frames"),
      "@logos": path.resolve(__dirname, "./src/assets/images/ui/logos"),
      "@sounds": path.resolve(__dirname, "./src/assets/sounds"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@data": path.resolve(__dirname, "./src/data/"),
    },
  },
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            configDir: path.join(__dirname, ".storybook"),
          }),
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: "chromium",
              },
            ],
          },
          setupFiles: [".storybook/vitest.setup.js"],
        },
      },
    ],
  },
});
