/** @type {import('next').NextConfig} */
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const nextConfig = {
  output: "export",
  basePath: base,
  assetPrefix: base,
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true
};
export default nextConfig;
