export default {
  define: {
    "process.env": {
      NODE_ENV: 'dev'
    }, // 修改process.env对象数据
    WorkUrl: "127.0.0.1:8000", // 直接增加全局变量
    BreadPath: `/`,
  },

  dva: {},
  antd: {},
  mfsu:{},
  proxy: {
    '/v1': {
      target: 'http://127.0.0.1:8082',
      changeOrigin: true,
    },
  },
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
