// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';

module.exports = withPWA({
  pwa: {
    dest: 'public',
    disable: !isProd
  },
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '~src': path.resolve(__dirname, 'src'),
      '~components': path.resolve(__dirname, 'src/components'),
      '~templates': path.resolve(__dirname, 'src/components/ui/templates'),
      '~organisms': path.resolve(__dirname, 'src/components/ui/organisms'),
      '~molecules': path.resolve(__dirname, 'src/components/ui/molecules'),
      '~atoms': path.resolve(__dirname, 'src/components/ui/atoms'),
      '~styles': path.resolve(__dirname, 'src/styles'),
      '~graphql': path.resolve(__dirname, 'src/graphql'),
      '~contexts': path.resolve(__dirname, 'src/contexts'),
      '~utils': path.resolve(__dirname, 'src/utils'),
      '~assets': path.resolve(__dirname, 'public/assets'),
      '~svg': path.resolve(__dirname, 'public/assets/svg'),
      '~img': path.resolve(__dirname, 'public/assets/img'),
    };
    return config;
  }
});
