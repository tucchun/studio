import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../utils/common'
// import PropTypes from 'prop-types'
import { GoodsItem } from '../../components/goodsItem/index'
import ajax from '../../utils/ajax'
import Breadcrumb from '../../components/breadcrumb'
import Pagination from '../../components/pagination'
import { Button } from '../../components/form'
import { withTemplate } from '../template'

const PageSize = 3
export class PrdList extends Component {
  constructor (props) {
    super(props)
    this.onPagClick = this.onPagClick.bind(this)
    this.doIncreClick = this.doIncreClick.bind(this)
    this.doDescrClick = this.doDescrClick.bind(this)
    this.toPrdDetails = this.toPrdDetails.bind(this)
    this.doLikeClick = this.doLikeClick.bind(this)
    this.state = {
      isIncreCur: false,
      isDescrCur: false,
      HeaderNums: {
        cartNums: 10,
        collectNums: 10
      },
      breadList: [
        { name: '首页', href: '/' },
        { name: '清洁用品', href: '/' },
        { name: '消毒用品', href: '/' },
        { name: '消毒液', href: '/' }
      ],
      classifyList: [
        { name : '热敏纸' },
        { name : '复印纸' },
        { name : '收银纸' }
      ],
      currentPage:1,
      prdList: []
    }
  }
  getPrdList (params) {
    ajax({
      url:  '/los/2b-admin-front.productPageList',
      data:{
        classId: params.classId || undefined,
        pageNo: params.currentPage || 1,
        pageSize: PageSize,
        productName: params.productName || undefined
      }
    }).then(res => {
      if (res.productInfoVOList) {
        let prdList = res.productInfoVOList
        this.setState({ prdList: prdList })
      }
    })
  }
  componentWillMount () {
    let classId = location.href.split('q=')[1] || ''
    let productName = location.href.split('?')[1] || ''
    this.getPrdList({
      classId: classId,
      productName: productName
    })
  }
  onPagClick (e) {
    console.log(e.target.text)
    this.getPrdList({
      currentPage: Number(e.target.text)
    })
  }
  doIncreClick () {
    this.setState({
      isIncreCur: !this.state.isIncreCur,
      isDescrCur: false
    })
  }
  doDescrClick () {
    this.setState({
      isDescrCur: !this.state.isDescrCur,
      isIncreCur: false
    })
  }
  toPrdDetails (prdCode) {
    console.log(prdCode)
    location.href = `/#/prdDetails/code?=${prdCode}`
  }
  doLikeClick (prdCode) {
    ajax({
      url: '/los/2b-admin-front.addOrCancelFavorite',
      data: {
        productCode: prdCode
      }
    })
    return false
  }
  render () {
    let prdList = this.state.prdList
    let prdTotal = 100
    return (
      <div>
        <Breadcrumb breads={this.state.breadList} />
        <div className={style.contentBox}>
          <div className={style.filterBox}>
            <div className={style.classifyBox}>
              <span className={style.filterLabel}>
                分类：
              </span>
              <ul className={style.classifyUl}>
                {
                  this.state.classifyList.map(classify => {
                    return <li key={classify.name}>{ classify.name }</li>
                  })
                }
              </ul>
            </div>
            <div className={style.sortBox}>
              <span className={style.filterLabel}>
              排序：
              </span>
              <span className={style.sortCtent}>
                <span className={multStyle(style.default, style.red)}>
                默认
                </span>
                <span className={style.priceFilter}>
                  <span className={style.priceLabel}>价格</span>
                  <span className={style.priceMark}>
                    <i onClick={this.doIncreClick}
                      className={this.state.isIncreCur ? multStyle(style.cur, style.incre) : style.incre} />
                    <i onClick={this.doDescrClick}
                      className={this.state.isDescrCur ? multStyle(style.cur, style.descr) : style.descr} />
                  </span>
                </span>
                <span className={style.inputBox}>
                  <input placeholder='最低价' />
                &nbsp;-&nbsp;
                  <input placeholder='最高价' />
                </span>
                <Button size='small' type='m-2'>确定</Button>
                <span className={style.prdTotal}>
                  共找到<i className={style.red}>{ prdTotal }</i>件商品
                </span>
              </span>
            </div>
          </div>
          <div className={style.prdList}>
            <div className={multStyle(style.clearfix, style.list)}>
              {
                (prdList || []).map(goodsItem => {
                  return <GoodsItem goodsItem={goodsItem} key={goodsItem.productCode}
                    onClick={() => this.toPrdDetails(goodsItem.productCode)}
                    collection={() => this.doLikeClick(goodsItem.productCode)} />
                })
              }
            </div>
          </div>
          { prdList ? prdList.length > PageSize &&
            <Pagination total={2018} handleClick={this.onPagClick} pageSize={PageSize} /> : ''}
        </div>
      </div>
    )
  }
}

export default withTemplate(PrdList)
