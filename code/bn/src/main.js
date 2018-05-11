import React from 'react'
import { render } from 'react-dom'
import APP from './pages/Index'
import fetch from './utils/ajax'
import initialStore from './store'
import { appId } from './utils/config'

// import Toast from './components/Widgets/Toast'

// re-build ajax method
const ajax = (url, param) => fetch(url, param, {}, false, true, false)

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
  module.hot.accept(['./pages/Index'], () => requestAnimationFrame(_render))
}

/**
 * initialize the page, such as weixin auth, get common data via ajax
 * must return a Promise
 *
 * @return {Promise} the promise contain all initial data
 */

function initializePage () {
  var startTime = new Date().getTime()
  var initTime = startTime
  console.log('init start', startTime)
  if (__DEV__) {
    // if (!sessionStorage.getItem('firstRender')) {
    //   document.getElementById('loading').style.display = 'block'
    //   sessionStorage.setItem('firstRender', 'rendered')
    // }
    if (__DEV__) {
      // dev:ojvjkt2FtCJRaRKgDp-dzzLsD6F4
      // fvt:oMBo2wHOhkMDOdJRHqU616Rosc3A oMBo2wIRhbzcuHqfAPLe4gaYoZZ4 uat:okge4vxKGy0_Z07xuy_4aWZrwzvo
      initialStore.openid = 'okge4vxKGy0_Z07xuy_4aWZrwzvo'
      initialStore.unionid = 'o8rAp0y0_4TanjUkgrs2kCgA-irg:1'
      initialStore.headImgUrl = 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJoG7YWJ0WsYjhIeDUl9PzVyDZ8zGWictgbLH03vLsWdkhDxmWChO4JHUx1NTFyKic7X14ZVLA3hpug/0'
      initialStore.nickName = '测试'
    }
    ajax('/los/intf-login.authLogin', {
      appId: appId,
      openId: initialStore.openid,
      unionId: initialStore.unionid,
      thirdType: '00'
    }).then(res => {
      const currentTime = new Date().getTime()
      console.log('start render page', currentTime, 'time cost', currentTime - initTime)
      console.log('config end initialStore: ', Object.assign({}, initialStore))
      _render(initialStore)
    }).catch(err => {
      // Toast('登陆失败')
      console.error(err)
    })
  }
}

initializePage()
