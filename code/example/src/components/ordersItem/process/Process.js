import React from 'react'
import PropTypes from 'prop-types'
import style from './style.scss'
import { multStyle } from '../../../utils/common'

export default class Process extends React.Component {
  static propTypes = {
    step: PropTypes.number
  }
  static defaultProps = {
    step: 1
  }
  render () {
    let stepClass = ''
    let step = this.props.step
    if (step === 1) {
      stepClass = 'process-edit-active'
    } else if (step === 2) {
      stepClass = 'process-edit-active'
    } else if (step === 3) {
      stepClass = 'process-done-active'
    }
    return (
      <div className={multStyle(style.wrapper, style[stepClass])}>
        <div className={style.item}>
          <div className={style['process-edit']} />
          <div className={multStyle(style['process-text'], style.edit)}>用户下单</div>
          <div className={style['process-time']}>2018-5-14 11:02:32</div>
        </div>
        <div className={multStyle(style.process, style.verify)} />
        <div className={style.item}>
          <div className={style['process-verify']} />
          <div className={multStyle(style['process-text'], style.verify)}>后台确认</div>
          <div className={style['process-time']}>2018-5-14 11:02:32</div>
        </div>
        <div className={multStyle(style.process, style.done)} />
        <div className={style.item}>
          <div className={style['process-done']} />
          <div className={multStyle(style['process-text'], style.done)}>确认收货</div>
          <div className={style['process-time']}>2018-5-14 11:02:32</div>
        </div>
      </div>
    )
  }
}
