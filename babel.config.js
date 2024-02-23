module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            '@screens': "./app/boundedContext/presentation/screens",
            '@navigations': './app/boundedContext/presentation/navigations',
            '@hooks': './app/boundedContext/application/hooks',
            '@domain': './app/boundedContext/domain',
            '@infrastructure': './app/boundedContext/infrastructure',
            '@storage': './app/boundedContext/infrastructure/storage',
            '@repositories': './app/boundedContext/infrastructure/repositories',
            "@components": './app/boundedContext/presentation/components',
            "@application": './app/boundedContext/application'
          },
        },
      ],
    ],
  };
};
