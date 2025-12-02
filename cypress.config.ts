import { defineConfig } from "cypress";
import { vitePreprocessor } from "cypress-vite";
import path from "path";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor({
        configFile: path.resolve(__dirname, './vite.config.ts'),
      }));
    },
  },
});
