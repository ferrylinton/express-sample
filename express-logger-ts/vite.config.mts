import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import virtualHtml from 'vite-plugin-virtual-html';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    virtualHtml({
      pages: {
        main: '/src/main.html',
      },
      indexPage: 'main'
    })
  ],
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "src"),
      "@types": path.resolve(__dirname, "src", "types"),
    }
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
});
