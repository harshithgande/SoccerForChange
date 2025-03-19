import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // ✅ Required for GitHub Pages
  base: "/SoccerForChange/", // <-- Match your repo name exactly. If custom domain, use "/"

  plugins: [react()],

  preview: {
    port: 5174,
    strictPort: true,
  },

  server: {
    port: 3000,
    strictPort: true,
  },
});
