import React from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
// import AsyncComponent from '../components/asyncComponent'
import Loadable from "react-loadable";
import { Loading } from "../components/loading";

export function asyncComponent(importComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      const { default: component } = await importComponent();

      this.setState({
        component: component
      });
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}

const routes = [
  {
    path: "/",
    exact: true,
    component: () => import("../pages/home")
  },
  {
    path: "/login",
    component: () => import("../pages/login")
  },
  {
    path: "/pages",
    component: () => import("../pages/template/PagesTemplate"),
    routes: [
      {
        path: "/pages/orders",
        component: () => import("../pages/order/List")
      },
      {
        path: "/pages/ordersinfo/:orderId",
        component: () => import("../pages/order/Info")
      }
    ]
  }
  // {
  //   path: '/orders',
  //   component: () => import('../pages/order/List')
  // },
  // {
  //   path: '/collect',
  //   component: () => import('../pages/collect')
  // },
  // {
  //   path: '/ordersinfo/:orderId',
  //   component: () => import('../pages/order/Info')
  // },
  // {
  //   path: '/prdList',
  //   component: () => import('../pages/prdList')
  // },
  // {
  //   path: '/prdDetails',
  //   component: () => import('../pages/prdDetails')
  // },
  // {
  //   path: '/shopcart',
  //   component: () => import('../pages/shopCart')
  // },
  // {
  //   path: '/balance',
  //   component: () => import('../pages/balance')
  // },
  // {
  //   path: '/orderResult',
  //   component: () => import('../pages/orderResult')
  // },
  // {
  //   component: () => import('../pages/noMatch')
  // }
];

// const RouteWithSubRoutes = route => {
//   const Component = AsyncComponent(route.component)
//   return (
//     <Route
//       path={route.path}
//       exact={route.exact}
//       key={new Date().getTime()}
//       render={props => {
//         return (
//           // pass the sub-routes down to keep nesting
//           <Component {...route} {...props} routes={route.routes} />
//         )
//       }}
//     />
//   )
// }

// export async function Wrapper (route) {
//   let Component = await route.component()
//   return (
//     <Route
//       path={route.path}
//       exact={route.exact}
//       key={new Date().getTime()}
//       render={props => {
//         return (
//           // pass the sub-routes down to keep nesting
//           <Component {...props} routes={route.routes} />
//         )
//       }}
//     />
//   )
// }

// class RouteWithSubRoutes extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       RouteComponent: undefined
//     }
//   }
//   componentDidMount () {
//     debugger
//     this.first = true
//     this.props.component().then(RouteComponent => {
//       this.setState({ RouteComponent: withRouter(RouteComponent.default) })
//     })
//   }

//   componentDidUpdate (){
//     this.first = false
//     debugger
//   }

//   componentWillMount (){
//     debugger
//   }

//   componentWillReceiveProps (){
//     debugger
//   }

//   // shouldComponentUpdate(nextProps, nextState){
//   //   debugger
//   //   if(this.props.location.pathname === nextProps.location.pathname && !this.first) {
//   //     return false
//   //   }
//   //   return true
//   // }

//   componentWillUpdate(){
//     debugger
//   }

//   render () {
//     debugger
//     const RouteComponent = this.state.RouteComponent
//     return (
//       <div>
//         {RouteComponent ? (
//           <RouteComponent routes={this.props.routes} />
//         ) : null}
//       </div>
//     )
//   }
// }

function Wrapper(Component, routes) {
  let arr = [];
  routes.forEach((item, i) => {
    arr.push({
      C: Loadable({
        loader: item.component,
        path: item.path
      })
    });
  });
  return class Wrapper extends React.Component {
    render() {
      return <Component childComponent={arr} {...this.props} />;
    }
  };
}



const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);

function convert (routes) {
  let arr = [];
  routes.forEach((route, i) => {
    arr.push({
      ...route,
      component: Loadable({
        loader: route.component,
        loading: Loading
      })
    });
  });
  return arr;
}
debugger
function fn (routes) {
  let temp = []
  routes.forEach((route, i) => {
    let __route__ = {
      ...route,
      component: Loadable({
        loader: route.component,
        loading: Loading
      })
    }
    if (__route__.routes) {
      let __routes__ = fn(__route__.routes)
      __route__.routes = __routes__
    }
    temp.push(__route__)
  })
  return temp
}

let cn = fn(routes)
console.log(cn)

export default fn(routes);
export { RouteWithSubRoutes, Wrapper, convert }
