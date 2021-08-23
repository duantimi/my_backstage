const webpack = require('webpack');
const merge = require('webpack-merge');
const C = require('./webpack.common.js');
const { host, port, basePath, pc, buildPath, publicPath } = require('./utils');

const config = {
  mode: 'development',
  output: {
    path: pc(buildPath),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  devtool: 'source-map',
  cache: true,
  target: 'web',
  devServer: {
    port: port,
    host: host,
    contentBase: `./${buildPath}`, // 告诉服务器从哪个目录中提供内容。只用在你想要提供静态文件时才需要。
    hot: true, // 启用webpack的模块热替换功能
    compress: true, // 一切服务都启用gzip压缩
    noInfo: false, // 隐藏webpack bundle信息之类的消息
    open: true, // 告诉dev-server在服务器启动后打开浏览器
    historyApiFallback: basePath,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      __DEV__: JSON.stringify(true),
      rootPath: '"/"',
    }),
    new webpack.DllReferencePlugin({
      manifest: require(pc(`${buildPath}/manifest.json`)),
      context: pc(`${buildPath}`),
    }),
  ],
};

module.exports = merge(C, config);
