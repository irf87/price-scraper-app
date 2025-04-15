module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          // This needs to be mirrored in tsconfig.json
          '@screens': './app/boundedContext/presentation/screens',
          '@navigation': './app/boundedContext/presentation/navigation',
          '@domains': './app/boundedContext/domains',
          '@infrastructure': './app/boundedContext/infrastructure',
          '@repositories': './app/boundedContext/infrastructure/repositories',
          '@utils': './app/utils',
          '@design-system': './app/design-system',
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    ],
  ],
};
