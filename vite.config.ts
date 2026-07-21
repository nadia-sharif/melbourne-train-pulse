import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/melbourne-train-pulse/",
  plugins: [],
  server: {
    open: true,
  },
  build: {
    outDir: "dist",
  },
});