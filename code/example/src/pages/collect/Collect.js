import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { GoodsItem } from '../../components/goodsItem'
import { multStyle } from '../../utils/common'
import ajax from '../../utils/ajax'
import style from './style.scss'

import { connect } from 'react-redux'
import { updateBreadList } from '../../store/actions'
export class Collect extends Component {
  static propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      goodsList: []
    }
    this.doClick = this.doClick.bind(this)
    this.doLikeClick = this.doLikeClick.bind(this)
  }
  doClick (code) {
    this.props.history.push({
      pathname: `/pages/prdDetails/${code}`
    })
  }
  doLikeClick (code) {
    ajax({
      url: '/los/2b-admin-front.addOrCancelFavorite',
      data: {
        productCode: code
      }
    })
  }
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(updateBreadList([
      { name: '首页', href: '/' },
      { name: '收藏夹' }
    ]))
    ajax({
      url: '/los/2b-admin-front.queryCustFavoriteList',
      method: 'POST'
    }).then(res => {
      if (res && res.favoriteList) {
        this.setState({
          goodsList: res.favoriteList
        })
      }
    })
  }
  render () {
    const { goodsList } = this.state
    return (
      <React.Fragment>
        {/* <Breadcrumb breads={this.state.breadList} /> */}
        <div className={style.collect}>
          <div className={style.header}>
            <p>
              <i />
              我的收藏夹
            </p>
          </div>
          <div className={style['collect-container']}>
            <div className={multStyle(style['collect-content'], 'clearfix')}>
              {
                goodsList.map(item => {
                  return <GoodsItem
                    goodsItem={item}
                    key={item.productCode}
                    onClick={() => this.doClick(item.productCode)}
                    doLikeClick={() => this.doLikeClick(item.productCode)}
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
    orderLst: state.orderLst
  }
}
export default connect(
  mapStateToProps
)(Collect)
