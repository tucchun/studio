import React, { Component } from 'react'
import { multStyle } from '../../utils/common'
import CommmonStyle from '../../assets/style/common.scss'
import style from './style.scss'
export default class Index extends Component {
  render () {
    return (
      <div className={style['site-nav']}>
        <div className={multStyle(style.inner, CommmonStyle.clearfix)}>
          <div className={CommmonStyle['pull-left']}>
            <div className={style.info}>
              <p>宝能零售客服电话0755-11111111（工作日8：30-18：00）</p>
            </div>
          </div>
          <div className={CommmonStyle['pull-right']}>
            <div className={style.user}>
              <p>前海人寿-小张&nbsp;退出登录</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
