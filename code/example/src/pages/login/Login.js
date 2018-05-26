import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import ajax from '../../utils/ajax'
import { multStyle } from '../../utils/common'
import { clearCookie } from '../../utils/utils'
import { genAesKey, encPwd, rsaEnctryptASE } from '../../utils/security'

// import Footer from '../../components/footer'
import { Input, Button } from '../../components/form'
import logo from '../../assets/icon/images/logo_white.png'
import style from './style.scss'
export default class Login extends Component {
  static propTypes = {
    location: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      userpwd: '',
      isRight: true,
      loginNotice: 'fail',
      loginData: '',
      redirectToReferrer: false // 是否重定向到之前的页面
    }
    this.login = this.login.bind(this)
  }
  validateForm () {
    return this.state.username.length > 0 && this.state.userpwd.length > 0
  }
  async login () {
    clearCookie()
    let k = genAesKey()
    let initData = await ajax({
      url: '/los/2b-admin-front.updateSession',
      data: {
        encFlag: 0,
        reqData: rsaEnctryptASE(k)
      }
    }).then((res) => {
      return {
        pwdTime: res.pwdTime,
        disabled: false,
        timeOfGettingWpdTime: new Date().getTime()
      }
    })
    // k = genAesKey()
    const username = this.state.username // 'suzw001'
    const pwd = this.state.userpwd // 'abcd1234'
    const timeDiff = new Date().getTime() - initData.timeOfGettingWpdTime
    const timeToSend = parseInt(initData.pwdTime) + timeDiff
    let loginData = await ajax({
      url: '/los/2b-admin-front.login',
      data: {
        encFlag: 0,
        loginName: username,
        loginPwd: encPwd(pwd, timeToSend),
        encKey: rsaEnctryptASE(k)
      }
    })

    if (!(loginData && loginData.responseCode)) {
      // success
      this.setState({
        redirectToReferrer: true,
        loginData: loginData
      })
      const loginFrom = {
        'nickName': `${loginData.custSimpleName}-${loginData.contact}`,
        'login': true
      }
      sessionStorage.setItem('loginData', JSON.stringify(loginFrom))
    } else {
      this.setState({
        isRight: false,
        loginNotice: loginData.responseMsg
      })
    }
  }
  render () {
    // from 保存跳转到登录页前的页面路径，用于在登陆成功之后重定向到原来的页面
    const { redirectToReferrer, isRight, username, userpwd, loginData, loginNotice } = this.state
    const { from } = this.props.location.state || { from: { ...loginData, pathname: '/' } }

    if (redirectToReferrer) return <Redirect to={from} /> // 登录成功 重定向页面
    return (
      <div className={style['login-container']}>
        <div className={style['login-bg']} />
        <div className={style['login-content']}>
          <img src={logo} alt='logo' />
          <div className={style['login-box']}>
            <h3>账号登录</h3>
            {
              isRight ? '' : <p className={style['login-notice']}>{loginNotice}</p>
            }
            <Input className={multStyle(style.username, isRight ? '' : style['login-err'])} type='text' placeholder='用户名' required value={username} onChange={({ value, name }) => {
              this.setState({ 'username': value })
            }} />
            <Input className={multStyle(style.userpwd, isRight ? '' : style['login-err'])} type='password' placeholder='密码' required value={userpwd} onChange={({ value, name }) => {
              this.setState({ 'userpwd': value })
            }} />
            <Button size='normal' className={style.login} type='primary' onClick={this.login} disabled={!this.validateForm()}>登录</Button>
          </div>
          <p className={style['login-foot']}>&copy; 2018 宝能零售</p>
        </div>
      </div>
    )
  }
}
