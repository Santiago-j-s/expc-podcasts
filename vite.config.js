import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [{ find: "~", replacement: "/src" }],
  },
  esbuild: {
    jsxInject: `import React from 'react'`,
  },
});
