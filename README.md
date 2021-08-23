# sparrow
麻雀

</br>
## 环境要求
- node 10+

</br>
## 使用说明
```
1、npm install // 下载依赖包
2、npm run dll // 处理公共依赖，可按需修改第三方依赖
3、npm run dev // 开发环境使用
4、npm run start // dll && dev
5、npm run build // 打包文件到dist目录并开启分析页面
6、npm run build-noAnalyze // 打包文件到dist目录
```

</br>
## 描述
模拟数据推荐YApi

</br>
## 目录结构
```shell
├── .vscode                                    // ide(vscode)配置项
├── config                                     // 配置文件
│   ├── base                                   // 工程配置文件
│   ├── env.config                             // 生产及开发配置文件
│   ├── router.config                          // 路由&菜单
├── src                                        // 源代码
│   ├── assets                                 // 全局静态资源
│   ├── components                             // 业务通用组件
│   ├── layouts                                // 通用布局
│   ├── models                                 // 公共Dva models
│   ├── routes                                 // 页面
│   │   ....
│   │   └── home                               // 首页
│   │       ├── assets                         // 页面静态资源
│   │           └── style.less                 // less modules
│   │       ├── component                      // 页面组件
│   │       └── models                         // Dva models
│   ├── services                               // 请求服务
│   │   └── api                                // 请求服务api
│   ├── themes                                 // 主题
│   ├── utils                                  // 工具
│   ├── index.js                               // 入口文件
│   ├── router.js                              // 路由绑定
│   └── AuthorizedRoute.js                     // 权限路由
├── webpack                                    // 工程配置
│   ├── template                               // html模版
│   ├── utils                                  // webpack提取
│   ├── webpack.build                          // 打包脚本
│   └── webpack.webpack.common                 // webpack公共配置项
│   ├── webpack.dev                            // 运行脚本
│   ├── webpack.dll                            // 动态链接库
├── eslintrc.js                                // eslint 配置项
├── .gitignore                                 // git 忽略项
└── package.json                               // 依赖库
```

</br>
## 路由配置
[
    { //BasicLayout内路由
        path: '/',
        title: 'BasicLayout', //不可更改
        routes: [
            {
                path: '/home', //路径
                title: '指示板', //名称
                exact: true, //是否严格匹配
                icon: 'dashboard',//icon支持两种，ant、http
                component: import('@/routes/dashboard') //组建
            }, {
                path: '/my',
                title: '用户管理',
                icon: 'form',
                routes: [ //一但使用routes，component则无效
                    {
                        path: '/a',
                        title: '人事部门',
                        icon: 'icon-facebook',
                        component: import('@/routes/personnel')
                    },
                    {
                        path: '/b',
                        title: '财务部门',
                        icon: 'icon-facebook',
                        authority: ['admin', 'user'], //权限，只有authority内的用户可看
                        component: import('@/routes/financial')
                    },
                    {
                        path: '/c',
                        title: '技术使用',
                        hideInMenu: true, //是否隐藏菜单栏
                        icon: 'icon-facebook',
                        component: import('@/routes/technologyIntroduced')
                    }
                ],
            }
        ],
    },
    {
        path: '/topology',
        title: '拓扑图',
        exact: true,
        icon: 'share-alt',
        component: import('@/routes/topology')
    },
    { path: '/', exact: true, redirect: '/home' }
];

|    key     |     类型      |     默认值     |                          描述                          |
| :--------: | :-----------: | :------------: | :----------------------------------------------------: |
|   title    | Type: string  |                |                     配置路由的标题                     |
|    path    | Type: string  |                |                       路径通配符                       |
| component  | Type: string  |                | 配置 location 和 path 匹配后用于渲染的 React 组件路径  |
|   exact    | Type: boolean | Default: false |  表示是否严格匹配，即 location 是否和 path 完全对应上  |
|   routes   |  Type: Array  |                | 配置子路由，通常在需要为多个路径增加 layout 组件时使用 |
|  redirect  | Type: string  |                |                      配置路由跳转                      |
| hideInMenu | Type: string  |                |                     是否隐藏菜单栏                     |

## 注： 在 VS Code 商店中寻找并安装插件 ESlint，Prettier

编辑 settings.json(位置在 Code===》首选项===》设置 里面搜索 setttings.json)，添加如下代码：

