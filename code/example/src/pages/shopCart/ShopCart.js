import React, { Component } from 'react'
import { multStyle } from '../../utils/common'
import { connect } from 'react-redux'
import { updateBreadList } from '../../store/actions'
import {
  getShopCartList,
  switchAllCheck,
  switchCheckStatus,
  delGoods,
  changeCount,
  submitOrder
} from '../../store/shopCart/actions'
import { Checkbox, Button } from '../../components/form/index'
import style from './style.scss'
import GoodsInfo from './goodsInfo/GoodsInfo'
import EditorCount from './editorCount/EditorCount'
import math from 'mathjs'
import Text from '../../components/form/Text'
import PropTypes from 'prop-types'

class ShopCart extends Component {
  constructor (props) {
    super(props)
    this.switchAllCheck = this.switchAllCheck.bind(this)
    this.switchCheckStatus = this.switchCheckStatus.bind(this)
    this.delGoods = this.delGoods.bind(this)
    this.changeCount = this.changeCount.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
    console.log('constructor')
  }

  componentWillMount () {
    console.log('componentWillMount')
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(updateBreadList([
      { name: '首页', href: '/' },
      { name: '购物车', href: './shopcart' },
    ]))
    dispatch(getShopCartList())
    console.log('componentDidMount')
  }

  switchAllCheck () {
    const { dispatch, shopCartData } = this.props
    let allChecked = shopCartData.allChecked
    allChecked = allChecked ? false : true
    dispatch(switchAllCheck({
      allChecked
    }))
  }

  switchCheckStatus (prdCode) {
    const { dispatch } = this.props
    dispatch(switchCheckStatus(prdCode))
  }

  delGoods (prdCode) {
    const { dispatch, shopCartData } = this.props
    let codes = prdCode || shopCartData.checkedProductCode
    dispatch(delGoods(codes)).then(() => { dispatch(getShopCartList()) })
  }

  changeCount (count,prdCode) {
    const { dispatch } = this.props
    dispatch(changeCount(count, prdCode)).then(() => { dispatch(getShopCartList()) })
  }

  submitOrder () {
    const { dispatch, shopCartData } = this.props
    let productCodes = shopCartData.checkedProductCode
    dispatch(submitOrder(productCodes)).then(res => {
      this.props.history.push({
        pathname: '/pages/balance',
        state: res
      })
    })
  }

  render () {
    const { shopCartData } = this.props
    let goodsList = shopCartData.goodsList
    return (
      <div>
        <div className={style.shop_cart}>
          <ul className={multStyle(style.tableHeader, style.clearfix)}>
            <li className={multStyle(style['pull-left'], style['mr-20'])}>
              <Checkbox value={1} checked={shopCartData.allChecked} onChange={this.switchAllCheck} >全选</Checkbox>
            </li>
            <li className={multStyle(style['pull-left'], style.goods_info)}>
              商品信息
            </li>
            <li className={multStyle(style['pull-left'], style.w164)}>
              单价
            </li>
            <li className={multStyle(style['pull-left'], style.w164)}>
              数量
            </li>
            <li className={multStyle(style['pull-left'], style.w164, style.align_right)}>
              小计
            </li>
            <li className={multStyle(style['pull-left'], style.w164)}>
              操作
            </li>
          </ul>
          <div className={style.goods_list}>
            <ul>
              <Checkbox.Group value={shopCartData.checkedProductCode} onChange={
                value => {
                  this.switchCheckStatus(value)
                }
              }>
                {
                  goodsList.length ? goodsList.map(goodsItem => {
                    return (
                      <li className={multStyle(style.clearfix, goodsItem.checked ? style.checked : '')}
                        key={goodsItem.productCode}>
                        <div className={multStyle(style['pull-left'], style.w78)}>
                          <div>
                            <Checkbox value={goodsItem.productCode} />
                          </div>
                        </div>
                        <GoodsInfo goodsItem={goodsItem} />
                        <div className={multStyle(style.w164, style['pull-left'], style.price)}>
                          <div>
                            ￥<Text type={'price'}>{goodsItem.productPrice}</Text>
                          </div>
                        </div>
                        <div className={multStyle(style.w164, style['pull-left'])}>
                          <div>
                            <EditorCount count={parseInt(goodsItem.count)} changeCount={
                              (count) => {
                                let prodCode = goodsItem.productCode
                                this.changeCount(count, prodCode)
                              }
                            } isUseable={parseInt(goodsItem.productStatus) === 1 ? true : false} />
                          </div>
                        </div>
                        <div className={multStyle(style.w164, style['pull-left'], style.align_right, style.price)}>
                          <div>
                            ￥{math.eval(parseFloat(goodsItem.productPrice) * parseInt(goodsItem.count)).toFixed(2)}
                          </div>
                        </div>
                        <div className={multStyle(style.w164, style['pull-left'])}>
                          <div>
                            <Button size={'smaller'} type={'m-4'} icon={'icon-delete'} onClick={
                              () => {
                                this.delGoods(goodsItem.productCode)
                              }
                            }>删除</Button>
                          </div>
                        </div>
                      </li>
                    )
                  }) : [<li key={'noitem'}>购物车没有任何商品哦</li>]
                }
              </Checkbox.Group>
            </ul>
          </div>
          <ul className={multStyle(style.tableFooter, style.clearfix)}>
            <li className={multStyle(style['pull-left'], style['mr-20'])}>
              <Checkbox value={1} checked={shopCartData.allChecked} onChange={this.switchAllCheck}>全选</Checkbox>
            </li>
            <li className={multStyle(style['pull-left'], style.goods_info)}>
              <Button size={'smaller'} type={'m-4'} icon={'icon-delete'} onClick={
                () => {
                  this.delGoods()
                }
              }>批量删除</Button>
            </li>
            <li className={multStyle(style['pull-right'], style.submit)}>
              <div className={style['pull-left']}>
                商品种类:
                <span>{shopCartData.totalProductType}</span>
              </div>
              <div className={style['pull-left']}>
                商品件数:
                <span>{shopCartData.totalProduct}</span>
              </div>
              <div className={multStyle(style['pull-left'], style.price)}>
                商品总价：
                <span>￥{new Number(shopCartData.cartTotalAmount).toFixed(2)}</span>
              </div>
              <Button onClick={() => {
                this.submitOrder()
              }} size={'large'} type={'secondary'} className={style['pull-right']}>下单</Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ShopCart.propTypes = {
  dispatch:PropTypes.func,
  shopCartData: PropTypes.object
}

const mapStateToProps = state => {
  return {
    shopCartData:state.shopCartData
  }
}
export default connect(
  mapStateToProps
)(ShopCart)
