import React from 'react'
import style from './style.scss'

export default class Describe extends React.Component {
  render () {
    return (
      <div className={style.wrapper}>
        <div className={style['describe-item']}>
          <div className={style['describe-title']}>
            订单信息
          </div>
          <div className={style['describe-info']}>
            <div className={style['describe-item']}>
              <label>订单编号:</label>
              <span>201804140927000283</span>
            </div>
            <div className={style['describe-item']}>
              <label>订单状态:</label>
              <span>待收货</span>
            </div>
            <div className={style['describe-item']}>
              <label>商品种类(SKU):</label>
              <span>3</span>
            </div>
            <div className={style['describe-item']}>
              <label>商品件数:</label>
              <span>111</span>
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
              <span>任跃武</span>
            </div>
            <div className={style['describe-item']}>
              <label>所在地区:</label>
              <span>广东省深圳市罗湖区</span>
            </div>
            <div className={style['describe-item']}>
              <label>详细地址:</label>
              <span>梨园路6号物资置地大厦 13楼</span>
            </div>
            <div className={style['describe-item']}>
              <label>邮政编码:</label>
              <span>518000</span>
            </div>
            <div className={style['describe-item']}>
              <label>手机号码:</label>
              <span>18637472727</span>
            </div>
            <div className={style['describe-item']}>
              <label>固定电话:</label>
              <span>0755-88273847</span>
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
              <span>现款现结</span>
            </div>
            <div className={style['describe-item']}>
              <label>应付总额:</label>
              <span className={style.price}>¥2079.00</span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
