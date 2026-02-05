/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: "/**",
        search: "?**",
      },
    ],
  },
};

export default nextConfig;
