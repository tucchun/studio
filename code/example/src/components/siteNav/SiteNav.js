import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { multStyle } from '../../utils/common'
import ajax from '../../utils/ajax'
import { Button } from '../form/index'
import style from './style.scss'
export default class Index extends Component {
  constructor (props) {
    super(props)
    this.state = {
      nickName: '',
      login: false
    }
    this.logout = this.logout.bind(this)
  }
  logout () {
    const that = this
    ajax({
      url: '/los/2b-admin-front.logout'
    }).then(res => {
      if (!(res && res.responseCode)) {
        sessionStorage.clear()
        that.setState({
          login: false
        })
      }
    })
  }
  componentDidMount () {
    let loginData = sessionStorage.getItem('loginData')
    if (loginData) {
      loginData = JSON.parse(loginData)
      this.setState({
        nickName: `${loginData.custSimpleName}-${loginData.contact}`,
        login: true
      })
    }
  }
  render () {
    const { nickName, login } = this.state
    return (
      <div className={style['site-nav']}>
        <div className={multStyle(style.inner, 'clearfix')}>
          <div className={'pull-left'}>
            <div className={style.info}>
              <p>宝能零售客服电话0755-11111111（工作日8：30-18：00）</p>
            </div>
          </div>
          <div className={'pull-right'}>
            {
              login ? <div className={style.user}>
                <span>{nickName}</span>
                <Link
                  to={{ pathname: '/orders', hash: '#' }}
                >
                  <Button icon='icon-order' className={style['w40']} type='primary' >订单管理</Button>
                </Link>
                <Button icon='icon-sign-out' onClick={this.logout} className={style['w40']} type='primary' >退出</Button>
              </div> : ''
            }
          </div>
        </div>
      </div>
    )
  }
}
