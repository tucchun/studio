import React from 'react'
import ReactLoading from 'react-loading'
import style from './style.scss'

export default class Loading extends React.Component {
  render () {
    return (
      <div className={style['loading-wrapper']}>
        <div className={style['loading-inner']}>
          <div className={style.loading}>
            <ReactLoading className={style.loading} type='spin' color='#fff' height={80} width={80} />
          </div>
          <p className={style.tip}>加载中…</p>
        </div>
      </div>
    )
  }
}
