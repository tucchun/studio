import React from 'react'
import PropTypes from 'prop-types'
import { Button, Text } from '../form'
import { multStyle } from '../../utils/common'
import style from './style.scss'

export default class OrdersItem extends React.Component {
  constructor (props) {
    super(props)
    this.doClickOrderInfo = this.doClickOrderInfo.bind(this)
  }

  static defaultProps = {
    onClickOrderInfo: function () {}
  }

  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.any,
    onClickOrderInfo: PropTypes.func,
    orderTime: PropTypes.number,
    orderId: PropTypes.string,
    amount: PropTypes.number
  }

  doClickOrderInfo () {
    this.props.onClickOrderInfo(this.props.orderId)
  }

  render () {
    let { orderTime, orderId, amount } = this.props
    return (
      <div className={multStyle(style.wrapper, this.props.className)}>
        <div className={style.header}>
          <span className={style['header-text']}>下单时间：<Text type='time'>{orderTime}</Text></span>
          <span className={style['header-text']}>订单号：{orderId}</span>
        </div>
        <div className={style.inner}>
          <div className={style.prd}>
            {this.props.children}
          </div>
          <div className={style.price}>
            <div className={style.label}>订单总价</div>
            <div className={style['prd-price']}>&yen;<Text type='price'>{amount}</Text></div>
          </div>
          <div className={style.state}>
            <div className={style.label}>订单状态：</div>
            <div className={style['state-value']}>待收货</div>
          </div>
          <div className={style.operate}>
            <div className={style.label} onClick={this.doClickOrderInfo}>订单详情</div>
            <div><Button type='m-3'>确认收货</Button></div>
          </div>
        </div>
      </div>
    )
  }
}
