import React, { Component } from 'react'
import Breadcrumb from '../../components/breadcrumb/index'
import { multStyle } from '../../utils/common'
import { Checkbox, Button } from '../../components/form/index'
import style from './style.scss'
import GoodsInfo from './goodsInfo/GoodsInfo'
import EditorCount from './editorCount/EditorCount'
import PropTypes from 'prop-types'
import Dialog from '../../components/dialog/index'
import Template from '../template'
import ajax from '../../utils/ajax'
import { Link } from 'react-router-dom'
import math from 'mathjs'

export default class ShopCart extends Component {
  constructor (props) {
    super(props)
    this.getAllCheck = this.getAllCheck.bind(this)
    this.setChecked = this.setChecked.bind(this)
    this.setCheckProduct = this.setCheckProduct.bind(this)
    this.delArray = this.delArray.bind(this)
    this.getAllprice = this.getAllprice.bind(this)
    this.changeCount = this.changeCount.bind(this)
    this.state = {
      ...props,
      breadList: [
        { name: '首页', href: '/' },
        { name: '清洁用品', href: '/' },
        { name: '消毒用品', href: '/' },
        { name: '消毒液', href: '/' }
      ],
      // goodsList:props.goodsList,
      goodsList: [
        {
          productCode: '0000000002',
          productImageUrl: 'https://img14.360buyimg.com/n0/jfs/t5326/335/2442088867/75285/d768d6af/591ad13fN772df84b.jpg',
          productName: '惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          productPrice: '121.11',
          productDesc: '白色',
          productNum: 3,
          checked: false
        },
        {
          productCode: '0000000003',
          productImageUrl: 'https://img14.360buyimg.com/n0/jfs/t5326/335/2442088867/75285/d768d6af/591ad13fN772df84b.jpg',
          productName: '惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          productPrice: '121.11',
          productDesc: '蓝色',
          productNum: 1,
          checked: false
        },
        {
          productCode: '0000000004',
          productImageUrl: 'https://img14.360buyimg.com/n0/jfs/t5326/335/2442088867/75285/d768d6af/591ad13fN772df84b.jpg',
          productName: '惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          productPrice: '121.11',
          productDesc: '红色',
          productNum: 2,
          checked: true
        },
        {
          productCode: '0000000005',
          productImageUrl: 'https://img14.360buyimg.com/n0/jfs/t5326/335/2442088867/75285/d768d6af/591ad13fN772df84b.jpg',
          productName: '惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          productPrice: '121.11',
          productDesc: '青色',
          productNum: 1,
          checked: true
        }
      ],
      allCheck: false,
      checkedProductCode: [],
      dialogStatus:false
    }
  }

  componentWillMount () {
    // this.getAllCheck()
    let checkedProductCode = this.setCheckProduct()
    ajax({
      url:'/los/2b-admin-front.getCartList'
    }).then(res => {
      console.log(res)
    })
    this.setState({
      checkedProductCode
    })
    // 页面加载获取购物车数据
    const shopcartId = this.state.match.params.id
    console.log(shopcartId)
    // 发起ajax请求，获取购物车
  }

  getAllCheck () {
    // 全选反选
    let allCheck = this.state.allCheck ? false : true
    let goodsList = this.state.goodsList
    for (let i in goodsList) {
      goodsList[i].checked = allCheck
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
      for (let j in goodsItem) {
        if (goodsList[i].productCode === goodsItem[j]) {
          goodsList[i].checked = true
        }
      }
    }
    if (goodsList.length === goodsItem.length) {
      allCheck = true
    }
    console.log(goodsItem)
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
      if (goodsList[i].checked) {
        checkedProductCode.push(goodsList[i].productCode)
      }
    }
    return checkedProductCode
  }

  delGoods (prodCode) {
    // 删除商品
    let goodsList = this.state.goodsList
    let prodCodes = []
    prodCodes.push(prodCode)
    ajax({
      url:'/los/2b-admin-front.deleteCart',
      data:{
        productCodes:prodCodes
      }
    }).then(response => {
      if (response.responseCode === '999999') {
        this.setState({
          dialogStatus:true
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
      url:'/los/2b-admin-front.deleteCart',
      data:{
        productCodes:targetArray
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
    console.log(count)
    let goodsList = this.state.goodsList
    for (let i in goodsList) {
      if (goodsList[i].productCode === prodCode) {
        goodsList[i].productNum = count
      }
    }
    ajax({
      url:'/los/2b-admin-front.changeCartNum',
      data:{ productCode:prodCode, productNum: count }
    }).then(response => {
      console.log(response)
    })
    this.setState({
      goodsList
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
        allPrice += (math.eval(goodsList[i].productNum * goodsList[i].productPrice))
        sku += 1
        allCount += parseInt(goodsList[i].productNum)
      }
    }
    return { allPrice:allPrice.toFixed(2), sku, allCount }
  }

  render () {
    return (
      <Template>
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
                {this.state.goodsList.map(goodsItem => {
                  console.log(this.state.goodsList.length)
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
                          ￥{goodsItem.productPrice}
                        </div>
                      </div>
                      <div className={multStyle(style.w164, style['pull-left'])}>
                        <div>
                          <EditorCount count={parseInt(goodsItem.productNum)} changeCount={
                            (count) => {
                              let prodCode = goodsItem.productCode
                              this.changeCount(count, prodCode)
                            }
                          }/>
                        </div>
                      </div>
                      <div className={multStyle(style.w164, style['pull-left'], style.align_right, style.price)}>
                        <div>
                          ￥{goodsItem.productPrice * goodsItem.productNum}
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
                })}
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
                <span>￥{this.getAllprice().allPrice}</span>
              </div>
              <Link to={'balance'}>
                <Button size={'large'} type={'secondary'} className={style['pull-right']} >下单</Button>
              </Link>
            </li>
          </ul>
        </div>
        <Dialog show={this.state.dialogStatus}>
          删除失败
          <Button type='primary' onClick={() => this.setState({ dialogStatus: false })}>关闭Dialog</Button>
        </Dialog>
      </Template>
    )
  }
}
ShopCart.propTypes = {
  goodsList: PropTypes.array
}
