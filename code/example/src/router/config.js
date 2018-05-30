const routes = [
  {
    path: '/',
    exact: true,
    component: () => import('../pages/template/IndexTemplate'),
    routes: [
      {
        component: () => import('../pages/home')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../pages/login')
  },
  {
    path: '/pages',
    component: () => import('../pages/template/PagesTemplate'),
    routes: [
      {
        path: '/pages/orders',
        component: () => import('../pages/order/List')
      },
      {
        path: '/pages/ordersinfo/:orderId',
        component: () => import('../pages/order/Info')
      },
      {
        path: '/pages/collect',
        component: () => import('../pages/collect')
      },
      // {
      //   exact: true,
      //   path: '/pages/prdList',
      //   component: () => import('../pages/prdList')
      // },
      // {
      //   path: '/pages/prdList/:firstClassId',
      //   component: () => import('../pages/prdList')
      // },
      // {
      //   path: '/pages/prdList/:firstClassId/:secondClassId',
      //   component: () => import('../pages/prdList')
      // },
      // {
      //   path: '/pages/prdList',
      //   component: () => import('../pages/prdList')
      // },
      {
        path: '/pages/prdList/:firstClassId?/:secondClassId?/:thirdClassId?',
        component: () => import('../pages/prdList')
      },

      {
        path: '/pages/prdDetails/:prdCode',
        component: () => import('../pages/prdDetails')
      },
      {
        path: '/pages/shopcart',
        component: () => import('../pages/shopCart')
      },
      {
        path: '/pages/balance',
        component: () => import('../pages/balance')
      },
      {
        path: '/pages/orderResult',
        component: () => import('../pages/orderResult')
      },
      {
        component: () => import('../pages/noMatch')
      }
    ]
  },
  {
    component: () => import('../pages/noMatch')
  }
]

export default routes
