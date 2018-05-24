import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import SiteNav from '../../components/siteNav'
import ClassifyNav from '../../components/classifyNav/ClassifyNav'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { RouteWithSubRoutes , asyncComponent} from '../../router'
import { Route, Switch } from 'react-router-dom'
import AsyncRoute from '../../components/route'
import List from '../../pages/order/List'
import Loadable from 'react-loadable'
export class WrapperTempate extends React.Component {
  constructor (props) {
    super(props)
    console.log(props)
    this.state = {
      com: undefined
    }
  }

  static propTypes = {
    routes: PropTypes.any,
    headerNums: PropTypes.object
  }

  componentWillMount (nextProps) {
    this.routes = (this.props.routes || []).map((route, i) => <RouteWithSubRoutes
      key={new Date().getTime()}
      {...route}
    />)
  }

  componentDidMount () {
    let com = Loadable({
      loader: () => import('../../pages/order/List'),
      loading: () => (<div>11</div>)
    })
    Loadable.preloadAll().then(() => {
      this.setState({
        com
      })
    })
  }

  render () {
    return (
      <React.Fragment>
        <SiteNav />
        <Header HeaderNums={this.props.headerNums} />
        <ClassifyNav />
        {/* {this.state.com ? (<Route path='/pages/orders' component={this.state.com} />) : null} */}
        {/* <Route path='/pages/orders' component={List} /> */}
        <Switch>
          {/* <Route path='/pages/orders' component={asyncComponent(() => import('../../pages/order/List'))} />
          <Route path='/pages/ordersinfo' component={asyncComponent(() => import('../../pages/order/Info'))} /> */}
          {(this.props.routes || []).map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </Switch>
        <Footer />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    header: state.collects
  }
}
export default connect(
  mapStateToProps
)(WrapperTempate)

// export default withRouter(WrapperTempate)
