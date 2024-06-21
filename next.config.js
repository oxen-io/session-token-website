// TODO get script-src working without unsafe-eval and unsafe-inline in prod
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline' *.sanity.io source.unsplash.com *.youtube.com *.youtube-nocookie.com *.twitter.com;
  child-src 'self' *.sanity.io source.unsplash.com *.youtube.com *.youtube-nocookie.com player.vimeo.com *.twitter.com;
  style-src 'self' 'unsafe-inline' *.googleapis.com;
  img-src 'self' blob: data: *.sanity.io source.unsplash.com *.youtube.com *.youtube-nocookie.com *.twitter.com;
  media-src 'self' *.sanity.io *.youtube.com *.youtube-nocookie.com;
  connect-src *;
  font-src 'self' blob: data: fonts.gstatic.com maxcdn.bootstrapcdn.com;
  worker-src 'self' blob:;
`;

const securityHeaders = () => {
  const headers = [
    {
      key: 'X-DNS-Prefetch-Control',
      value: 'on',
    },
    {
      key: 'Strict-Transport-Security',
      value: 'max-age=63072000; includeSubDomains; preload',
    },
    {
      key: 'X-XSS-Protection',
      value: '1; mode=block',
    },
    {
      key: 'X-Frame-Options',
      value: 'SAMEORIGIN',
    },
    {
      key: 'Permissions-Policy',
      value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    },
    {
      key: 'X-Content-Type-Options',
      value: 'nosniff',
    },
    {
      key: 'Referrer-Policy',
      value: 'strict-origin-when-cross-origin',
    },
    {
      key: 'Content-Security-Policy',
      value: ContentSecurityPolicy.replace(/\n/g, ''),
    },
  ];
  return headers;
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders(),
      },
    ];
  },
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
        source: '/updates',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/updates/:slug*',
        destination: '/blog/:slug*',
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
        '/blog.xml',
        '/blog/rss',
        '/blog/feed',
        '/blog/rss.xml',
        '/blog/feed.xml',
      ].map((source) => ({
        source,
        destination: '/rss.xml',
      })),
    ];
  },
};

module.exports = nextConfig;
