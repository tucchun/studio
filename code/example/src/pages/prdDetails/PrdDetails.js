import React, { Component } from 'react'
import style from './style.scss'
import PropTypes from 'prop-types'
import { multStyle } from '../../utils/common'
// import PropTypes from 'prop-types'
import ajax from '../../utils/ajax'
import math from 'mathjs'
import Img from '../../components/Image'
import { Button } from '../../components/form'
import { connect } from 'react-redux'
import { updateBreadList, updateHeadNums } from '../../store/actions'
import { fetchPrdDetails, doPrcsCountChangeClick, updateParams, updateCurrentIndex,
  doScrollArrow, fetchClassifyList } from '../../store/prdDetails/actions'
export class PrdDetails extends Component {
  constructor (props) {
    super(props)
    this.doDescClick = this.doDescClick.bind(this)
    this.doIncreClick = this.doIncreClick.bind(this)
    this.changeHandle = this.changeHandle.bind(this)
    this.doTotalPrice = this.doTotalPrice.bind(this)
    this.mouseEnterHandle = this.mouseEnterHandle.bind(this)
    this.mouseLeaveHandle = this.mouseLeaveHandle.bind(this)
    this.scrollBotmClick = this.scrollBotmClick.bind(this)
    this.scrollTopClick = this.scrollTopClick.bind(this)
    this.doAddCartClick = this.doAddCartClick.bind(this)
    this.doAddCollectClick = this.doAddCollectClick.bind(this)
    this.state = {
    }
  }
  static propTypes = {
    match: PropTypes.object,
    dispatch: PropTypes.func,
    prdDetails: PropTypes.object,
    headerNums: PropTypes.object,
    classify: PropTypes.object
  }
  getBrandListByClassId (firstClassId, secondClassId, thirdClassId) {
    let brandList = []
    brandList.push({ name: '首页', href: '/' })
    let classifyList = this.props.classify && this.props.classify.list
    let firstBrand, secondBrand, thirdBrand
    if (firstClassId) {
      firstBrand = classifyList.filter(item => item.classId === firstClassId)[0]
      brandList.push({name: firstBrand.className, href: `/pages/prdList/${firstBrand.classId}`})
    }
    if (secondClassId) {
      secondBrand = firstBrand.subFrontClassifyTree.filter(item => item.classId === secondClassId)[0]
      brandList.push({name: secondBrand.className, href: `/pages/prdList/${firstBrand.classId}/${secondBrand.classId}`})
    }
    if (thirdClassId) {
      thirdBrand = secondBrand.subFrontClassifyTree.filter(item => item.classId === thirdClassId)[0]
      brandList.push({name: thirdBrand.className, href: `/pages/prdList/${firstBrand.classId}/${thirdBrand.classId}`})
    }
    return brandList
  }
  componentDidMount () {
    let prdCode = this.props.match.params.prdCode
    let { dispatch } = this.props
    let { firstClassId, secondClassId, thirdClassId } = this.props.prdDetails.prdInfo
    dispatch(fetchPrdDetails({ productCode: prdCode }))
    dispatch(updateBreadList(this.getBrandListByClassId(
      firstClassId,
      secondClassId,
      thirdClassId
    )))
  }
  doDescClick () { // 减事件
    let { dispatch } = this.props
    let { prcsCount } = this.props.prdDetails
    dispatch(doPrcsCountChangeClick(prcsCount > 1 ? prcsCount - 1 : 1))
  }
  doIncreClick () { // 加事件
    let { dispatch } = this.props
    let { prcsCount } = this.props.prdDetails
    dispatch(doPrcsCountChangeClick(prcsCount + 1))
  }
  changeHandle () { // 输入事件
    let { dispatch } = this.props
    if (Number(this.refs.iptVal.value)) {
      dispatch(doPrcsCountChangeClick(this.refs.iptVal.value))
    }
  }
  doAddCartClick () { // 添加购物车
    const { dispatch } = this.props
    const { cartNums } = this.props.headerNums
    let prdCode = this.props.match.params.prdCode
    ajax({
      url: '/los/2b-admin-front.addCar',
      data: {
        productCode: prdCode,
        productNum: this.refs.iptVal.value
      }
    }).then(res => {
      dispatch(updateHeadNums({
        cartNums: parseInt(cartNums) + parseInt(this.refs.iptVal.value)
      }))
    })
  }
  doAddCollectClick () { // 添加收藏
    const { dispatch } = this.props
    const { collectNums } = this.props.headerNums
    const { favorite } = this.props.prdDetails
    let prdCode = this.props.match.params.prdCode
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
      dispatch(updateParams({
        favorite: f
      }))
    })
  }
  mouseEnterHandle (e) { // 鼠标滑入事件
    let { dispatch } = this.props
    dispatch(updateCurrentIndex({ curImgIndex: e.target.id }))
  }
  mouseLeaveHandle () {

  }
  scrollBotmClick () { // 下翻事件
    let { dispatch } = this.props
    let { topImgIndex, botmImgIndex } = this.props.prdDetails
    if (topImgIndex < botmImgIndex - 5) {
      dispatch(doScrollArrow({
        topImgIndex: topImgIndex + 1,
        topArrDis: false,
        botmArrDis: (topImgIndex + 6 >= botmImgIndex)
      }))
    }
  }
  scrollTopClick () { // 上翻事件
    let { dispatch } = this.props
    let { topImgIndex } = this.props.prdDetails
    if (topImgIndex > 0) {
      dispatch(doScrollArrow({
        topImgIndex: topImgIndex - 1,
        botmArrDis: false,
        topArrDis: !(topImgIndex - 1)
      }))
    }
  }
  doTotalPrice () { // 总价函数
    let { prcsCount } = this.props.prdDetails
    let { price } = this.props.prdDetails.prdInfo
    return math.eval(prcsCount * price).toFixed(2)
  }
  render () {
    let { smlImgList, lagImgList, prdInfo, curImgIndex, topImgIndex,
      topArrDis, botmArrDis, prcsCount, favorite } = this.props.prdDetails
    let isFavorite = favorite === '1'
    return (
      <React.Fragment>
        <div className={style.prdDetBox}>
          <div className={style.PrdDetails}>
            <div className={style.prdBox}>
              <div className={style.bigImgBox}>
                <Img className={style.bigImg} src={smlImgList[curImgIndex] && smlImgList[curImgIndex].url} />
              </div>
              <div className={style.smlImgBox}>
                <div onClick={this.scrollTopClick}
                  className={topArrDis ? multStyle(style.prevArrow, style.disabled) : style.prevArrow} />
                <div className={style.scrollBox}>
                  {
                    smlImgList.map((img, index) => {
                      if (index >= topImgIndex && index < topImgIndex + 5) {
                        return (
                          <div className={parseInt(curImgIndex) === index ? multStyle(style.smlImgDiv, style.cur)
                            : style.smlImgDiv} key={index}>
                            <Img onMouseEnter={this.mouseEnterHandle} id={index}
                              onMouseLeave={this.mouseLeaveHandle} src={img.url} className={style.smlImg} />
                          </div>
                        )
                      }
                    })
                  }

                </div>
                <div onClick={this.scrollBotmClick}
                  className={botmArrDis ? multStyle(style.disabled, style.nextArrow) : style.nextArrow} />
              </div>
              <div className={multStyle(style.clearfix, style.dtlBox)}>
                <h4 className={style.prdInfoTitle}>
                  { prdInfo.productName }
                </h4>
                <div className={style.prdInfoBox}>
                  <div className={style.prdInfoPrice}>
                    <span className={style.label}>价格</span>
                    <span className={style.priceBox}>
                      <span className={style.red}>￥</span>
                      <span className={multStyle(style.red, style.prdInfoPriceNum)}>
                        {prdInfo.price ? parseFloat(prdInfo.price).toFixed(2) : ''}</span>
                    </span>
                  </div>
                  <div className={style.Spec}>
                    <span className={style.label}>规格</span>
                    <span className={style.prdInfoSpec}>{prdInfo.productSpec}</span>
                  </div>
                  <div className={style.prdBrand}>
                    <span className={style.label}>商品品牌</span>
                    <span className={style.prdInfoBrand}>{prdInfo.brandName}</span>
                  </div>
                </div>
                <div className={style.prcsBox}>
                  <div className={style.numBox}>
                    <span className={style.label}>采购量</span>
                    <span className={style.handleBox}>
                      <span className={style.desc} onClick={this.doDescClick}>-</span>
                      <input className={style.prcsCount} value={prcsCount} ref='iptVal'
                        onChange={this.changeHandle} />
                      <span className={style.incre} onClick={this.doIncreClick}>+</span>
                    </span>
                  </div>
                  <div className={style.totalPriceBox}>
                    <span className={style.label}>总价</span>
                    <span className={multStyle(style.red, style.totalPrice)}>￥{this.doTotalPrice()} </span>
                  </div>
                  <div className={style.buttonBox}>
                    <Button disabled={(prdInfo.status !== '1')} size='normal'
                      className={style['add-cart']} type='secondary'
                      onClick={this.doAddCartClick}>加入购物车</Button>
                    <Button disabled={(prdInfo.status !== '1')}
                      active={isFavorite}
                      className={style['add-collect']} icon='icon-start-collect-1'
                      onClick={this.doAddCollectClick}>{ isFavorite ? '取消收藏' : '加入收藏夹' }</Button>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div className={style.dtlDescBox}>
            <div className={style.descTitle}>
              <span className={style.titleText}>商品描述</span>
            </div>
            <div className={style.dtlDesc}>
              <p className={style.dtlBrand}>品牌 : {prdInfo.brandName}</p>
              <ul className={style.dtlOtherBox}>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品名称 : </span>
                  {prdInfo.productName}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品编码 : </span>
                  {prdInfo.productCode}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品重量 : </span>
                  {prdInfo.productWeight}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品产地 : </span>
                  {prdInfo.originPlace}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品单位 : </span>
                  {prdInfo.unit}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品规格 : </span>
                  {prdInfo.productSpec}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品长度 : </span>
                  {prdInfo.productLength}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品宽度 : </span>
                  {prdInfo.productWidth}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>商品高度 : </span>
                  {prdInfo.productHeight}
                </li>
                <li className={style.dtlLine}>
                  <span className={style.dtlLabel}>保质期 : </span>
                  {prdInfo.expirationDate}
                </li>
              </ul>
            </div>
            <div className={style.imgListBox}>
              {
                lagImgList.map(img => {
                  return (
                    <div className={style.lagImgBox} key={img.attachId}>
                      <Img src={img.url} className={style.lagImg} />
                    </div>)
                })
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}
const mapStateToProps = state => {
  return {
    prdDetails: state.prdDetails,
    headerNums: state.headerNums
  }
}

export default connect(
  mapStateToProps
)(PrdDetails)
