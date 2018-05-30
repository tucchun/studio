import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../../utils/common'
import PropTypes from 'prop-types'
import math from 'mathjs'
import Text from '../../form/Text'
import UIImage from '../../Image'

export default class ShopCartItem extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goods: props.goods
    }
  }

  render () {
    return (
      <div className={multStyle(style['shop-cart-item'], 'clearfix')}>
        <div className={multStyle('pull-left', style.divimg)}>
          <UIImage size={'70'} src={this.state.goods.productImageUrl || ''} alt='商品缩略图'/>
        </div>
        <div className={multStyle('pull-left', style.introduce)}>
          <p>{this.state.goods.productName}</p>
          {/*<p>白色</p>*/}
        </div>
        <div className={multStyle('pull-left', style.w231)}>
          <p className={style.price}>¥<Text type={'price'}>{this.state.goods.productPrice}</Text></p>
        </div>
        <div className={multStyle('pull-left', style.w231)}>
          <p>{this.state.goods.count}</p>
        </div>
        <div className={multStyle('pull-left', style.w231, style.subtotal)}>
          <p className={style.price}>¥<Text type={'price'}>{
            math.eval(parseInt(this.state.goods.count) * parseFloat(this.state.goods.productPrice))
          }</Text></p>
        </div>
      </div>
    )
  }
}
ShopCartItem.propTypes = {
  goods: PropTypes.shape({
    productPrice: PropTypes.string.isRequired,
    productImageUrl: PropTypes.string.isRequired,
    productName: PropTypes.string.isRequired,
    count: PropTypes.any.isRequired
  }).isRequired
}
