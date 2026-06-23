/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        // Supabase Storage (poze încărcate din /admin)
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
  // three.js / r3f play nicer when transpiled by Next
  transpilePackages: ["three"],
};

export default nextConfig;
