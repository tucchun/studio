import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHashHistory from 'history/createHashHistory'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { HashRouter as Router, Switch } from 'react-router-dom'
import logger from 'redux-logger'
import 'normalize.css'
import './assets/style/common.css'
import reducers from './store/reducers'
import routes, { RouteWithSubRoutes } from './router'

const history = createHashHistory()

// Build the middleware for intercepting and dispatching navigation actions
const historyMiddleware = routerMiddleware(history)

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(
    historyMiddleware,
    thunkMiddleware,
    logger
  )
)

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app-root')
)
