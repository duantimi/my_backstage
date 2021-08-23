const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const themes = require('../src/themes/defaults');
const { pc, isProd, basePath, projectName } = require('./utils');
module.exports = {
  entry: {
    index: './src',
  },
  resolve: {
    alias: {
      '@': pc('src'),
      $store: pc('src/store'),
      $asset: pc('src/assets'),
      $config: pc('config'),
      $utils: pc('src/utils'),
      $layouts: pc('src/layouts'),
      $controllers: pc('src/controllers'),
      $component: pc('src/components'),
      $constant: pc('src/globalConstants'),
    },
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          fix: true,
          cache: true,
        },
      },
      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: isProd ? '[path][name]__[local]--[hash:base64:5]' : '[path][name]__[local]',
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
        ],
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: isProd ? '[path][name]__[local]--[hash:base64:5]' : '[path][name]__[local]',
              },
            },
          },
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: themes,
            },
          },
        ],
      },
      {
        test: /\.less$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: themes,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8192, // <= 8kb的图片base64内联
          name: '[name].[hash:8].[ext]',
          outputPath: 'images/',
        },
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192, // <= 8kb的base64内联
          name: '[name].[hash:8].[ext]',
          outputPath: 'fonts/',
        },
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BASEPATH: basePath,
    }),
    new MiniCssExtractPlugin({
      filename: isProd ? '[name].[contenthash:12].css' : '[name].css',
      chunkFilename: isProd ? 'css/[name]@[contenthash:12].css' : 'css/[name]@[id].css',
    }),
    new webpack.ContextReplacementPlugin(/moment[\\/]locale$/, /^\.\/(zh-cn)$/),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'config/env.config.js', to: 'config' },
        { from: 'src/themes', to: 'themes' },
        { from: 'public', to: 'public' },
      ],
    }),
    new HtmlWebpackPlugin({
      title: projectName,
      favicon: './src/assets/favicon.ico',
      template: './webpack/template/index.html',
      filename: 'index.html',
      vendors: '',
      chunksSortMode: 'manual',
      chunks: ['vendors', 'index'],
    }),
    new HtmlWebpackTagsPlugin({
      tags: [
        'config/env.config.js',
        'public/htconfig.js',
        'public/libs/core/ht.js',
        'public/libs/plugin/ht-quickfinder.js',
        'public/libs/plugin/ht-obj.js',
      ],
      append: false,
      hash: true,
    }),
  ],
};
