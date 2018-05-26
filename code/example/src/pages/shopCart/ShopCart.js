import React, { Component } from 'react'
import Breadcrumb from '../../components/breadcrumb/index'
import { multStyle } from '../../utils/common'
import { Checkbox, Button } from '../../components/form/index'
import style from './style.scss'
import GoodsInfo from './goodsInfo/GoodsInfo'
import EditorCount from './editorCount/EditorCount'
import ajax from '../../utils/ajax'
import math from 'mathjs'
import { withIndexTemplate } from '../template'
import Text from '../../components/form/Text'

class ShopCart extends Component {
  constructor (props) {
    super(props)
    this.getAllCheck = this.getAllCheck.bind(this)
    this.setChecked = this.setChecked.bind(this)
    this.setCheckProduct = this.setCheckProduct.bind(this)
    this.delArray = this.delArray.bind(this)
    this.getAllprice = this.getAllprice.bind(this)
    this.changeCount = this.changeCount.bind(this)
    this.submitOrder = this.submitOrder.bind(this)
    this.state = {
      ...props,
      breadList: [
        { name: '首页', href: '/' },
        { name: '清洁用品', href: '/' },
        { name: '消毒用品', href: '/' },
        { name: '消毒液', href: '/' }
      ],
      goodsList: [],
      allCheck: false,
      checkedProductCode: [],
      dialogStatus: false
    }
  }

  componentDidMount () {
    // this.getAllCheck()
    let checkedProductCode = this.setCheckProduct()
    ajax({
      url: '/los/2b-admin-front.getCartList'
    }).then(res => {
      if (!res.responseCode) {
        let goodsList = res.cartItems
        for (let i in goodsList) {
          goodsList[i].count = parseInt(goodsList[i].count)
          goodsList[i].productPrice = parseFloat(goodsList[i].productPrice)
        }
        this.setState({
          checkedProductCode,
          goodsList
        })
      }
    })
  }

  getAllCheck () {
    // 全选反选
    let allCheck = this.state.allCheck ? false : true
    let goodsList = this.state.goodsList
    for (let i in goodsList) {
      if (parseInt(goodsList[i].productStatus) !== 1) {
        goodsList[i].checked = false
      } else {
        goodsList[i].checked = allCheck
      }
    }
    let checkedProductCode = this.setCheckProduct()
    this.setState({
      ...this.state,
      checkedProductCode,
      allCheck
    })
  }

  setChecked (goodsItem) {
    // 设置选中商品
    let goodsList = this.state.goodsList
    let allCheck = false
    for (let i in goodsList) {
      goodsList[i].checked = false
      let prodCode = goodsList[i].productCode
      let status = parseInt(goodsList[i].productStatus)
      let index = goodsItem.indexOf(prodCode)
      if (index >= 0 && status === 1) {
        goodsList[i].checked = true
      }
      if (index >= 0 && status !== 1) {
        goodsItem.splice(index, 1)
      }
    }
    if (goodsList.length === goodsItem.length) {
      allCheck = true
    }
    this.setState({
      checkedProductCode: goodsItem,
      goodsList,
      allCheck
    })
  }

  setCheckProduct () {
    // 设置选中数组
    let goodsList = this.state.goodsList, checkedProductCode = []
    for (let i in goodsList) {
      if (goodsList[i].checked && parseInt(goodsList[i].productStatus) === 1) {
        checkedProductCode.push(goodsList[i].productCode)
      }
    }
    console.log(checkedProductCode)
    return checkedProductCode
  }

  delGoods (prodCode) {
    // 删除商品
    let goodsList = this.state.goodsList
    let prodCodes = []
    prodCodes.push(prodCode)
    ajax({
      url: '/los/2b-admin-front.deleteCart',
      data: {
        productCodes: prodCodes
      }
    }).then(response => {
      if (response.responseCode === '999999') {
        this.setState({
          dialogStatus: true
        })
        return false
      }
      console.log(response)
      for (let i in goodsList) {
        if (prodCode === goodsList[i].productCode) {
          goodsList.splice(i, 1)
        }
      }
      this.setState({
        goodsList
      })
    })
  }

