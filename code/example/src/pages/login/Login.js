import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ajax from '../../utils/ajax'
import { multStyle } from '../../utils/common'
import { clearCookie } from '../../utils/utils'
import { genAesKey, encPwd, rsaEnctryptASE } from '../../utils/security'
import { connect } from 'react-redux'
import { authName } from '../../store/actions'
// import Footer from '../../components/footer'
import { Input, Button } from '../../components/form'
import logo from '../../assets/icon/images/logo_white.png'
import style from './style.scss'
export class Login extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    history: PropTypes.object
  }
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      userpwd: '',
      isRight: true,
      loginNotice: 'fail',
      loginData: ''
    }
    this.login = this.login.bind(this)
  }
  validateForm () {
    return this.state.username.length > 0 && this.state.userpwd.length > 0
  }
  async login () {
    const { dispatch } = this.props
    const pathto = sessionStorage.getItem('from') || '/'
    if (!(this.state.username.length > 0 && this.state.userpwd.length > 0)) return
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
    await ajax({
      url: '/los/2b-admin-front.login',
      data: {
        encFlag: 0,
        loginName: username,
        loginPwd: encPwd(pwd, timeToSend),
        encKey: rsaEnctryptASE(k)
      }
    }).then(res => {
      dispatch(authName({
        nickName: `${res.custSimpleName}-${res.contact}`,
        login: true
      }))
      const loginFrom = {
        'nickName': `${res.custSimpleName}-${res.contact}`,
        'login': true
      }
      sessionStorage.setItem('loginData', JSON.stringify(loginFrom))
      // localStorage.setItem('loginData', JSON.stringify(loginFrom))
      this.props.history.push({ pathname: pathto }) // 登陆成功之后重定向到原来的页面
    }).catch(err => {
      this.setState({
        isRight: false,
        loginNotice: err.responseMsg
      })
    })
  }
  render () {
    const { isRight, username, userpwd, loginNotice } = this.state
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
            <Button size='normal' className={style.login} type='primary' onClick={this.login} >登录</Button>
          </div>
          <p className={style['login-foot']}>&copy; 2018 宝能零售</p>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    authList: state.authList
  }
}
export default connect(
  mapStateToProps
)(Login)
