const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  // IP
  HOST: 'localhost',
  // 本地服务端口号
  PORT: 8080,
  // 项目访问前缀
  BASE_PATH: '/#',
  // 项目名称
  PROJECT_NAME: 'sparrow',
  // 输出目录
  BUILD_PATH: 'dist',
  // 资产基本路径
  ASSET_PATH: './',
};
