import React, { Component } from 'react'
import style from './style.scss'
import PropTypes from 'prop-types'
import { multStyle } from '../../utils/common'
// import PropTypes from 'prop-types'
import ajax from '../../utils/ajax'
import Breadcrumb from '../../components/breadcrumb'
import math from 'mathjs'
import { Button } from '../../components/form'
import { withTemplate } from '../template'
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
      HeaderNums: {
        cartNums: 10,
        collectNums: 10
      },
      breadList: [
        { name: '首页', href: '/' },
        { name: '清洁用品', href: '/#/prdList' },
        { name: '消毒用品', href: '/#/prdList' },
        { name: '消毒液', href: '/#/prdList' }
      ],
      curImgSrc: '', // 当前大图显示地址
      topImgIndex: 0, // 顶端图下标
      botmImgIndex: 5, // 最底端图下标
      topArrDis: true, // 上箭头是否不可用 默认不可用
      botmArrDis:false, // 下箭头是否不可用 默认可用
      smlImgList: [], // 小图列表
      lagImgList:[], // 详情大图列表
      prdInfo: {}, // 商品详情信息
      prcsCount: 1, // 购买数量
      prdCode: '' // 详情页商品代码
    }
  }
  static propTypes = {
    context: PropTypes.object,
    match: PropTypes.object
  }

  componentWillMount () {
    // let prdCode = location.href.split('')[1]
    let prdCode = this.props.match.params.prdCode
    this.setState({ prdCode: prdCode })
    ajax({
      url: '/los/2b-admin-front.getProductDetails',
      data: {
        productCode: prdCode
      }
    }).then(res => {
      // 成功回调
      let lagImgList = []
      let smlImgList = []
      let imgList = res.productAttaches
      lagImgList = imgList.filter(item => item.attachType === '09')
      lagImgList = (lagImgList) && lagImgList.sort((a, b) => a.attachOrder - b.attachOrder)
      smlImgList = imgList.filter(item => item.attachType === '01')
      console.log(smlImgList)
      console.log(lagImgList)
      this.setState({
        prdInfo: res,
        smlImgList: smlImgList,
        lagImgList: lagImgList,
        botmImgIndex: smlImgList.length,
        curImgSrc: smlImgList[0].url,
        botmArrDis: smlImgList.length <= 5
      })
    })
  }
  doDescClick () { // 减事件
    this.setState({ prcsCount: this.state.prcsCount > 1 ? this.state.prcsCount - 1 : 1 })
  }
  doIncreClick () { // 加事件
    this.setState({ prcsCount: this.state.prcsCount + 1 })
  }
  changeHandle () { // 输入事件
    if (Number(this.refs.iptVal.value)) {
      this.setState({ prcsCount: Number(this.refs.iptVal.value) })
    }
  }
  doAddCartClick () { // 添加购物车
    console.log(this.props.context)
    /* this.props.context.header.toggleHeaderNumber({
      ...this.props.context.header.headerNums,
      cartNums: this.props.context.header.headerNums.cartNums + 1
    }) */
    console.log(this.props.context)
    ajax({
      url: '/los/2b-admin-front.addCar',
      data: {
        productCode: this.state.prdCode,
        productNum: this.refs.iptVal.value
      }
    })
  }
  doAddCollectClick () { // 添加收藏
    /* this.props.context.header.toggleHeaderNumber({
      ...this.props.context.header.headerNums,
      collectNums: this.props.context.header.headerNums.collectNums + 1
    }) */
    ajax({
      url: '/los/2b-admin-front.addOrCancelFavorite',
      data: {
        productCode: this.state.prdCode
      }
    })
  }
  mouseEnterHandle (e) { // 鼠标滑入事件
    this.setState({ curImgSrc: e.target.src })
  }
  mouseLeaveHandle () {

  }
  scrollBotmClick () { // 上翻事件
    if (this.state.topImgIndex < this.state.botmImgIndex - 5) {
      this.setState({
        topImgIndex: this.state.topImgIndex + 1,
        topArrDis: false,
        botmArrDis: (this.state.topImgIndex + 6 >= this.state.botmImgIndex)
      })
    }
  }
  scrollTopClick () { // 下翻事件
    if (this.state.topImgIndex > 0) {
      this.setState({
        topImgIndex: this.state.topImgIndex - 1,
        botmArrDis: false,
        topArrDis: !(this.state.topImgIndex - 1)
      })
    }
  }
  doTotalPrice () { // 总价函数
    return math.eval(this.state.prcsCount * this.state.prdInfo.price).toFixed(2)
  }
  render () {
    let smlImgList = this.state.smlImgList
    let lagImgList = this.state.lagImgList
    let prdInfo = this.state.prdInfo
    let curImgSrc = this.state.curImgSrc
    let topImgIndex = this.state.topImgIndex
    let topArrDis = this.state.topArrDis
    let botmArrDis = this.state.botmArrDis
    console.log(prdInfo)
    return (
      <React.Fragment>
        <Breadcrumb breads={this.state.breadList} />
        <div className={style.prdDetBox}>
          <div className={style.PrdDetails}>
            <div className={style.prdBox}>
              <div className={style.bigImgBox}>
                <img className={style.bigImg} src={curImgSrc} />
              </div>
              <div className={style.smlImgBox}>
                <div onClick={this.scrollTopClick}
                  className={topArrDis ? multStyle(style.prevArrow, style.disabled) : style.prevArrow} />
                <div className={style.scrollBox}>
                  {
                    smlImgList.map((img, index) => {
                      if (index >= topImgIndex && index < topImgIndex + 5) {
                        return (
                          <div className={style.smlImgDiv} key={img.attachId}>
                            <img onMouseEnter={this.mouseEnterHandle}
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
                        {prdInfo.price ? parseFloat(prdInfo.price).toFixed(2) : '无'}</span>
                    </span>
                  </div>
                  <div className={style.Spec}>
                    <span className={style.label}>规格</span>
                    <span className={style.prdInfoSpec}>{prdInfo.spec}</span>
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
                      <input className={style.prcsCount} value={this.state.prcsCount} ref='iptVal'
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
                      className={style['add-collect']} icon='icon-start-collect-1'
                      onClick={this.doAddCollectClick}>加入收藏夹</Button>
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
                    <div className={style.lagImgBox} key={img.url}>
                      <img src={img.url} className={style.lagImg} />
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

export default withTemplate(PrdDetails)
