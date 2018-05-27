import { md5 } from './security'
import axios from 'axios'
let API_ROOT = `${location.protocol}//${location.host}`
if (!__RUN_IN_PRD__) {
  API_ROOT = `${location.protocol}//${location.host}/ec`
}
// DEV: API_ROOT = 'http://www.fvt.jushenghua.com/ec'
// FVT: API_ROOT = 'http://www.uat.jushenghua.com/ec'
// UAT: API_ROOT = 'http://qhsj.uat.jushenghua.com/ec'
if (location.host.match('localhost') || location.host.match('127.0.0.1')) {
  API_ROOT = 'http://www.fvt.jushenghua.com/ec'
}

let shths = (data) => md5(JSON.stringify(data))

axios.interceptors.request.use(config => {
  let data = config.data || {}
  let url = config.url
  const fullUrl = (url.indexOf(API_ROOT) === -1) ? API_ROOT + url : url
  config.url = fullUrl
  data._channel_id = '03'
  // if (initialStore.timestamp) {
  //   data.timestamp = initialStore.timestamp + new Date().getTime() - initialStore.localTimestamp
  // } else {
  data.timestamp = new Date().getTime()
  // }
  // data._deviceId = initialStore.openid
  // if (initialStore.accessToken) {
  //   data.accessToken = initialStore.accessToken
  // }
  if (__DEV__) {
    // logger('===============请求接口开始===============\n')
    // logger('请求接口：' + config.url + '\n')
    // logger('参数：' + JSON.stringify(config.data) + '\n')
  }

  config = {
    ...config,
    headers: {
      ...config.headers,
      shths: shths(data)
    }
  }
  config.data = data
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return new Promise((resolve, reject) => {
    if (__DEV__) {
      // logger('响应数据：' + JSON.stringify(response) + '\n')
      // logger('===============请求接口结束===============\n')
    }
  
    // if (!initialStore.timestamp) {
    //   initialStore.timestamp = parseInt(response.now)
    //   initialStore.localTimestamp = new Date().getTime()
    // }
    debugger
    if (response.status === 200) {
      const data = response.data || {}
      if (data.responseCode === '000000') {
        resolve(data.model)
      } else {
        if (data.responseCode === 'user.invalid') {
          // location.reload()
          // setTimeout(() => { HashRouter.replace('/login') }, 1000)
          import('history/createHashHistory').then(createhashHistory => {
            // createhashHistory.default().replace('/login')
            setTimeout(() => {
              createhashHistory.default().replace('/login')
            })
          })
          reject(data.responseCode)
        }
        reject(data)
      }
    } else {
      // error(response.statusText)
      reject(response.statusText)
    }
  })
}, error => {
  if (__DEV__) {
    // logger('响应失败：' + error + '\n')
    // logger('===============请求接口结束===============\n')
  }

  return new Error(error)
})

// 默认请求设置
const settings = {
  timeout: 10000,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Accept': 'application/json'
  },
  responseType: 'json'
}

export default function (url, data = {}, config = {}, options = {}) {
  let args = {}
  const argsNumber = arguments.length
  switch (argsNumber) {
    case 1:
      args = {
        ...settings,
        ...arguments[0]
      }
      break
    case 2:
      args = {
        ...settings,
        url: arguments[0],
        data: arguments[1]
      }
      break
    case 3:
      args = {
        url: arguments[0],
        data: arguments[1],
        ...{
          ...settings,
          ...arguments[2]
        }
      }
      break
  }
  return axios(args)
}

// export const API_ROOT1 = API_ROOT
