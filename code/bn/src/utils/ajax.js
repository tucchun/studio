import { md5 } from './security'
import { logger, error } from './logger'
import axios from 'axios'
import initialStore from '../store'
// import message from 'components/Toast'

// let _isEncrpyt
let _flag
let _showLoading
// let _isCustomHandleError
let _hide
let API_ROOT = `${location.protocol}//${location.host}`
if (!__RUN_IN_PRD__) {
  API_ROOT = `${location.protocol}//${location.host}/ec`
}
// DEV: API_ROOT = 'http://www.fvt.jushenghua.com/ec'
// FVT: API_ROOT = 'http://www.uat.jushenghua.com/ec'
// UAT: API_ROOT = 'http://qhsj.uat.jushenghua.com/ec'
if (location.host.match('localhost') || location.host.match('127.0.0.1')) {
  API_ROOT = 'http://qhsj.uat.jushenghua.com/ec'
}

let shths = (data) => md5(JSON.stringify(data))

// const checkResSummary = function (res, summary) {
//   const m = md5(res)
//   return summary === m
// }

axios.interceptors.request.use(config => {
  let data = config.data
  if (_showLoading) {
    // _hide = message.loading('')
  }

  if (!_flag) {
    error('不要直接引用utils/ajax模块，请使用this.props.ajax')
    throw new Error('不要直接引用utils/ajax模块，请使用this.props.ajax')
  }
  let url = config.url
  const fullUrl = (url.indexOf(API_ROOT) === -1) ? API_ROOT + url : url
  config.url = fullUrl
  data._channel_id = '03'
  if (initialStore.timestamp) {
    data.timestamp = initialStore.timestamp + new Date().getTime() - initialStore.localTimestamp
  } else {
    data.timestamp = new Date().getTime()
  }
  data._deviceId = initialStore.openid
  if (initialStore.accessToken) {
    data.accessToken = initialStore.accessToken
  }
  logger('===============请求接口开始===============\n')
  logger('请求接口：' + config.url + '\n')
  logger('参数：' + JSON.stringify(config.data) + '\n')
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
  logger('响应数据：' + JSON.stringify(response) + '\n')
  logger('===============请求接口结束===============\n')

  if (_showLoading) {
    // _hide()
  }

  if (!initialStore.timestamp) {
    initialStore.timestamp = parseInt(response.now)
    initialStore.localTimestamp = new Date().getTime()
  }

  if (response.responseCode === '000000') {
    return response.model
  } else {
    if (response.responseCode === 'session.not.exists') {
      // message.warn(response.responseMsg)
      location.reload()
      return
    }
    // if (!_isCustomHandleError) {
    // message.warn(response.responseMsg)
    // }
    return response
  }
}, error => {
  logger('响应失败：' + error + '\n')
  logger('===============请求接口结束===============\n')

  if (_showLoading) {
    // _hide()
  }

  return error.response
})

export default function (url, data = {}, config = {}, showLoading = true, flag) {
  // _isEncrpyt = isEncrpyt
  _flag = flag
  _showLoading = showLoading
  // _isCustomHandleError = isCustomHandleError
  let opts = {
    timeout: 10000,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json'
    },
    responseType: 'json',
    data,
    url,
    ...config
  }
  return axios(opts)
}

export const API_ROOT1 = API_ROOT
