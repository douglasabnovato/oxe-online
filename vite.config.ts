/* Build com Vite (substitui react-scripts 5) e testes com Vitest; publicado no GitHub Pages em /oxe-online/ */
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const REPO_BASE = "/oxe-online/";

/* Base do repositório no build e no preview; raiz no servidor de desenvolvimento e nos testes (página única, sem rotas no cliente) */
export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? REPO_BASE : "/",
  plugins: [react()],
  build: { outDir: "build" },
  test: { environment: "jsdom" },
}));
/* Fim de vite.config.ts */
