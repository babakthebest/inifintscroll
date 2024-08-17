/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "chatimages.storage.iran.liara.space",
      },
    ],
  },
};

export default nextConfig;
