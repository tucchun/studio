import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../utils/common'
import PropTypes from 'prop-types'
import { GoodsItem } from '../../components/goodsItem/index'
import ajax from '../../utils/ajax'
import Breadcrumb from '../../components/breadcrumb'
import Pagination from '../../components/pagination'
import { Button } from '../../components/form'
import { withTemplate } from '../template'

const PageSize = 5
export class PrdList extends Component {
  constructor (props) {
    super(props)
    this.onPagClick = this.onPagClick.bind(this)
    this.doIncreClick = this.doIncreClick.bind(this)
    this.doDescrClick = this.doDescrClick.bind(this)
    this.toPrdDetails = this.toPrdDetails.bind(this)
    this.doLikeClick = this.doLikeClick.bind(this)
    this.doClassifyQuery = this.doClassifyQuery.bind(this)
    this.onPriceClick = this.onPriceClick.bind(this)
    this.state = {
      isIncreCur: false, // 是否升序
      isDescrCur: false, // 是否降序
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
      classifyList: [],
      currentPage:1, // 当前页下标
      prdList: [], // 商品列表
      totalCount: 0, // 总商品数
      productName: '', // 查询商品名称
      classId: '', // 查询 分类ID
      firstClassId: '', // 一级分类
      secondClassId: '', // 二级分类
      thirdClassId: '' // 三级分类
    }
  }
  static propTypes = {
    context: PropTypes.object,
    history: PropTypes.object
  }
  getClassifyList (classId) { // 获取子类分类列表
    ajax({
      url: '/los/2b-admin-front.queryFrontClassById',
      data: {
        classId: classId || this.state.classId
      }
    }).then(res => {
      console.log('res ', res)
      if (res) {
        let classifyList = res.frontClassifies
        this.setState({
          classifyList: classifyList
        })
      }
    })
  }
  getPrdList (params) { // 获取商品列表函数
    ajax({
      url:  '/los/2b-admin-front.productPageList',
      data:{
        pageNo: params.currentPage || 0,
        pageSize: PageSize,
        firstClassId: params.firstClassId || this.state.firstClassId || undefined,
        secondClassId: params.secondClassId || this.state.secondClassId || undefined,
        thirdClassId: params.thirdClassId || this.state.thirdClassId || undefined,
        productName: params.productName || this.state.productName || undefined,
        bigPrice: params.bigPrice || undefined,
        minPrice: params.minPrice || undefined,
        sortField: params.sortField || undefined,
        sortType: params.sortType || undefined
      }
    }).then(res => {
      console.log(res)
      if (res.list) {
        let prdList = res.list
        let totalCount = res.totalCount
        this.setState({
          prdList: prdList,
          totalCount: totalCount
        })
      } else {
        this.setState({
          prdList: [],
          totalCount: 0
        })
      }
    })
  }
  componentWillMount () {
    let productName = location.href.split('?q=')[1] || ''
    let firstClassId = !productName && location.href.split('firstClassId=')[1].split('&')[0]
    let secondClassId = !productName && location.href.split('secondClassId=')[1].split('&')[0]
    let thirdClassId = location.href.indexOf('thirdClassId=') > 0
      ? location.href.split('thirdClassId=')[1].split('&')[0] : ''
    let classId = secondClassId
    this.getPrdList({
      firstClassId: firstClassId,
      secondClassId: secondClassId,
      thirdClassId: thirdClassId,
      productName: decodeURI(productName)
    })
    this.setState({
      classId: classId,
      productName: productName,
      firstClassId: firstClassId,
      secondClassId: secondClassId,
      thirdClassId: thirdClassId
    })
    this.getClassifyList(classId)
    console.log('classId', classId)
  }
  onPriceClick () {
    let minPrice = this.refs.minPrice.value
    let bigPrice = this.refs.bigPrice.value
    this.getPrdList({
      sortField: 'price',
      minPrice: minPrice,
      bigPrice: bigPrice
    })
  }
  doClassifyQuery (classId) { // 子分类点击事件
    this.getPrdList({
      thirdClassId: classId
    })
  }
  onPagClick (e, index) { // 分页点击事件
    console.log(e.target.text)
    let curPage = Number(e.target.text) ? Number(e.target.text) - 1 : index - 1
    this.getPrdList({
      currentPage: curPage
    })
  }
  doIncreClick () { // 升序事件
    this.setState({
      isIncreCur: !this.state.isIncreCur,
      isDescrCur: false
    })
    this.getPrdList({
      sortField: 'max_price',
      sortType: 'ASC'
    })
  }
  doDescrClick () { // 降序事件
    this.setState({
      isDescrCur: !this.state.isDescrCur,
      isIncreCur: false
    })
    this.getPrdList({
      sortField: 'max_price',
      sortType: 'DESC'
    })
  }
  toPrdDetails (prdCode) { // 商品点击事件
    console.log(prdCode)
    this.props.history.push({
      pathname: `/prdDetails/${prdCode}`
    })
  }
  doLikeClick (prdCode) { // 收藏事件
    console.log(this.props.context.header)
    /* this.props.context.header.toggleHeaderNumber({
      ...this.props.context.header.headerNums,
      collectNums: this.props.context.header.headerNums.collectNums + 1
    }) */
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
    let prdTotal = this.state.totalCount
    return (
      <div>
        <Breadcrumb breads={this.state.breadList} />
        <div className={style.contentBox}>
          <div className={style.filterBox}>
            {
              !this.state.productName && <div className={style.classifyBox}>
                <span className={style.filterLabel}>
                分类：
                </span>
                <ul className={style.classifyUl}>
                  {
                    this.state.classifyList.map(classify => {
                      return <li key={classify.classId}
                        onClick={() => this.doClassifyQuery(classify.classId)}>{ classify.className }</li>
                    })
                  }
                </ul>
              </div>
            }
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
                  <input ref='minPrice' placeholder='最低价' />
                &nbsp;-&nbsp;
                  <input ref='bigPrice' placeholder='最高价' />
                </span>
                <Button size='small' type='m-2' onClick={this.onPriceClick}>确定</Button>
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
                  return (
                    <GoodsItem goodsItem={goodsItem} key={goodsItem.productCode}
                      onClick={() => this.toPrdDetails(goodsItem.productCode)}
                      collection={() => this.doLikeClick(goodsItem.productCode)} />
                  )
                })
              }
            </div>
          </div>
          { this.state.totalCount > PageSize &&
            <Pagination totalCount={this.state.totalCount} handleClick={this.onPagClick} pageSize={PageSize} /> }
        </div>
      </div>
    )
  }
}

export default withTemplate(PrdList)
