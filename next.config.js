/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ['etc.itv.by', '178.124.141.170', 'tvr.itv.by', 'static.mediatech.by', 'api.start.ru', 'cdn.bigsv.ru'],
  },
  sassOptions: {
    additionalData: `
      @import "@ui/styles/_variables.scss";
      @import "@ui/styles/_functions.scss";
      @import "@ui/styles/_mixins.scss";
    `,
  },
}

module.exports = nextConfig
