import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Breadcrumb from '../../components/breadcrumb'
import { GoodsItem } from '../../components/goodsItem'
import { withTemplate } from '../template'
import Unlogin from '../../components/middleware'
import { multStyle } from '../../utils/common'
import ajax from '../../utils/ajax'
import style from './style.scss'

export class Collect extends Component {
  static propTypes = {
    context: PropTypes.object,
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      goodsList: [],
      login: true,
      breadList: [
        { name: '首页', href: '#/' },
        { name: '收藏夹', href: '#/collect' }
      ]
    }
    this.doClick = this.doClick.bind(this)
    this.doLikeClick = this.doLikeClick.bind(this)
  }
  doClick (code) {
    this.props.history.push({
      pathname: `/prdDetails/${code}`
    })
  }
  doLikeClick (code) {
    console.log(this.props.context.header)
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
  componentDidMount () {
    const login = sessionStorage.getItem('loginData')
    if (login) {
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
    } else {
      this.setState({
        login: false
      })
    }
  }
  render () {
    const { goodsList, login } = this.state
    return (
      <React.Fragment>
        <Breadcrumb breads={this.state.breadList} />
        <div className={style.collect}>
          <div className={style.header}>
            <p>
              <i />
              我的收藏夹
            </p>
          </div>
          <div className={style['collect-container']}>
            {
              login ? <div className={multStyle(style['collect-content'], 'clearfix')}>
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
              </div> : <Unlogin />
            }

          </div>
        </div>
      </React.Fragment>
    )
  }
}
export default withTemplate(Collect)
