import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Tailwind v4 CSS handling via the turbopack loader (used in dev mode) */
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
