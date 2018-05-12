import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import 'normalize.css'
import AsyncRoute from '../components/route'
import SiteNav from '../components/siteNav'
import Header from '../components/header'
// import Site from '../components/site'
// import List from '../components/list'
// import Info from '../components/Info'
import Collect from '../components/collect'

export default class Index extends React.Component {
  render () {
    return (
      <Router>
        <div>
          <SiteNav />
          <Header />
          <ul>
            <li>
              <Link to='/'>site</Link>
            </li>
            <li>
              <Link to='/site'>site</Link>
            </li>
            <li>
              <Link to='/list'>list</Link>
            </li>
            <li>
              <Link to='/info'>info</Link>
            </li>
            <li>
              <Link to='/collect'>collect</Link>
            </li>
          </ul>
          <hr />
          <AsyncRoute exact path='/' component={() => import('../components/site')} />
          <AsyncRoute path='/site' component={() => import('../components/site')} />
          <AsyncRoute path='/list' component={() => import('../components/list')} />
          <AsyncRoute path='/info' component={() => import('../components/info')} />
          <Route path='/collect' component={Collect} />
        </div>
      </Router>
    )
  }
}
