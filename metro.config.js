/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    resolveRequest: (context, moduleName, platform) => {
      if (moduleName.startsWith('graphql-request')) {
        return {
          filePath: `${__dirname}/node_modules/graphql-request/build/esm/index.js`,
          type: 'sourceFile',
        }
      }

      return context.resolveRequest(context, moduleName, platform)
    }
  }
};
