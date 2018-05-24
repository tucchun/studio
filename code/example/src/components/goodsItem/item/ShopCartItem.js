import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../../utils/common'
import PropTypes from 'prop-types'
export default class ShopCartItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goods:props.goods
    }
  }
  render () {
    return (
      <div className={multStyle(style['shop-cart-item'], 'clearfix')}>
        <div className={multStyle('pull-left', style.divimg)}>
          <img src={this.state.goods.productImageUrl} alt='商品缩略图' />
        </div>
        <div className={multStyle('pull-left', style.introduce)}>
          <p>{this.state.goods.productName}</p>
          <p>白色</p>
        </div>
        <div className={multStyle('pull-left', style.w231)}>
          <p className={style.price}>¥{this.state.goods.productPrice}</p>
        </div>
        <div className={multStyle('pull-left', style.w231)}>
          <p>{this.state.goods.count}</p>
        </div>
        <div className={multStyle('pull-left', style.w231, style.subtotal)}>
          <p className={style.price}>¥{this.state.goods.count * this.state.goods.productPrice}</p>
        </div>
      </div>
    )
  }
}
ShopCartItem.propTypes = {
  goods:PropTypes.shape({
    productPrice:PropTypes.number.isRequired,
    productImageUrl:PropTypes.string.isRequired,
    productName:PropTypes.string.isRequired,
    spec:PropTypes.string.isRequired,
    count:PropTypes.number.isRequired
  }).isRequired
}