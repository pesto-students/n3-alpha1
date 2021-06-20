// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// todo: make the sass loader work for storybook

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/*.stories.(js|jsx|ts|tsx)"
  ],
  "addons": [
    // "@storybook/preset-scss",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ],
//   "webpackFinal": async (config, { configType }) => {
//     config.module.rules.push({
//       test: /.*\.(?:c|sc)ss$/,
//       loaders: [
//         'style-loader',
//         'css-loader',
//         'sass-loader',
//       ]
//     });
//     config.plugins.push(new MiniCssExtractPlugin({
//       filename: '[name]-[contenthash].css',
//       chunkFilename: '[id]-[contenthash].css',
//     }));
//     return config;
//   },
}