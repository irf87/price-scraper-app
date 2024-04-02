import { StorybookConfig } from '@storybook/react-native';

const main: StorybookConfig = {
  stories: ['./stories/**/*.stories.?(ts|tsx|js|jsx)'],
  addons: [
    // '@storybook/addon-ondevice-controls',
    // '@storybook/addon-ondevice-actions',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web'
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {
    autodocs: true
  },
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: prop =>
        prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
};

export default main;
