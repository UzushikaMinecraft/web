import {
  expressDevServer,
  expressPreset,
} from "remix-express-vite-plugin/vite";
import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [expressDevServer(),

    remix({
      presets: [expressPreset()],
    }),
    
    tsconfigPaths()
  ],
  optimizeDeps: { exclude: ['@mapbox/node-pre-gyp'] },
});