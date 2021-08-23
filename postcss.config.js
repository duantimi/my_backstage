let plugins = {
  autoprefixer: {},
  'postcss-preset-env': {},
  'postcss-import': {},
};

if (process.env.NODE_ENV == 'production') {
  plugins['cssnano'] = {};
}

module.exports = {
  plugins,
};
