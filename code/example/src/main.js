import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  ConnectedRouter,
  routerReducer,
  routerMiddleware
} from "react-router-redux";
import createHashHistory from "history/createHashHistory";
import { Provider } from "react-redux";
import reducers from "./reducers";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";
import "./assets/style/common.css";

import routes, { RouteWithSubRoutes, convert } from "./router";

const history = createHashHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

let arr = convert(routes);

ReactDOM.render(
  <Provider store={store}>
    {/* ConnectedRouter will use the store from Provider automatically */}
    <ConnectedRouter history={history}>
      <Router>
        <Switch>
          {routes.map((route, i) => {
            return (
              <Route
                exact={route.exact}
                path={route.path}
                key={i}
                render={props => {
                  console.log(props);
                  return <route.component {...props} routes={route.routes} />;
                }}
              />
            );
          })}
          {/* {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)} */}
        </Switch>
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
