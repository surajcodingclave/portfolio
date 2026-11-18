module.exports = {
  poweredByHeader: false,
  async rewrites() {
    return [
      { source: '/robots.txt', destination: '/api/crawlers?file=robots' },
      { source: '/sitemap.xml', destination: '/api/crawlers?file=sitemap' },
    ];
  },
  async headers() {
    return ['/admin/:path*', '/api/auth/:path*'].map((source) => ({ source, headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }] }));
  },
};
