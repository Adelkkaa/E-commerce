import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import svgr from "vite-plugin-svgr";

export default ({ mode }: { mode: string }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  const apiUrl = process.env.VITE_API_URL;

  return defineConfig({
    server: {
      host: "0.0.0.0",
      port: 3032,
      proxy: {
        "/api/v1/": {
          target: apiUrl,
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
};
