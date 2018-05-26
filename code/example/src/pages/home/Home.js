import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoodsItem } from '../../components/goodsItem'
import { Item } from '../../components/classifyNav'
import { multStyle } from '../../utils/common'
import ajax from '../../utils/ajax'
import style from './style.scss'
import { connect } from 'react-redux'
export class Home extends Component {
  static propTypes = {
    context: PropTypes.object,
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      goodsList: []
    }
    this.goodsClick = this.goodsClick.bind(this)
    this.doLikeClick = this.doLikeClick.bind(this)
  }
  goodsClick (code) {
    this.props.history.push({
      pathname: `/prdDetails/${code}`
    })
  }
  doLikeClick (code) {
    this.props.context.header.toggleHeaderNumber({
      ...this.props.context.header.headerNums,
      collectNums: this.props.context.header.headerNums.collectNums + 1
    })
    ajax({
      url: '/los/2b-admin-front.addOrCancelFavorite',
      data: {
        productCode: code
      }
    })
    return false
  }
  componentWillUnmount () {
    this.setState = (state, callback) => {
      //
    }
  }

  componentDidMount () {
    ajax({
      url: '/los/2b-admin-front.productPageList',
      method: 'POST',
      data: {
        pageNo: 0,
        pageSize: 10
      }
    }).then(res => {
      console.log(res)
      if (res && res.list) {
        this.setState({
          goodsList: res.list
        })
      }
    })
  }
  render () {
    const goodsList = this.state.goodsList
    return (
      <React.Fragment>
        <div className={style.banner}>
          <div className={style['banner-bg']} />
          <div className={style['banner-content']}>
            {/* 分类导航 */}
            <div className={style['classify-nav']}>
              <div className={style.title}>
                <i className={style['title-icon']} />
                <h3>全部分类</h3>
              </div>
              <Item className={style.classify} style={{ display: 'block' }} />
            </div>
          </div>
        </div>
        {/* 最新上线商品 */}
        <div className={style['new-goods']}>
          <div className={style['goods-container']}>
            <div className={style['new-goods-header']}>
              <h2>最新上线</h2>
              <p>- NEW -</p>
            </div>
            <div className={multStyle(style['goods-content'], 'clearfix')}>
              {
                goodsList.map(goodsItem => {
                  return <GoodsItem
                    goodsItem={goodsItem}
                    key={goodsItem.productCode}
                    onClick={() => this.goodsClick(goodsItem.productCode)}
                    collection={() => this.doLikeClick(goodsItem.productCode)}
                  />
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
    header: state.collects
  }
}
export default connect(
  mapStateToProps
)(Home)
