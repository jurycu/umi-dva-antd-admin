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
  // mfsu:{},  //快速启动开启
  proxy: {
    '/v1': {
      target: 'http://127.0.0.1:8082',//后端代理地址，本地调试使用，线上环境如果合并部署不需要设置
      changeOrigin: true,
    },
  },
  routes: [

    {
      path: '/',
      component: '../layouts',
      routes: [
        {path: '/work/home', component: 'home/Index'},
        //
        {
          path: '/work/umi',
          routes: [
            {path: '/work/umi/monitor', component: 'umi/Monitor'},
          ]
        },


        {
          path: '/work/dva',
          routes: [
            {path: '/work/dva/monitor', component: 'dva/Monitor'},
          ]
        },


        {
          path: '/work/table',
          routes: [
            {path: '/work/table/basic', component: 'table/Basic'},
            {path: '/work/table/search', component: 'table/Search'},
          ]
        },
      ],
    }],
};
