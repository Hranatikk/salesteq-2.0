module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [

    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    ["react-native-reanimated/plugin"],
    ["@babel/plugin-proposal-optional-catch-binding"],
  ],
}
