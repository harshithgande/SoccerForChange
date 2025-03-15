import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // // Base path MUST match GitHub repo name unless using a custom domain
  // base: "/SoccerForChange/",

  plugins: [react()],

  preview: {
    port: 5174,
    strictPort: true,
  },

  server: {
    port: 3000,
    strictPort: true,
    host: true,
    // origin: "http://0.0.0.0:80",
  },
});
