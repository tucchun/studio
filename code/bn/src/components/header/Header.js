import React, { Component } from 'react'
import Search from '../search'
import { multStyle } from '../../utils/common'
import CommonStyle from '../../assets/style/common.scss'
import style from './style.scss'

export default class Index extends Component {
  render (props) {
    return (
      <div className={style.header}>
        <div className={multStyle(style.inner, CommonStyle.clearfix)}>
          <div className={CommonStyle['pull-left']}>
            <h2>宝能零售采购网</h2>
            <p>www.baonengcaigou.com</p>
          </div>
          <div className={multStyle(CommonStyle['pull-right'], style.operate)}>
            <Search />
            <a className={style.btn}>购物车</a>
            <a className={style.btn}>我的收藏夹</a>
          </div>
        </div>
      </div>
    )
  }
}
