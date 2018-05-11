import React, { Component } from 'react'
import style from './style.scss'

export default class Index extends Component {
  render (props) {
    return (
      <div className={style.search}>
        <input type='text' className={style.input} />
        <a className={style.btn}>查询</a>
      </div>
    )
  }
}
