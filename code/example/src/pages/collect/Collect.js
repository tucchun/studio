import React, { Component } from 'react'
import Breadcrumb from '../../components/breadcrumb'
import { GoodsItem } from '../../components/goodsItem'
import { withTemplate } from '../template'
import Unlogin from '../../components/middleware'
import { multStyle } from '../../utils/common'
import ajax from '../../utils/ajax'
import style from './style.scss'

export class Collect extends Component {
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
                  goodsList.map(item => (
                    <GoodsItem goodsItem={item} key={item.productCode} />
                  ))
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
