export default [
  { path: '/', name: '主页', component: './Index' },
  { path: '/get_token', name: '获取密钥',  component: './TokenGet' },
  { path: '/interface_info/:id', name: '查看接口',  component: './InterfaceInfo', hideInMenu: true },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login', component: './User/Login' }],

  },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '登录', path: '/user/login/wechat', component: './WeChatLogin' }],
  },
  {
    path: '/user',
    layout: false,
    routes: [{ name: '注册', path: '/user/register', component: './User/Register' }],

  },
    {
        path: '/user',
        layout: false,
        routes: [{ name: '注册', path: '/user/update', component: './User/Update' }],

    },
  {
    path: '/admin',
    name: '管理页',
    access: 'canAdmin',
    routes: [
      { name: '接口管理', path: '/admin/interface_info', component: './Admin/InterfaceInfo' },
      { name: '接口分析', path: '/admin/interface_analysis', component: './Admin/InterfaceAnalysis' },
    ],
  },
  { path: '/user/center', name: '个人中心',  component: './User/Center' },
  // { path: '/', redirect: '/welcome' },
  { path: '*', layout: false, component: './404' },
];
