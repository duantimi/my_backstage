export default [
  {
    path: '/',
    title: 'BasicLayout',
    routes: [
      {
        path: '/home',
        title: '指示板',
        exact: true,
        icon: 'dashboard',
        component: import('@/routes/dashboard'),
      },
      {
        path: '/themeTest',
        title: '主题',
        exact: true,
        icon: 'file-text',
        component: import('@/routes/themeTest'),
      },
      {
        path: '/my',
        title: '用户管理',
        icon: 'form',
        routes: [
          {
            path: '/a',
            title: '人事部门',
            icon: 'file-text',
            component: import('@/routes/personnel'),
          },
          {
            path: '/b',
            title: '财务部门',
            icon: 'file-text',
            authority: ['admin', 'user'],
            component: import('@/routes/financial'),
          },
          {
            path: '/c',
            title: '技术使用',
            hideInMenu: true,
            icon: 'file-text',
            component: import('@/routes/technologyIntroduced'),
          },
        ],
      },
      {
        path: '/ht',
        title: '拓扑学习',
        icon: 'dashboard',
        routes: [
          {
            path: '/a',
            title: '第一天',
            icon: 'file-text',
            component: import('@/routes/day_01'),
          },
          {
            path: '/b',
            title: '第二天',
            icon: 'file-text',
            component: import('@/routes/day_02'),
          },
          {
            path: '/c',
            title: '第三天',
            icon: 'file-text',
            component: import('@/routes/day_03'),
          },
          {
            path: '/d',
            title: '第四天',
            icon: 'file-text',
            component: import('@/routes/day_04'),
          },
          {
            path: '/e',
            title: '第五天',
            icon: 'file-text',
            component: import('@/routes/day_05'),
          },
          {
            path: '/f',
            title: '第六天',
            icon: 'file-text',
            component: import('@/routes/day_06'),
          },
          {
            path: '/g',
            title: '第七天',
            icon: 'file-text',
            component: import('@/routes/day_07'),
          },
          {
            path: '/h',
            title: '第八天',
            icon: 'file-text',
            component: import('@/routes/day_08'),
          },
          {
            path: '/i',
            title: '第九天',
            icon: 'file-text',
            component: import('@/routes/day_09'),
          },
          {
            path: '/j',
            title: '第十天',
            icon: 'file-text',
            component: import('@/routes/day_10'),
          },
          {
            path: '/k',
            title: '第十一天',
            icon: 'file-text',
            component: import('@/routes/day_11'),
          },
          {
            path: '/l',
            title: '第十二天',
            icon: 'file-text',
            component: import('@/routes/day_12'),
          }
        ],
      },
    ],
  },
  {
    path: '/topology',
    title: '拓扑图',
    exact: true,
    icon: 'share-alt',
    component: import('@/routes/topology'),
  },
  { path: '/', exact: true, redirect: '/ht/a' },
];
