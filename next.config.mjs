// next.config.mjs
const nextConfig = {
    async headers() {
      return [
        {
          source: '/(.*)',
          headers: [
            {
              key: 'Content-Security-Policy',
              value: "default-src 'self'; script-src 'self' 'unsafe-inline'"
            },
            {
              key: 'X-XSS-Protection',
              value: '1; mode=block'
            },
            // Add other security headers if needed
          ]
        }
      ];
    },
    // Add other Next.js configurations here
    reactStrictMode: true,
  };
  
  export default nextConfig;