  delArray () {
    let targetArray = this.state.checkedProductCode
    let goodsList = this.state.goodsList
    ajax({
      url: '/los/2b-admin-front.deleteCart',
      data: {
        productCodes: targetArray
      }
    }).then(res => {
      console.log(res)
      for (let i in targetArray) {
        for (let j in goodsList) {
          if (targetArray[i] === goodsList[j].productCode) {
            goodsList.splice(j, 1)
          }
        }
      }
      this.setState({
        goodsList
      })
    })
  }

  changeCount (count, prodCode) {
    // 更改商品数目
    let goodsList = this.state.goodsList
    for (let i in goodsList) {
      if (goodsList[i].productCode === prodCode) {
        goodsList[i].count = count
      }
    }
    this.setState({
      goodsList
    })
    ajax({
      url: '/los/2b-admin-front.changeCartNum',
      data: { productCode: prodCode, productNum: count }
    }).then(response => {
      console.log(response)
    })
  }

  submitOrder () {
    let productCodes = this.state.checkedProductCode
    ajax({
      url: '/los/2b-admin-front.buyOrderShop',
      data: {
        productCodes
      }
    }).then(res => {
      if (res.responseCode) {
        alert(res.responseMsg)
      } else {
        this.props.history.push({
          pathname: '/balance',
          state: res
        })
      }
    })
  }

  getAllprice () {
    // 获取总价
    let goodsList = this.state.goodsList
    let allPrice = 0
    let sku = 0
    let allCount = 0
    for (let i in goodsList) {
      if (goodsList[i].checked) {
        allPrice += (math.eval(goodsList[i].count * goodsList[i].productPrice))
        sku += 1
        allCount += goodsList[i].count
      }
    }
    return { allPrice: allPrice, sku, allCount }
  }

  render () {
    return (
      <div>
        <Breadcrumb breads={this.state.breadList}/>
        <div className={style.shop_cart}>
          <ul className={multStyle(style.tableHeader, style.clearfix)}>
            <li className={multStyle(style['pull-left'], style['mr-20'])}>
              <Checkbox value={1} checked={this.state.allCheck} onChange={
                this.getAllCheck
              }>全选</Checkbox>
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
              <Checkbox.Group value={this.state.checkedProductCode} onChange={
                value => {
                  this.setChecked(value)
                }
              }>
                {
                  this.state.goodsList.map(goodsItem => {
                    return (
                      <li className={multStyle(style.clearfix, goodsItem.checked ? style.checked : '')}
                          key={goodsItem.productCode}>
                        <div className={multStyle(style['pull-left'], style.w78)}>
                          <div>
                            <Checkbox value={goodsItem.productCode} checked={goodsItem.checked}/>
                          </div>
                        </div>
                        <GoodsInfo goodsItem={goodsItem}/>
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
                  })
                }
              </Checkbox.Group>
            </ul>
          </div>
          <ul className={multStyle(style.tableFooter, style.clearfix)}>
            <li className={multStyle(style['pull-left'], style['mr-20'])}>
              <Checkbox value={1} checked={this.state.allCheck} onChange={
                this.getAllCheck
              }>全选</Checkbox>
            </li>
            <li className={multStyle(style['pull-left'], style.goods_info)}>
              <Button size={'smaller'} type={'m-4'} icon={'icon-delete'} onClick={
                () => {
                  this.delArray()
                }
              }>批量删除</Button>
            </li>
            <li className={multStyle(style['pull-right'], style.submit)}>
              <div className={style['pull-left']}>
                商品种类:
                <span>{this.getAllprice().sku}</span>
              </div>
              <div className={style['pull-left']}>
                商品件数:
                <span>{this.getAllprice().allCount}</span>
              </div>
              <div className={multStyle(style['pull-left'], style.price)}>
                商品总价：
                <span>￥{this.getAllprice().allPrice.toFixed(2)}</span>
              </div>
              <Button onClick={this.submitOrder} size={'large'} type={'secondary'}
                      className={style['pull-right']}>下单</Button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withIndexTemplate(ShopCart)
