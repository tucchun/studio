import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { multStyle } from '../../utils/common'
import { Button } from '../form/index'
import style from './style.scss'
export default class SiteNav extends Component {
  constructor (props) {
    super(props)
    this.doClick = this.doClick.bind(this)
  }
  logout () {

  }
  doClick () {
    this.props.onLogout()
  }
  componentDidMount () {
  }
  render () {
    let { nickName, login } = this.props
    return (
      <div className={style['site-nav']}>
        <div className={multStyle(style.inner, 'clearfix')}>
          <div className={'pull-left'}>
            <div className={style.info}>
              <p>宝能零售客服电话0755-11111111（工作日8：30-18：00）</p>
            </div>
          </div>
          <div className={'pull-right'} data-name={nickName}>
            {
              login ? <div className={style.user}>
                <span>{nickName}</span>
                <Link
                  to={{ pathname: '/pages/orders', hash: '#' }}
                >
                  <Button icon='icon-order' className={style['w40']} type='primary' >订单管理</Button>
                </Link>
                <Button icon='icon-sign-out' onClick={this.doClick} className={style['w40']} type='primary' >退出</Button>
              </div> : ''
            }
          </div>
        </div>
      </div>
    )
  }
}
SiteNav.propTypes = {
  nickName: PropTypes.string,
  login: PropTypes.bool,
  onLogout: PropTypes.func
}
