import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), biomePlugin()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "/src"),
    },
  },
});
