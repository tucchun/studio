import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../../utils/common'
import PropTypes from 'prop-types'
/*
* @goodsItem 商品项，包含商品描述，价格，图片
* */
export default class Item extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goodsItem : props.goodsItem
    }
  }
  render () {
    return (
      <div className={multStyle(style.goodsItem, style.item)} onClick={
        this.props.onClick
      }>
        <img src={this.state.goodsItem.productImageUrl} alt='图片' className={style.goodsImg} />
        <div className={style.introduce}>
          {this.state.goodsItem.productName}
        </div>
        <div className={style.price}>￥{this.state.goodsItem.productPrice}</div>
      </div>
    )
  }
}
Item.propTypes = {
  goodsItem:PropTypes.shape({
    productImageUrl:PropTypes.string,
    productPrice:PropTypes.number,
    productName:PropTypes.string,
    isCollectioned:PropTypes.bool
  }),
  onClick:PropTypes.func
}
