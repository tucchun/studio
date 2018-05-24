import React, { Component } from 'react'
import { GoodsItem, Item, GoodsTable } from './index'
import style from './item/style.scss'
import { multStyle } from '../../utils/common'
// import ShopCartItem from './item/ShopCartItem'
// import GoodsTable from './goodsTable/GoodsTable'
class GoodsList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      goodsList:[
        {
          productCode:1,
          productPrice:12.11,
          productImageUrl:'https://dn-fed.qbox.me/@/i/20150420172926316798266634',
          productName:'惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          isCollecton:false },
        {
          productCode:2,
          productPrice:12.11,
          productImageUrl:'https://dn-fed.qbox.me/@/i/20150420172926316798266634',
          productName:'惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          isCollecton:false
        },
        {
          productCode:3,
          productPrice:12.11,
          productImageUrl:'https://dn-fed.qbox.me/@/i/20150420172926316798266634',
          productName:'惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          isCollecton:false
        }
      ],
      choseGoods:[
        {
          productCode:1,
          productPrice:123.11,
          productImageUrl:'http://img1.imgtn.bdimg.com/it/u=594559231,2167829292&fm=27&gp=0.jpg',
          productName:'惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          spec:'白色',
          count:2
        },
        {
          productCode:2,
          productPrice:123.11,
          productImageUrl:'http://img1.imgtn.bdimg.com/it/u=594559231,2167829292&fm=27&gp=0.jpg',
          productName:'惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          spec:'白色',
          count:3
        },
        {
          productCode:3,
          productPrice:123.11,
          productImageUrl:'http://img1.imgtn.bdimg.com/it/u=594559231,2167829292&fm=27&gp=0.jpg',
          productName:'惠普（HP）DJ 2131  彩色喷墨三合一一体机惠众系列',
          spec:'白色',
          count:1
        }
      ]
    }
  }
  render () {
    let goodsList = this.state.goodsList
    // let chouseGoods = this.state.choseGoods
    return (
      <div>
        <div className={multStyle('clearfix', style.list)}>
          {
            goodsList.map(goodsItem => {
              return <GoodsItem goodsItem={goodsItem} key={goodsItem.productCode} onClick={
                () => {
                  console.log(goodsItem)
                }
              } />
            })
          }
        </div>
        <div className={multStyle('clearfix', style.list)}>
          {
            goodsList.map(goodsItem => {
              return <Item key={goodsItem.productCode} goodsItem={goodsItem} onClick={
                () => {
                  console.log(goodsItem)
                }
              } />
            })
          }
        </div>
        <div>
          <GoodsTable goodsList={this.state.choseGoods} remarkStatus={'show'} />
        </div>
      </div>
    )
  }
}
export default GoodsList
