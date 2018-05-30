import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

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

  static getDerivedStateFromProps (props, state) {
    let value = props.children
    let type = props.type
    if (type === 'price') {
      value = (Number(value) || 0).toFixed(2)
      return { value }
    } else if (type === 'time') {
      value = moment(value).format('YYYY-MM-DD')
      return { value }
    }
  }

  componentDidMount () {
    // let value = this.props.children
    // let type = this.props.type
    // if (type === 'price') {
    //   value = (Number(value) || 0).toFixed(2)
    //   this.setState({
    //     value
    //   })
    // } else if (type === 'time') {
    //   import('moment').then(moment => {
    //     value = moment(value).format('YYYY-MM-DD')
    //     this.setState({ value })
    //   })
    // }
  }

  render () {
    return (
      <React.Fragment>
        {this.state.value}
      </React.Fragment>
    )
  }
}
