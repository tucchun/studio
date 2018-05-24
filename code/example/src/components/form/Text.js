import React from 'react'
import PropTypes from 'prop-types'

export default class Text extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      value: props.children || ' '
    }
  }

  static propTypes = {
    children: PropTypes.any,
    type: PropTypes.string
  }

  componentDidMount () {
    let value = this.props.children
    let type = this.props.type
    if (type === 'price') {
      value = (Number(value) || 0).toFixed(2)
      this.setState({
        value
      })
    } else if (type === 'time') {
      import('moment').then(moment => {
        value = moment(value).format('YYYY-MM-DD')
        this.setState({ value })
      })
    }
  }

  render () {
    return (
      <React.Fragment>
        {this.state.value}
      </React.Fragment>
    )
  }
}
