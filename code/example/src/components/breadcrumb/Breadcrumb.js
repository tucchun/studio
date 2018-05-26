import React, { Component, PureComponent } from 'react'

import PropTypes from 'prop-types'
import Item from './Item'
import { multStyle } from '../../utils/common'
import style from './style.scss'

export default class Breadcrumb extends (PureComponent || Component) {

  constructor (props) {
    super(props)
    this.doClickItem = this.doClickItem.bind(this)
  }

  doClickItem (path) {
    this.props.onClick(path)
  }

  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    breads: PropTypes.array,
    onClick: PropTypes.func
  }
  static defaultProps = {
    prefix: '',
    className: '',
    breads: []
  }
  render () {
    const { prefix, className, children = null, breads } = this.props
    return (
      <div className={multStyle(style.breadcrumb, className)}>
        <div className={style['breadcrumb-content']}>
          {children}
          {breads &&
            breads.length > 0 &&
            breads.map((item, index) => {
              return <Item onClick={this.doClickItem} {...item} key={index} />
            })}
        </div>
      </div>
    )
  }
}
Breadcrumb.Item = Item
