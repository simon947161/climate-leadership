import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Inject git commit hash at build time for version tracking */
  env: {
    NEXT_PUBLIC_BUILD_COMMIT: (() => {
      try {
        const { execSync } = require('child_process');
        return execSync('git rev-parse --short HEAD').toString().trim();
      } catch {
        return 'unknown';
      }
    })(),
    NEXT_PUBLIC_BUILD_TIME: new Date().toISOString(),
  },
};

export default nextConfig;
