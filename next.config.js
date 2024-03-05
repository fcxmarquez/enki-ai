/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/api/portraits/men/42.jpg",
      },
      {
        protocol: "https",
        hostname: "freelogopng.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;

module.exports = nextConfig;
