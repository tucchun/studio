import React from 'react'
import PropTypes from 'prop-types'

export default class Option extends React.Component {
  constructor (props) {
    super(props)
    this.doClick = this.doClick
  }

  static defaultProps = {
    value: '',
    children: '',
    onClick: function () {}
  }

  doClick (e) {
    this.props.onClick(this.props.value)
  }

  render () {
    let { context } = this
    if (context) {
      let select = context.select
      this.doClick = () => select.toggleOption({ value: this.props.value, text: this.props.children })
      select.optionsData[this.props.value] = this.props.children
    }
    return (
      <li onClick={this.doClick}>{this.props.children}</li>
    )
  }
}

Option.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  onClick: PropTypes.func
}

Option.contextTypes = {
  select: PropTypes.any
}
