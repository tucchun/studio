/* @flow */
const UA = navigator.userAgent.toUpperCase()
const toString = Object.prototype.toString

window.BNRETAILHTML = {
  _handlers: {},
  nativeCallBack: (methodName, ...rest) => {
    const callback = window.BNRETAILHTML._handlers[methodName]
    if (toString.call(callback) === '[object Function]') {
      callback.apply(window, rest)
    }
  }
}

const nativeApp: boolean = UA.indexOf('BNRETAIL_NATIVE') > -1
export const isNATIVE: boolean = !location.host.match('localhost') && nativeApp

const call = function (methodName, ...args) {
  const _args = args.map((arg, index) => {
    if (typeof arg === 'undefined' || toString.call(arg) === '[object Null]') {
      return ''
    }
    if (toString.call(arg) === '[object Function]') {
      const time = new Date().getTime()
      const callback = methodName + '_' + time + '_' + index
      window.BNRETAILHTML._handlers[callback] = arg
      return callback
    }

    return arg
  });

  (function checkNative (i) {
    if (i > 20) {
      console.error('Failed to load window.BNRETAILNA Object after 20 times retry')
      return
    }

    if (!window.BNRETAILNA) {
      console.log('wait for window.BNRETAILNA')
      setTimeout(() => checkNative(i + 1), 100 * i)
    } else {
      try {
        if (isNATIVE) {
          if (!window.BNRETAILNA[methodName]) {
            console.error(`${methodName} does not exists in window.BNRETAILNA!`)
          } else {
            window.BNRETAILNA[methodName].apply(window.BNRETAILNA, _args)
          }
        }
      } catch (e) {
        console.error(e)
      }
    }
  })(1)
}

export function loadingBegin (): void {
  if (isNATIVE) {
    call('loadingBegin')
  }
}

/*
 * 打开alert对话框
 *
 * @param params, object
 * {
 *   content:
 *   title
 *   leftButton: 如果只有一个按钮，就只传left
 *   rightButton
 * }
 */
type alertWithParamsParams = {
  content: string,
  title: string,
  leftButton: string,
  rightButton: string
}
export function alertWithParamsAndCallback (params: alertWithParamsParams, callback: Function): void {
  if (isNATIVE) {
    call('alertWithParamsAndCallback', JSON.stringify(params), callback)
  }
}

/*
 * 设置navBar的标题和按键
 * param: {
 *   title
 *   rightBtnList: [
 *     {
 *       title:
 *       id:
 *     }
 *     ...
 *   ],
 *  leftBtnStyle: true/false,
 *  navBarColor: 'clear'//透明
 * }
 *
 * callback: function(btnId) {leftBtn/...}
 */
type setNavBarStyleParams = {
  title: string,
  leftBtnStyle?: string,
  rightButtonStyle?: {name: string, imageUrl: string},
  navBarStyle?: string
}
type setNavBarStyleCallback = (btnId: string) => void
export function setNavBarStyle (params: setNavBarStyleParams, callback?: setNavBarStyleCallback) {
  if (isNATIVE) {
    call('setNavStyleAndCallback', JSON.stringify(params), callback)
  }
}

// 头部阴影遮罩
export function toggleMaskViewOnNavbar (params: string): void {
  if (isNATIVE) {
    call('toggleMaskViewOnNavbar', params)
  }
}

/*
 * 发接口
 *
 * params: {
 *   url:  full path
 *   param: {}
 *   isEncrpyt: true/false
 */
type postParams = {
  url: string,
  param?: Object,
  isEncrpyt: boolean
}
type postCallback = (response: string, responseCode?: string, responseMsg?: string) => any
export function post (params: postParams, callback: postCallback): void {
  if (isNATIVE) {
    call('postRequestAndCallback', JSON.stringify(params), callback)
  }
}

export function makeToast (message: string): void {
  if (isNATIVE) {
    call('makeToast', message)
  }
}

/*
 * 跳转到一个native 页面
 *
 * @param params {
 *    pageID: string 页面地址,
 *    params: {} 其他数据
 * }
 *
 * callback (ret: object)
 * ret: {
 *
 * }
 */
export function gotoPageAndCallback (params: Object, callback: Function): void {
  if (isNATIVE) {
    call('gotoPageAndCallback', JSON.stringify(params), callback)
  }
}

/*
 * 显示，隐藏loading layout
 */
export function showWaitView (showOrHide: boolean): void {
  if (isNATIVE) {
    call('showWaitView', showOrHide ? '1' : '0')
  }
}

/**
 * 检查是否登陆，0为未登陆，1为登陆
 */
type checkLoginCallback = (status: '0'|'1') => any
export function checkLogin (callback: checkLoginCallback): void {
  if (isNATIVE) {
    call('checkLogin', callback)
  } else {
    callback('1')
  }
}

/**
 * 登陆
 */
export function login (callback: Function): void {
  if (isNATIVE) {
    call('login', callback)
  }
}

/**
 * 分享
 * picture: 缩略图url
 * title：分享标题
 * content：分享描述
 * url：分享跳转链接
 * needStoreNo：Y - 代表需要在url后面添加当前门店信息 空 - 代表不需要
 */
export function share (params: Object, callback: Function): void {
  if (isNATIVE) {
    call('shareAndCallback', JSON.stringify(params), callback)
  }
}

/**
 * 关闭webView
 */
export function closeWebView (): void {
  if (isNATIVE) {
    call('closeWebView')
  }
}

/**
 * 拨打电话
 *
 * phoneNo：string
 */
export function makeCall (phoneNo: string): void {
  if (isNATIVE) {
    call('makeCall', phoneNo)
  }
}

/**
 * 获取initialStore
 */
type initStoreCallback = (store: string) => any
export function initStore (callback: initStoreCallback): void {
  if (isNATIVE) {
    call('initStore', callback)
  }
}

/**
 * 更新store
 *
 */
export function updateStore (params: Object): void {
  if (isNATIVE) {
    call('updateStore', JSON.stringify(params))
  }
}

/**
 * native支付
 */
export function payByNative (params: Object, callback: Function): void {
  if (isNATIVE) {
    call('payByNativeAndCallback', JSON.stringify(params), callback)
  }
}

/**
 * 获取地理位置
 */
type getLocationCallback = (location: Object, error: string) => any
export function getLocation (type:string, callback: getLocationCallback): void {
  if (isNATIVE) {
    call('getLocationAndCallback', type, callback)
  }
}
