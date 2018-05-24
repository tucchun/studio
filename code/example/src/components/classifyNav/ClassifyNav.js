import React, { Component } from 'react'
// import { multStyle } from '../../utils/common'
// import CommmonStyle from '../../assets/style/common.scss'
import Item from './Item'
import style from './style.scss'
export default class Index extends Component {
  render () {
    return (
      <div className={style['classify-nav']}>
        <div className={style['content']}>
          <div className={style.title}>
            <i className={style['title-icon']} />
            <h3>全部分类</h3>
            <Item />
          </div>
        </div>
      </div>
    )
  }
}
