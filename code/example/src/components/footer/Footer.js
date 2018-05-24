import React, { Component } from 'react'
import style from './style.scss'

export default class Footer extends Component {
  render (props) {
    return (
      <div className={style.footer}>
        © 2018 宝能零售
      </div>
    )
  }
}
