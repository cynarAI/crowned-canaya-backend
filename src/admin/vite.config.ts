import { mergeConfig } from 'vite';

export default (config) => {
  return mergeConfig(config, {
    server: {
      host: '0.0.0.0',
      hmr: {
        clientPort: 1337,
      },
      allowedHosts: 'all',
    },
  });
};
