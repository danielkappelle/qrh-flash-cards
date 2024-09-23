import pkg from './package.json' with { type: 'json' };

console.log(12345, pkg.version);
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  env: {
    version: pkg.version,
  },
};

export default nextConfig;
