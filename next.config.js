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
  async rewrites() {
    return [
      ...[
        '/rss',
        '/feed',
        '/feed.xml',
        '/blog.xml',
        '/blog/rss',
        '/blog/feed',
        '/blog/rss.xml',
        '/blog/feed.xml',
      ].map(source => ({
        source,
        destination: '/rss.xml',
      })),
    ];
  },
};

module.exports = nextConfig;
