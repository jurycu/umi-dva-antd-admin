export default {
  define: {
    "process.env": {
      NODE_ENV: 'test'
    }, // 修改process.env对象数据
    BreadPath: `/public/`,
  },
  nodeModulesTransform: {
    type: 'none',
    exclude: [],
  },
  // mfsu: { production: { output: '.mfsu-production' } },
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM',
    'moment': 'window.moment',
  },

  // 引入被 external 库的 scripts
  // 区分 development 和 production，使用不同的产物
  scripts: process.env.NODE_ENV === 'development' ? [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.development.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.development.js',
  ] : [
    'https://gw.alipayobjects.com/os/lib/react/16.13.1/umd/react.production.min.js',
    'https://gw.alipayobjects.com/os/lib/react-dom/16.13.1/umd/react-dom.production.min.js',
    'https://cdn.staticfile.org/moment.js/2.29.1/moment.min.js',

  ],
  //配置详情查看：https://umijs.org/zh-CN/docs/deployment
  exportStatic: {},
  publicPath: "http://127.0.0.1:8082/public/",
  base: "/public",
  dva: {},
  antd: {},
  routes: [
    {
      path: '/',
      component: '../layouts',
      routes: [
        {path: 'home', component: 'home/Index'},
        //
        {
          path: '/umi',
          routes: [
            {path: '/umi/user', component: 'umi/User'},
            {path: '/umi/monitor', component: 'umi/Monitor'},
          ]
        },

        {
          path: '/table',
          routes: [
            {path: '/table/general', component: 'table/General'},
            {path: '/table/proTable', component: 'table/ProTable'},
          ]
        },

        {
          path: '/dva',
          routes: [
            {path: '/dva/', component: 'dva/list'},
          ]
        },
      ],
    }],
};
