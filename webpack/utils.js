const path = require('path');
const B = require('../config/base');

exports.host = B.HOST;

exports.port = B.PORT;

exports.basePath = B.BASE_PATH === '/' ? true : false;

exports.projectName = B.PROJECT_NAME;

exports.buildPath = B.BUILD_PATH;

exports.publicPath = B.ASSET_PATH;

exports.env = process.env.NODE_ENV;

exports.isProd = process.env.NODE_ENV === 'production';

// __dirname 是文件所在目录 ./webpack
exports.pd = (v) => path.resolve(__dirname, v);
// process.cwd 是命令执行目录 ./
exports.pc = (v) => path.resolve(process.cwd(), v);
