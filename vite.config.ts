import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    proxy: {
      '/api_proxy': {
        target: 'https://78471847-c32a-47d4-a08c-bd113721d9a2.mock.pstmn.io',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api_proxy/, ''),
      }
    }
  }
});
