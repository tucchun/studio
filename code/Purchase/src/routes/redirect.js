import { Component } from 'preact'
import { route } from 'utils/route'

export default class Redirect extends Component {
  componentWillMount() {
    route(this.props.to, true)
  }

  render() {
    return null
  }
}