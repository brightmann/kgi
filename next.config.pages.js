const {
  withHydrationOverlay,
} = require("@builder.io/react-hydration-overlay/next");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/kgi",
  trailingSlash: true,
  // The Pages build moves server-only routes aside; skip type-check so the
  // type-only imports of those routes in src/api-clients do not fail the build.
  typescript: { ignoreBuildErrors: true },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "4000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c1.staticflickr.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

const bundledConfig = withBundleAnalyzer(nextConfig);
let exportedConfig = bundledConfig;
if (process.env.NODE_ENV !== "production") {
  exportedConfig = withHydrationOverlay({
    appRootSelector: "body",
  })(bundledConfig);
}
module.exports = exportedConfig;
