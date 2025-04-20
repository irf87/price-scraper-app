import { StorybookConfig } from '@storybook/react-native';
import path from 'path';

const main: StorybookConfig = {
  stories: [
    './stories/**/*.stories.?(ts|tsx|js|jsx)',
    '../app/design-system/**/*.stories.?(ts|tsx|js|jsx)'
  ],
  addons: [
    // '@storybook/addon-ondevice-controls',
    // '@storybook/addon-ondevice-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web'
  ],
  // @ts-ignore - framework is a valid property in the latest Storybook
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true
  },
  typescript: {
    check: false,
    checkOptions: {
      tsconfig: './tsconfig.storybook.json'
    },
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  webpackFinal: async (config) => {
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@screens': path.resolve(__dirname, '../app/boundedContext/presentation/screens'),
        '@navigation': path.resolve(__dirname, '../app/boundedContext/presentation/navigation'),
        '@domains': path.resolve(__dirname, '../app/boundedContext/domains'),
        '@infrastructure': path.resolve(__dirname, '../app/boundedContext/infrastructure'),
        '@repositories': path.resolve(__dirname, '../app/boundedContext/infrastructure/repositories'),
        '@utils': path.resolve(__dirname, '../app/utils'),
        '@design-system': path.resolve(__dirname, '../app/design-system'),
        '@hooks': path.resolve(__dirname, '../app/boundedContext/presentation/hooks'),
        '@components': path.resolve(__dirname, '../app/boundedContext/presentation/components'),
        '@core': path.resolve(__dirname, '../app/core'),
      };
    }
    return config;
  },
};

export default main;
