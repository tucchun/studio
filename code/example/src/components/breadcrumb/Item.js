import PropTypes from 'prop-types'
import React, { Component, PureComponent } from 'react'

export default class Item extends (PureComponent || Component) {
  constructor (props) {
    super(props)
    this.doClick = this.doClick.bind(this)
  }

  doClick () {
    this.props.onClick({ href: this.props.href })
  }

  static propTypes = {
    href: PropTypes.string,
    onClick: PropTypes.func
  }
  render () {
    const { href, name, ...others } = this.props
    if (this.props.children) {
      return this.props.children
    }
    return href ? (
      <a {...others} onClick={this.doClick} href={'javascript:void(0)'}>
        {name}
      </a>
    ) : (
      <span {...others}>{name}</span>
    )
  }
}
