import React, { Component } from 'react'
import PropTypes from 'prop-types'
// import _ from 'lodash'
import { multStyle } from '../../../utils/common'
import style from './style.scss'

export default class Input extends Component {
  constructor (props) {
    super(props)
    this.doInput = this.doInput.bind(this)
  }

  static defaultProps = {
    value: '',
    className: '',
    onChange: function () {}
  }

  doInput (e) {
    let el = e.target
    let value = el.value
    // if (/[a-zA-Z0-9\d\u4e00-\u9fa5]/.test(value)) {
    this.props.onChange({
      value,
      name: this.props.name
    })
    // }
  }

  render () {
    // let props = _.omit(this.props, ['className', 'type', 'value', 'onChange'])
    return (
      <input
        type='text'
        {...this.props}
        className={multStyle(style.input, this.props.className)}
        value={this.props.value}
        onChange={this.doInput}
      />
    )
  }
}

Input.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  name: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string
}
