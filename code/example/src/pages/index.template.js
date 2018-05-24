import React from 'react'
import { HashRouter as Router, Switch } from 'react-router-dom'
import 'normalize.css'
import '../assets/style/common.css'
import AsyncRoute from '../components/route'
export default class Index extends React.Component {
  render () {
    return (
      <Router>
        <Switch>
          <AsyncRoute exact path='/' component={() => import('./home')} />
          <AsyncRoute path='/login' component={() => import('./login')} />
          <AsyncRoute path='/orders' component={() => import('./order/List')} />
          <AsyncRoute path='/collect' component={() => import('./collect')} />
          <AsyncRoute path='/dialog' component={() => import('../components/dialog/Example')} />
          <AsyncRoute path='/form' component={() => import('../components/form/FormExample')} />
          <AsyncRoute path='/goods' component={() => import('../components/goodsItem/goodsItemExample')} />
          <AsyncRoute path='/ordersinfo/:orderId' component={() => import('./order/Info')} />
          <AsyncRoute path='/loading' component={() => import('../components/loading/Loading')} />
          <AsyncRoute path='/prdList' component={() => import('./prdList')} />
          <AsyncRoute path='/prdDetails' component={() => import('./prdDetails')} />
          <AsyncRoute path='/goodslist' component={() => import('../components/goodsItem/goodsItemExample')} />
          <AsyncRoute path='/address' component={() => import('../components/address/addressExample')} />
          <AsyncRoute path='/shopcart' component={() => import('../pages/shopCart/index')} />
          <AsyncRoute path='/balance' component={() => import('./balance/index')} />
          <AsyncRoute path='/orderResult' component={() => import('./orderResult/index')} />
          <AsyncRoute component={() => import('./noMatch')} />
        </Switch>
      </Router>
    )
  }
}
