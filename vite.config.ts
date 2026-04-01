import { defineConfig } from "vite";
import path from "path";

const rawPort = process.env.PORT;
if (!rawPort) throw new Error("PORT environment variable is required");
const port = Number(rawPort);
if (Number.isNaN(port) || port <= 0) throw new Error(`Invalid PORT value: "${rawPort}"`);

export default defineConfig({
  base: "/",
  root: path.resolve(import.meta.dirname),
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(import.meta.dirname, "index.html"),
        about: path.resolve(import.meta.dirname, "about.html"),
        services: path.resolve(import.meta.dirname, "services.html"),
        training: path.resolve(import.meta.dirname, "training.html"),
        shop: path.resolve(import.meta.dirname, "shop.html"),
        blog: path.resolve(import.meta.dirname, "blog.html"),
        opportunities: path.resolve(import.meta.dirname, "opportunities.html"),
        sustainability: path.resolve(import.meta.dirname, "sustainability.html"),
        contact: path.resolve(import.meta.dirname, "contact.html"),
      },
    },
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
  preview: {
    port,
    host: "0.0.0.0",
    allowedHosts: true,
  },
});
