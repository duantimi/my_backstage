const webpack = require('webpack');
const qs = require('query-string');
const { pc, buildPath } = require('./utils');

const vendors = ['react', 'react-dom', 'react-router', 'axios', 'moment', 'query-string', 'dva', 'react-loadable'];

const mode = (qs.parse(process.argv[2]) || {})['--mode'];
const isProd = mode === 'production';

module.exports = {
  entry: {
    vendors,
  },
  output: {
    publicPath: '',
    path: pc(buildPath),
    filename: isProd ? '[name]@[chunkhash:12].js' : '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `"${process.env.NODE_ENV}"`,
    }),
    new webpack.DllPlugin({
      path: pc(`${buildPath}/manifest.json`),
      name: '[name]_[hash]',
    }),
  ],
};
