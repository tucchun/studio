import React from 'react'
import PropTypes from 'prop-types'
import { OrderStatus } from '../../../consts/dictionary'
import { Text } from '../../form'
import style from './style.scss'

export default class Describe extends React.Component {
  static propTypes = {
    orderId: PropTypes.string,
    orderStatus: PropTypes.string,
    productCount: PropTypes.string,
    recipientName: PropTypes.string,
    recipientProvince: PropTypes.string,
    recipientCity: PropTypes.string,
    recipientAddress: PropTypes.string,
    postCode: PropTypes.string,
    recipientPhone: PropTypes.string,
    recipientFxPhone: PropTypes.string,
    settleMode: PropTypes.string,
    amount: PropTypes.number
  }
  render () {
    let {
      orderId,
      orderStatus,
      productCount,
      recipientName,
      recipientProvince,
      recipientCity,
      recipientAddress,
      postCode,
      recipientPhone,
      recipientFxPhone,
      settleMode,
      amount
    } = this.props
    return (
      <div className={style.wrapper}>
        <div className={style['describe-item']}>
          <div className={style['describe-title']}>
            订单信息
          </div>
          <div className={style['describe-info']}>
            <div className={style['describe-item']}>
              <label>订单编号:</label>
              <span>{orderId}</span>
            </div>
            <div className={style['describe-item']}>
              <label>订单状态:</label>
              <span>{OrderStatus[orderStatus]}</span>
            </div>
            <div className={style['describe-item']}>
              <label>商品种类(SKU):</label>
              <span>3</span>
            </div>
            <div className={style['describe-item']}>
              <label>商品件数:</label>
              <span>{productCount}</span>
            </div>
          </div>
        </div>
        <div className={style['describe-item']}>
          <div className={style['describe-title']}>
            订单信息
          </div>
          <div className={style['describe-info']}>
            <div className={style['describe-item']}>
              <label>收货人:</label>
              <span>{recipientName}</span>
            </div>
            <div className={style['describe-item']}>
              <label>所在地区:</label>
              <span>{recipientProvince + recipientCity}</span>
            </div>
            <div className={style['describe-item']}>
              <label>详细地址:</label>
              <span>{recipientAddress}</span>
            </div>
            <div className={style['describe-item']}>
              <label>邮政编码:</label>
              <span>{postCode}</span>
            </div>
            <div className={style['describe-item']}>
              <label>手机号码:</label>
              <span>{recipientPhone}</span>
            </div>
            <div className={style['describe-item']}>
              <label>固定电话:</label>
              <span>{recipientFxPhone}</span>
            </div>
          </div>
        </div>
        <div className={style['describe-item']}>
          <div className={style['describe-title']}>
            结款方式
          </div>
          <div className={style['describe-info']}>
            <div className={style['describe-item']}>
              <label>结款方式:</label>
              <span>{settleMode}</span>
            </div>
            <div className={style['describe-item']}>
              <label>应付总额:</label>
              <span className={style.price}>¥<Text type='price'>{amount}</Text></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
