/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      { hostname: 'cdn.sanity.io' },
      { hostname: 'source.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/blog',
        destination: '/updates',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/updates/:slug*',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      ...[
        '/rss',
        '/feed',
        '/feed.xml',
        '/updates.xml',
        '/updates/rss',
        '/updates/feed',
        '/updates/rss.xml',
        '/updates/feed.xml',
      ].map((source) => ({
        source,
        destination: '/rss.xml',
      })),
    ];
  },
};

module.exports = nextConfig;
