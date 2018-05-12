import React from 'react'
import { Route } from 'react-router-dom'
import AsyncComponent from '../asyncComponent'

export default class RouteIndex extends Route {
  render (props) {
    return (
      <Route {...this.props} component={AsyncComponent(this.props.component)} />
    )
  }
}
