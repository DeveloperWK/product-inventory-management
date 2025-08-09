import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Clicked & Buy",
        short_name: "Clicked & Buy",
        description: "It's a product inventory management app",
        orientation: "portrait",
        display_override: [
          "window-controls-overlay",
          "minimal-ui",
          "fullscreen",
          "browser",
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "icons/pwa-144x144.jpg",
            sizes: "144x144",
            type: "image/jpg",
            purpose: "any",
          },
          {
            src: "icons/pwa-144x144.webp",
            sizes: "144x144",
            type: "image/webp",
            purpose: "any",
          },
          {
            src: "icons/pwa-192x192.jpg",
            sizes: "192x192",
            type: "image/jpg",
            purpose: "any",
          },
          {
            src: "icons/pwa-512x512.jpg",
            sizes: "512x512",
            type: "image/jpg",
            purpose: "any",
          },
          {
            src: "icons/pwa-512x512.jpg",
            sizes: "512x512",
            type: "image/jpg",
            purpose: "any",
          },
        ],
      },
    }),
    tailwindcss(),
  ],
});
