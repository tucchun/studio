import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoodsItem } from '../../components/goodsItem'
import { Item } from '../../components/classifyNav'
import { multStyle } from '../../utils/common'
import ajax from '../../utils/ajax'
import style from './style.scss'
import { connect } from 'react-redux'
import { fetchClissifyTree } from '../../store/actions'
export class Home extends Component {
  static propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func,
    classify: PropTypes.any
  }
  constructor (props) {
    super(props)
    this.state = {
      goodsList: []
    }
    this.goodsClick = this.goodsClick.bind(this)
    this.doLikeClick = this.doLikeClick.bind(this)
    this.doClick = this.doClick.bind(this)
  }
  goodsClick (code) {
    this.props.history.push({
      pathname: `/pages/prdDetails/${code}`
    })
  }
  doClick () {
    this.props.history.push('/pages/prdList')
  }
  doLikeClick (code) {
    ajax({
      url: '/los/2b-admin-front.addOrCancelFavorite',
      data: {
        productCode: code
      }
    })
  }
  componentWillUnmount () {
    this.setState = (state, callback) => {
      //
    }
  }

  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchClissifyTree())
    ajax({
      url: '/los/2b-admin-front.productPageList',
      method: 'POST',
      data: {
        pageNo: 0,
        pageSize: 10
      }
    }).then(res => {
      if (res && res.list) {
        this.setState({
          goodsList: res.list
        })
      }
    })
  }
  render () {
    const goodsList = this.state.goodsList
    const { classify } = this.props
    return (
      <React.Fragment>
        <div className={style.banner}>
          <div className={style['banner-bg']} />
          <div className={style['banner-content']}>
            {/* 分类导航 */}
            <div className={style['classify-nav']} >
              <div className={style.title} onClick={this.doClick}>
                <i className={style['title-icon']} />
                <h3>全部分类</h3>
              </div>
              <Item className={style.classify} style={{ display: 'block' }} itemList={classify.list} />
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
    header: state.collects,
    classify: state.classify
  }
}
export default connect(
  mapStateToProps
)(Home)
