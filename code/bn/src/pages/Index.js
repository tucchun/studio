import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Loadable from 'react-loadable'
import 'normalize.css'
import SiteNav from '../components/siteNav'
import Header from '../components/header'
// import Site from '../components/site'
// import List from '../components/list'
// import Info from '../components/Info'
// import Collect from '../components/collect'

function Loading (props) {
  debugger
  if (props.error) {
    return <div>Error! <button onClick={props.retry}>Retry</button></div>
  } else if (props.pastDelay) {
    return <div>Loading...</div>
  } else {
    return null
  }
}

const asyncComponent = (component) => Loadable({
  loader: () => import('./../' + component),
  loading: Loading,
  delay: 300 // 0.3 seconds
})
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
          <Route exact path='/' component={asyncComponent('components/site')} />
          <Route path='/site' component={asyncComponent('components/site')} />
          <Route path='/list' component={asyncComponent('components/list')} />
          <Route path='/info' component={asyncComponent('components/info')} />
          <Route path='/collect' component={asyncComponent('components/collect')} />
        </div>
      </Router>
    )
  }
}
