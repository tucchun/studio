import React from 'react'
import routes from './config'
import AsyncComponent from '../components/asyncComponent'
import { Route } from 'react-router-dom'

const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
)

function deep (routes) {
  let temp = []
  routes.forEach((route, i) => {
    let __route__ = {
      ...route,
      component: AsyncComponent(route.component)
    }
    if (__route__.routes) {
      let __routes__ = deep(__route__.routes)
      __route__.routes = __routes__
    }
    temp.push(__route__)
  })
  return temp
}

export default deep(routes)
export {
  RouteWithSubRoutes
}
