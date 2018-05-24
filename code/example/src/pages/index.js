import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import 'normalize.css'
import '../assets/style/common.css'
import routes, { RouteWithSubRoutes } from '../router'

const App = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
      </Switch>
    </Router>
  )
}

export default App
