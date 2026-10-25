/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Course/qualification data is fetched at runtime from Google Sheets,
  // so content updates never require a rebuild or redeploy.
  eslint: {
    // Lint runs via `npm run lint`; don't block production builds on warnings.
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
