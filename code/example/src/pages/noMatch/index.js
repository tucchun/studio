import React from 'react'
import PropTypes from 'prop-types'
import { NotfindPage } from '../../components/404'

export default class NoMatch extends React.Component {
  constructor (props) {
    super(props)
    this.doClick = this.doClick.bind(this)
  }

  doClick () {
    this.props.history.push('')
  }

  render () {
    return (
      <React.Fragment>
        <NotfindPage onClick={this.doClick} />
      </React.Fragment>
    )
  }
}

NoMatch.propTypes = {
  history: PropTypes.any
}
