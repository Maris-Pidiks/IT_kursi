/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d1e5wbyhbs6zy6.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.digitalocean.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
