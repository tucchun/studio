import React, { Component } from 'react'
import style from './style.scss'

export default class Index extends Component {
  render (props) {
    return (
      <div className={style.search}>
        <input type='text' className={style.input} placeholder='请输入关键字进行搜索' />
        <a className={style.btn}>查询</a>
      </div>
    )
  }
}