```
"[javascript]": {
    "editor.tabSize": 2
  },
// 如果保存的时候使用eslint --fix自动修复当前文件的话, 将其设置为true
"editor.codeActionsOnSave": { "source.fixAll.eslint": true },
// 如果保存的时候使用prettier自动修复的话, 将其设置为true
"editor.formatOnSave": true,
```

## 注： git commit 提交规范[参考链接](https://github.com/conventional-changelog/commitlint)

如（具体可以参考 commitlint.config.js 文件里的注释内容）下：

```
git commit -m 'Feature: #TSB-7418 添加新功能'
git commit -m 'Fixed: #TCR-474 bug修复'
git commit -m 'Style: #JKB-7788 修改样式'
```


package.json
{
  "name": "sparrow",
  "version": "0.0.1",
  "license": "ISC",
  "author": "author",
  "description": "麻雀",
  "main": "src/index",
  "scripts": {
    "eslint": "eslint src --ext .js --fix",
    "dll": "webpack --config webpack/webpack.dll.js",
    "dev": "NODE_ENV=development webpack serve --config webpack/webpack.dev.js",
    "start": "NODE_ENV=development webpack --mode=development --config webpack/webpack.dll.js && npm run dev",
    "build-noAnalyze": "NODE_ENV=production webpack --config webpack/webpack.build.js",
    "build": "NODE_ENV=production webpack --config webpack/webpack.analyze.js",
    "zip": "node ./bin/zip"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
    }
  },
  "lint-staged": {
    "**/*.{js,jsx}": [
      "eslint --fix",
      "prettier --write"
    ]
  },
  "pre-push": [
    "eslint"
  ],
  "keywords": [
    "cloudwise",
    "react"
  ],
  "repository": {
    "type": "git",
    "url": "https://git.cloudwise.com/BWTP/sparrow"
  },
  "dependencies": {
    "@babel/runtime": "^7.10.2",
    "antd": "^3.6.6",
    "axios": "^0.19.2",
    "babel-plugin-import": "^1.13.0",
    "core-js": "^3.6.5",
    "dva": "^2.6.0-beta.19",
    "dva-loading": "^3.0.20",
    "history": "^4.10.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "react-loadable": "^5.5.0",
    "regenerator-runtime": "^0.13.5"
  },
  "devDependencies": {
    "@babel/core": "^7.10.0",
    "@babel/plugin-proposal-class-properties": "^7.10.1",
    "@babel/plugin-proposal-decorators": "^7.10.1",
    "@babel/plugin-proposal-object-rest-spread": "^7.10.1",
    "@babel/plugin-syntax-dynamic-import": "^7.8.3",
    "@babel/plugin-transform-runtime": "^7.10.1",
    "@babel/preset-env": "^7.10.2",
    "@babel/preset-react": "^7.10.1",
    "@commitlint/cli": "^11.0.0",
    "@commitlint/config-conventional": "^11.0.0",
    "autodll-webpack-plugin": "^0.4.2",
    "babel-eslint": "^8.2.6",
    "babel-loader": "^8.1.0",
    "clean-webpack-plugin": "^3.0.0",
    "copy-webpack-plugin": "^6.0.0",
    "css-loader": "^3.5.3",
    "dll-link-webpack-plugin": "^3.2.1",
    "eslint": "^4.19.1",
    "eslint-config-alloy": "^3.7.2",
    "eslint-config-prettier": "^7.1.0",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.20.2",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-prettier": "^3.3.1",
    "eslint-plugin-react": "^7.20.0",
    "eslint-plugin-react-hooks": "^4.0.8",
    "file-loader": "^6.0.0",
    "html-webpack-plugin": "^5.1.0",
    "html-webpack-tags-plugin": "^2.0.17",
    "husky": "^4.3.6",
    "less": "^2.7.3",
    "less-loader": "^4.1.0",
    "lint-staged": "^10.5.3",
    "mini-css-extract-plugin": "^1.3.9",
    "moment": "^2.26.0",
    "node-zip": "^1.1.1",
    "postcss-loader": "^3.0.0",
    "pre-push": "^0.1.1",
    "prettier": "^2.2.1",
    "query-string": "^6.12.1",
    "react-amap": "^1.2.8",
    "style-loader": "^1.2.1",
    "url-loader": "^4.1.0",
    "webpack": "^5.11.0",
    "webpack-bundle-analyzer": "^3.7.0",
    "webpack-cli": "^4.2.0",
    "webpack-dev-server": "^3.11.0",
    "webpack-merge": "^4.2.2"
  }
}
