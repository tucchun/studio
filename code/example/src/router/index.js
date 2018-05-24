import React from 'react'
import { Route } from 'react-router-dom'
import AsyncComponent from '../components/asyncComponent'
const routes = [
  {
    path: '/',
    exact: true,
    component: () => import('../pages/home')
  },
  {
    path: '/login',
    component: () => import('../pages/login')
  },
  {
    path: '/orders',
    component: () => import('../pages/order/List')
  },
  {
    path: '/collect',
    component: () => import('../pages/collect')
  },
  {
    path: '/ordersinfo/:orderId',
    component: () => import('../pages/order/Info')
  },
  {
    path: '/prdList',
    component: () => import('../pages/prdList')
  },
  {
    path: '/prdDetails',
    component: () => import('../pages/prdDetails')
  },
  {
    path: '/shopcart',
    component: () => import('../pages/shopCart')
  },
  {
    path: '/balance',
    component: () => import('../pages/balance')
  },
  {
    path: '/orderResult',
    component: () => import('../pages/orderResult')
  },
  {
    component: () => import('../pages/noMatch')
  }
]

const RouteWithSubRoutes = route => {
  const Component = AsyncComponent(route.component)
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        return (
          // pass the sub-routes down to keep nesting
          <Component {...route} {...props} routes={route.routes} />
        )
      }}
    />
  )
}

export default routes
export {
  RouteWithSubRoutes
}
