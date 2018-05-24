import React, { Component } from 'react'
import { GoodsItem } from '../../components/goodsItem'
import { Item } from '../../components/classifyNav'
import { multStyle } from '../../utils/common'
import ajax from '../../utils/ajax'
import style from './style.scss'
import { withIndexTemplate } from '../template'
export class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
      HeaderNums: {
        cartNums: 10,
        collectNums: 10
      },
      goodsList: []
    }
  }
  componentDidMount () {
    ajax({
      url: '/los/2b-admin-front.productPageList',
      method: 'POST',
      data: {
        pageNo: 1,
        pageSize: 10
      }
    }).then(res => {
      if (res && res.productInfoVOList) {
        this.setState({
          goodsList: res.productInfoVOList
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
                  return <GoodsItem goodsItem={goodsItem} key={goodsItem.productCode} />
                })
              }
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default withIndexTemplate(Home)
