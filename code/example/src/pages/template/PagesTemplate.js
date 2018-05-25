import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import SiteNav from "../../components/siteNav";
import ClassifyNav from "../../components/classifyNav/ClassifyNav";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { RouteWithSubRoutes, asyncComponent } from "../../router";
import { Route, Switch } from "react-router-dom";
import AsyncRoute from "../../components/route";
import List from "../../pages/order/List";
import Loadable from "react-loadable";
import { Loading } from "../../components/loading";
export class WrapperTempate extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      com: undefined
    };
  }

  static propTypes = {
    routes: PropTypes.any,
    header: PropTypes.object
  };

  componentWillMount(nextProps) {
    this.routes = [];
    this.props.routes.forEach((route, i) => {
      this.routes.push({
        component: Loadable({
          loader: route.component,
          loading: Loading
        }),
        path: route.path,
        routes: route.routes
      });
    });
  }

  componentDidMount() {}

  render() {
    debugger;
    return (
      <React.Fragment>
        <SiteNav />
        <Header HeaderNums={this.props.header.headerNums} />
        <ClassifyNav />
        {/* {this.state.com ? (<Route path='/pages/orders' component={this.state.com} />) : null} */}
        {/* <Route path='/pages/orders' component={List} /> */}
        <Switch>
          {/* <Route path='/pages/orders' component={asyncComponent(() => import('../../pages/order/List'))} />
          <Route path='/pages/ordersinfo' component={asyncComponent(() => import('../../pages/order/Info'))} /> */}
          {(this.props.routes || []).map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
          {/* {this.props.routes.map((route, i) => {
            return (
              <Route
                path={route.path}
                key={i}
                render={props => {
                  console.log(props)
                  return <route.component {...props} routes={route.routes} />;
                }}
              />
            );
          })} */}
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    header: state.collects
  };
};
export default connect(mapStateToProps)(WrapperTempate);

// export default withRouter(WrapperTempate)
