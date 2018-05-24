import React from 'react'
import { render } from 'react-dom'
import APP from './pages/index'
import ajax from './utils/ajax'
import initialStore from './store'
import { clearCookie } from 'utils/utils'
import { genAesKey, encPwd, rsaEnctryptASE } from './utils/security'

// import Toast from './components/Widgets/Toast'

// re-build ajax method
// const ajax = (url, param, config) => fetch(url, param, {}, false, true, false)

// find root element
const MOUNT_ELEMENT = document.getElementById('root')

// define render method
let _render = (store = {}, key = null) => {
  // document.getElementById('loading').style.display = 'none'
  // MOUNT_ELEMENT.style.display = 'block'
  render(<APP initialStore={store} />, MOUNT_ELEMENT)
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = _render
  _render = () => {
    try {
      renderApp(initialStore, Math.random())
    } catch (error) {
      console.error(error)
    }
  }
  module.hot.accept(['./pages/index'], () => requestAnimationFrame(_render))
}

async function login () {
  //  初始信息
  // debugger
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
  k = genAesKey()
  const username = 'suzw001'
  const pwd = 'abcd1234'
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

  console.log(loginData)
}

// login()

// function orders () {
//   return ajax({
//     url: '/los/2b-admin-front.getOrderShopList',
//     data: {
//       endTime: '',
//       orderNo: '',
//       orderStatus: '',
//       pageNo: 1,
//       pageSize: 5,
//       recipientName: '',
//       startTime: ''
//     }
//   })
// }

// login().then(function () {
//   return orders()
// }).then((res) => {
//   console.log('/los/2b-admin-front.getOrderShopList', res)
// }).catch(err => {
//   console.log(err)
// })

_render()
