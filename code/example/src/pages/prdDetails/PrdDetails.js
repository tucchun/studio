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
    this.scrollBotm = this.scrollBotm.bind(this)
    this.scrollTop = this.scrollTop.bind(this)
    this.doAddCart = this.doAddCart.bind(this)
    this.doAddCollect = this.doAddCollect.bind(this)
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
      curImgSrc: 'https://img14.360buyimg.com/n0/jfs/t5326/335/2442088867/75285/d768d6af/591ad13fN772df84b.jpg',
      topImgIndex: 0,
      botmImgIndex: 7,
      topArrDis: true,
      botmArrDis:false,
      smlImgList: [
        { imgSrc: 'https://img14.360buyimg.com/n0/jfs/t5326/335/2442088867/75285/d768d6af/591ad13fN772df84b.jpg' },
        { imgSrc: 'https://img10.360buyimg.com/n5/jfs/t5320/235/2315143320/88868/3aa55f4a/591ad13fNc7f83a3d.jpg.dpg' },
        { imgSrc: 'https://img10.360buyimg.com/n5/jfs/t5179/224/2421287818/75020/38c2c8ac/591ad140N84e7043b.jpg.dpg' },
        { imgSrc: 'https://img10.360buyimg.com/n5/jfs/t5341/177/2410072104/169272/159fe13b/591ad140Naf0c8122.jpg.dpg' },
        { imgSrc: 'https://img10.360buyimg.com/n5/jfs/t5173/260/2451026594/55068/a75d0bab/591ad141N25538629.jpg.dpg' },
        { imgSrc: 'https://img20.360buyimg.com/vc/jfs/t3187/239/5708393640/32682/3a611a87/587890ceNb2511638.jpg' },
        { imgSrc: '' }
      ],
      lagImgList:[
        { imgSrc: 'https://img20.360buyimg.com/vc/jfs/t9667/79/979944729/170490/c189fb30/59db1a92N2a369e4b.jpg' },
        { imgSrc: 'https://img20.360buyimg.com/vc/jfs/t3988/174/1453316097/170768/5f0ebd3c/587890c4Nb0c3534a.jpg' },
        { imgSrc: 'https://img20.360buyimg.com/vc/jfs/t4093/239/1434318159/170617/8efff54c/58789100Nb23e5676.jpg' }
      ],
      prdInfo:{ },
      prcsCount: 1 // 购买数量
    }
  }
  static propTypes = {
    context: PropTypes.object
  }

  componentWillMount () {
    let prdCode = location.href.split('code?=')[1]
    console.log(prdCode)
    ajax({
      url: '/los/2b-admin-front.getProductDetails',
      data: {
        productCode: prdCode
      }
    }).then(res => {
      // 成功回调
      console.log(res)
      let lagImgList = []
      let smlImgList = []
      this.setState({
        prdInfo: res
      })
    })
  }
  doDescClick () {
    this.setState({ prcsCount: this.state.prcsCount > 1 ? this.state.prcsCount - 1 : 1 })
  }
  doIncreClick () {
    this.setState({ prcsCount: this.state.prcsCount + 1 })
  }
  changeHandle () {
    if (Number(this.refs.iptVal.value)) {
      this.setState({ prcsCount: Number(this.refs.iptVal.value) })
    }
  }
  doAddCart () {
    this.props.context.header.toggleHeaderNumber({
      ...this.props.context.header.headerNums,
      cartNums: this.props.context.header.headerNums.cartNums + 1
    })
    ajax({
      url: '/los/2b-admin-front.addCar',
      data: {
        productCode: this.prdInfo.productCode,
        productNum: this.refs.iptVal.value
      }
    })
  }
  doAddCollect () {
    this.props.context.header.toggleHeaderNumber({
      ...this.props.context.header.headerNums,
      collectNums: this.props.context.header.headerNums.collectNums + 1
    })
    ajax({
      url: '/los/2b-admin-front.addOrCancelFavorite',
      data: {
        productCode: this.prdInfo.productCode
      }
    })
  }
  mouseEnterHandle (e) {
    this.setState({ curImgSrc: e.target.src })
  }
  mouseLeaveHandle () {

  }
  scrollBotm () {
    if (this.state.topImgIndex < this.state.botmImgIndex - 5) {
      this.setState({
        topImgIndex: this.state.topImgIndex + 1,
        topArrDis: false,
        botmArrDis: (this.state.topImgIndex + 6 >= this.state.botmImgIndex)
      })
    }
  }
  scrollTop () {
    if (this.state.topImgIndex > 0) {
      this.setState({
        topImgIndex: this.state.topImgIndex - 1,
        botmArrDis: false,
        topArrDis: !(this.state.topImgIndex - 1)
      })
    }
  }
  doTotalPrice () {
    return math.eval(this.state.prcsCount * this.state.prdInfo.productPrice).toFixed(2)
  }
  render () {
    let smlImgList = this.state.smlImgList
    let lagImgList = this.state.lagImgList
    let prdInfo = this.state.prdInfo
    let curImgSrc = this.state.curImgSrc
    let topImgIndex = this.state.topImgIndex
    let topArrDis = this.state.topArrDis
    let botmArrDis = this.state.botmArrDis
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
                <div onClick={this.scrollTop}
                  className={topArrDis ? multStyle(style.prevArrow, style.disabled) : style.prevArrow} />
                <div className={style.scrollBox}>
                  {
                    smlImgList.map((img, index) => {
                      if (index >= topImgIndex && index < topImgIndex + 5) {
                        return (
                          <div className={style.smlImgDiv} key={img.imgSrc}>
                            <img onMouseEnter={this.mouseEnterHandle}
                              onMouseLeave={this.mouseLeaveHandle} src={img.imgSrc} className={style.smlImg} />
                          </div>
                        )
                      }
                    })
                  }

                </div>
                <div onClick={this.scrollBotm}
                  className={botmArrDis ? multStyle(style.disabled, style.nextArrow) : style.nextArrow} />
              </div>
              <div className={multStyle(style.clearfix, style.dtlBox)}>
                <h4 className={style.prdInfoTitle}>
                  { prdInfo.title }
                </h4>
                <div className={style.prdInfoBox}>
                  <div className={style.prdInfoPrice}>
                    <span className={style.label}>价格</span>
                    <span className={style.priceBox}>
                      <span className={style.red}>￥</span>
                      <span className={multStyle(style.red, style.prdInfoPriceNum)}>{prdInfo.productPrice ? parseFloat(prdInfo.productPrice).toFixed(2) : '无'}</span>
                    </span>
                  </div>
                  <div className={style.Spec}>
                    <span className={style.label}>规格</span>
                    <span className={style.prdInfoSpec}>{prdInfo.spec}</span>
                  </div>
                  <div className={style.prdBrand}>
                    <span className={style.label}>商品品牌</span>
                    <span className={style.prdInfoBrand}>{prdInfo.prdBrand}</span>
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
                    <Button size='normal' className={style['add-cart']} type='secondary' onClick={this.doAddCart}>加入购物车</Button>
                    <Button className={style['add-collect']} icon='icon-start-collect-1' onClick={this.doAddCollect}>加入收藏夹</Button>
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
              <p className={style.dtlBrand}>品牌 :{prdInfo.prdBrand}</p>
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
                    <div className={style.lagImgBox} key={img.imgSrc}>
                      <img src={img.imgSrc} className={style.lagImg} />
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
