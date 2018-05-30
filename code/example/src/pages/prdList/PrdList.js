import React, { Component } from 'react'
import style from './style.scss'
import { multStyle } from '../../utils/common'
import PropTypes from 'prop-types'
import { GoodsItem } from '../../components/goodsItem/index'
import ajax from '../../utils/ajax'
import Pagination from '../../components/pagination'
import { Button } from '../../components/form'
import { connect } from 'react-redux'
import { updateBreadList, updateHeadNums } from '../../store/actions'
import {
  updateParams,
  fetchPrdList,
  fetchClassifyList
} from '../../store/prdList/actions'
// import { PrdListConst } from '../../store/constants'

const PageSize = 2
export class PrdList extends Component {
  constructor (props) {
    super(props)
    this.onPagClick = this.onPagClick.bind(this)
    this.doIncreClick = this.doIncreClick.bind(this)
    this.doDescrClick = this.doDescrClick.bind(this)
    this.toPrdDetails = this.toPrdDetails.bind(this)
    this.doLikeClick = this.doLikeClick.bind(this)
    this.doClassifyClick = this.doClassifyClick.bind(this)
    this.onPriceClick = this.onPriceClick.bind(this)
    this.state = {
      hasDidMount: false
    }
  }
  static propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    prdData: PropTypes.object,
    classify: PropTypes.object,
    dispatch: PropTypes.func,
    headerNums: PropTypes.object
  }

  shouldComponentUpdate (nextProps, nextState) {
    return true
  }

  fetchData = (nextProps) => {
    let { dispatch } = nextProps
    let { firstClassId, secondClassId, thirdClassId } = nextProps.match.params
    let productName = nextProps.location.state && decodeURI(nextProps.location.state.search)
    let pageNo = productName || firstClassId ? 0 : undefined
    let searchData = {
      ...nextProps.prdData.searchData,
      firstClassId,
      secondClassId,
      thirdClassId,
      productName,
      pageNo
    }
    dispatch(updateParams(searchData))
    dispatch(fetchPrdList(searchData))
    secondClassId && dispatch(fetchClassifyList({ classId: secondClassId }))
    console.log(nextProps.prdData)
    if (productName) {
      dispatch(updateBreadList([
        { name: '全部结果' },
        { name: '"' + productName + '"' }
      ]))
    } else {
      dispatch(updateBreadList(this.getBrandListByClassId(firstClassId, secondClassId)))
    }
  }

  componentDidMount () {
    this.fetchData(this.props)
    this.setState({ hasDidMount: !this.state.hasDidMount })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.location !== this.props.location) {
      this.fetchData(nextProps)
    }
  }
  getBrandListByClassId (firstClassId, secondClassId) {
    let brandList = []
    brandList.push({ name: '首页', href: '/' })
    let classifyList = this.props.classify && this.props.classify.list
    let firstBrand, secondBrand
    console.log('classifyList: ', classifyList)
    if (firstClassId) {
      firstBrand = classifyList.filter(item => item.classId === firstClassId)[0]
      brandList.push({name: firstBrand.className, href: `/pages/prdList/${firstBrand.classId}`})
    }
    if (secondClassId) {
      secondBrand = firstBrand.subFrontClassifyTree.filter(item => item.classId === secondClassId)[0]
      brandList.push({name: secondBrand.className, href: `/pages/prdList/${firstBrand.classId}/${secondBrand.classId}`})
    }
    return brandList
  }
  onPriceClick () {
    let { dispatch } = this.props
    let minPrice = this.refs.minPrice.value
    let bigPrice = this.refs.bigPrice.value
    let searchData = {
      ...this.props.prdData.searchData,
      sortField: 'price',
      minPrice: minPrice,
      bigPrice: bigPrice
    }
    dispatch(updateParams(searchData))
    dispatch(fetchPrdList(searchData))
  }
  doClassifyClick (classId) { // 子分类点击事件
    let { dispatch } = this.props
    let { firstClassId, secondClassId } = this.props.prdData.searchData
    this.props.history.push({
      pathname: `/pages/prdList/${firstClassId}/${secondClassId}/${classId}`
    })
    let searchData = {
      ...this.props.prdData.searchData,
      thirdClassId: classId
    }
    dispatch(fetchPrdList(searchData))
    dispatch(updateParams(searchData))
  }
  onPagClick (e, index) { // 分页点击事件
    let { dispatch } = this.props
    let curPage = Number(e.target.text) ? Number(e.target.text) - 1 : index - 1
    let searchData = {
      ...this.props.prdData.searchData,
      pageNo: curPage
    }
    dispatch(fetchPrdList(searchData))
    dispatch(updateParams(searchData))
  }
  doIncreClick () { // 升序事件
    let { dispatch } = this.props
    let searchData = {
      ...this.props.prdData.searchData,
      sortField: 'price',
      sortType: 'ASC'
    }
    dispatch(updateParams(searchData))
    dispatch(fetchPrdList(searchData))
  }
  doDescrClick () { // 降序事件
    let { dispatch } = this.props
    let searchData = {
      ...this.props.prdData.searchData,
      sortField: 'price',
      sortType: 'DESC'
    }
    dispatch(updateParams(searchData))
    dispatch(fetchPrdList(searchData))
  }
  toPrdDetails (prdCode) { // 商品点击事件
    this.props.history.push({
      pathname: `/pages/prdDetails/${prdCode}`
    })
  }
  doLikeClick (prdCode, favorite) { // 收藏事件
    let { dispatch } = this.props
    let { collectNums } = this.props.headerNums
    let { searchData } = this.props.prdData
    ajax({
      url: '/los/2b-admin-front.addOrCancelFavorite',
      data: {
        productCode: prdCode
      }
    }).then(res => {
      let f = favorite === '1' ? '0' : '1'
      if (f === '1') {
        dispatch(updateHeadNums({
          collectNums: parseInt(collectNums) + 1
        }))
      } else {
        dispatch(updateHeadNums({
          collectNums: parseInt(collectNums) - 1
        }))
      }
      dispatch(fetchPrdList(searchData))
    })
    return false
  }
  render () {
    let prdList = this.props.prdData.prdList
    let prdTotal = this.props.prdData.totalCount
    let { secondClassId } = this.props.match.params
    return (
      <div>
        <div className={style.contentBox}>
          <div className={style.filterBox}>
            {
              !this.props.prdData.productName && this.props.prdData.classifyList && secondClassId && <div className={style.classifyBox}>
                <span className={style.filterLabel}>
                分类：
                </span>
                <ul className={style.classifyUl}>
                  {
                    this.props.prdData.classifyList.map(classify => {
                      return <li key={classify.classId}
                        onClick={() => this.doClassifyClick(classify.classId)}>{ classify.className }</li>
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
                      className={this.props.prdData.searchData.sortType === 'ASC'
                        ? multStyle(style.cur, style.incre) : style.incre} />
                    <i onClick={this.doDescrClick}
                      className={this.props.prdData.searchData.sortType === 'DESC'
                        ? multStyle(style.cur, style.descr) : style.descr} />
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
                      collection={() => this.doLikeClick(goodsItem.productCode, goodsItem.favorite)} />
                  )
                })
              }
            </div>
          </div>
          {
            prdTotal > PageSize &&
            <Pagination totalCount={prdTotal} handleClick={this.onPagClick} pageSize={PageSize} /> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    prdData: state.prdData,
    classify: state.classify,
    headerNums: state.headerNums
  }
}

export default connect(
  mapStateToProps
)(PrdList)
