import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 3032,
    proxy: {
      "/api/v1/": {
        target: "http://147.45.141.49:8081/api/v1/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/v1/, ""),
      },
    },
  },
  plugins: [
    react(),
    svgr({
      include: "**/*.svg", // Это обрабатывает все SVG файлы как React компоненты
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
