import React, { Component } from 'react'
import style from './style.scss'
import PropTypes from 'prop-types'
import { multStyle } from '../../../utils/common'
export default class GoodsInfo extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goodsItem:props.goodsItem
    }
  }
  render () {
    return (
      <div className={multStyle(style.goods_info, style['pull-left'], style.clearfix)}>
        <img src={this.state.goodsItem.productImageUrl} alt='商品图片' className={multStyle(style['pull-left'])} />
        <div className={multStyle(style.introduce, style['pull-left'])}>
          <p>
            {this.state.goodsItem.productName}
          </p>
          <p className={style.sec}>{this.state.goodsItem.productDesc}</p>
        </div>
      </div>
    )
  }
}
GoodsInfo.propTypes = {
  goodsItem:PropTypes.shape({
    productImageUrl:PropTypes.string,
    productName:PropTypes.string,
    productPrice:PropTypes.number,
    productDesc:PropTypes.string
  })
}
