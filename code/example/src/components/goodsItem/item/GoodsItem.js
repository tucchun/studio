import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../../utils/common'
import { Text } from '../../form/index'
import PropTypes from 'prop-types'
import UIImage from '../../Image'
/*
* @goodsItem:商品信息，对象，必须包含商品图片，介绍，价格三个元素，是否收藏如果没有登录，全部记为没收藏
* */
export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goodsItem: this.props.goodsItem,
      isFavorite: this.props.goodsItem.favorite
    }
    this.getCollection = this.getCollection.bind(this)
  }

  getCollection (favorite) {
    let isFavorite = this.state.isFavorite
    let alink =
      <a className={parseInt(isFavorite) === 1 ? style.collected : ''} href='javascript:void(0)' onClick={
        (e) => {
          e.preventDefault()
          e.stopPropagation()
          this.setState({
            isFavorite: parseInt(isFavorite) === 1 ? 0 : 1
          })
          this.props.collection && this.props.collection(e)
        }
      }>
        <span className={multStyle(style.icon, style['icon-collection'])}>&nbsp;</span>
        {parseInt(isFavorite) === 1 ? '取消收藏' : '收藏'}
      </a>
    return alink
  }

  render () {
    return (
      <div className={style.goodsItem} onClick={
        (e) => {
          this.props.onClick && this.props.onClick()
        }
      }>
        <UIImage size={'100'} src={this.state.goodsItem.titleImage || ''} className={style.goodsImg}/>
        <div className={style.price}>￥<Text type={'price'}>{this.state.goodsItem.price}</Text></div>
        <div className={style.introduce}>
          {this.state.goodsItem.productName}
        </div>
        <div>
          {
            this.getCollection(this.state.goodsItem.favorite)
          }
        </div>
      </div>
    )
  };
}
Index.propTypes = {
  goodsItem: PropTypes.shape({
    titleImage: PropTypes.string,
    productName: PropTypes.string,
    isCollectioned: PropTypes.bool
  }),
  onClick: PropTypes.func,
  collection: PropTypes.func
}
