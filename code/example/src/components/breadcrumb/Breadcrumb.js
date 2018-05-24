import React, { Component, PureComponent } from 'react'

import PropTypes from 'prop-types'
import Item from './Item'
import { multStyle } from '../../utils/common'
import style from './style.scss'

export default class Breadcrumb extends (PureComponent || Component) {
  static propTypes = {
    prefix: PropTypes.string,
    className: PropTypes.string,
    breads: PropTypes.array
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
              return <Item {...item} key={index} />
            })}
        </div>
      </div>
    )
  }
}
Breadcrumb.Item = Item
