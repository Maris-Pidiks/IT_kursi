/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.rswebsols.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "steamcdn-a.akamaihd.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "shared.akamai.steamstatic.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.steampowered.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.scdn.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.digitalocean.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "d1e5wbyhbs6zy6.cloudfront.net",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.themealdb.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    return config;
  },
};

export default nextConfig;
