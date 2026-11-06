/* Playwright: testes no Chromium contra o build servido pelo vite preview (base /oxe-online/) */
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "e2e",
  testMatch: "*.e2e.ts",
  reporter: "list",
  use: { baseURL: "http://localhost:4319/oxe-online/", browserName: "chromium" },
  webServer: { command: "npx vite preview --port 4319 --strictPort", url: "http://localhost:4319/oxe-online/", reuseExistingServer: !process.env.CI },
});
/* Fim de playwright.config.ts */
