const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const C = require('./webpack.common.js');
const { pc, buildPath, publicPath } = require('./utils');

module.exports = merge(C, {
  mode: 'production',
  output: {
    path: pc(buildPath),
    publicPath: publicPath,
    filename: 'js/[name]@[contenthash:12].js',
    chunkFilename: 'js/[name]@[contenthash:12].js',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        exclude: ['config'], // 可以添加多个过滤
      }),
    ],
    removeAvailableModules: true,
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -10,
        },
        default: {
          test: /[\\/]src[\\/]/,
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      __DEV__: JSON.stringify(false),
      rootPath: '"/"',
    }),
  ],
});
