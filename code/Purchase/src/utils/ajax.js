import { md5 } from './security'
import $ from '$'
import initialStore from '../store'
import message from 'components/toast/Toast'
import nativePost from './nativePost'
import { isNATIVE } from './NativeCalls'

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

const buildCustomHeader = function (data = '') {
  if (data) {
    return {
      'headers': { 'shths': md5(JSON.stringify(data)) }
    }
  } else {
    return {}
  }
}

const checkResSummary = function (res, summary) {
  const m = md5(res)
  return summary === m
}

export default function (url, data = {}, isEncrpyt = true, flag, showLoading=false, isCustomHandleError=false) {

  if (isNATIVE) {
    return nativePost(url, data, isEncrpyt, showLoading, isCustomHandleError)
  }

  let hide
  if (showLoading) {
    hide = message.loading('')
  }

  if (!flag) {
    console.error('不要直接引用utils/ajax模块，请使用this.props.ajax')
    throw new Error('不要直接引用utils/ajax模块，请使用this.props.ajax')
  }

  const fullUrl = (url.indexOf(API_ROOT) === -1) ? API_ROOT + url : url

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

  return new Promise((resolve, reject) => {

    const success = (response, textStatus, jqXHR) => {
      // if (!checkResSummary(jqXHR.responseText, jqXHR.getResponseHeader('shths'))) {
      //   reject(response)
      // }

      if (showLoading) {
        hide()
      }

      if (!initialStore.timestamp) {
        initialStore.timestamp = parseInt(response.now)
        initialStore.localTimestamp = new Date().getTime()
      }

      if (response.responseCode === '000000') {
        resolve(response.model)
      } else {
        if (response.responseCode === 'session.not.exists') {
          message.warn(response.responseMsg)
          location.reload()
          return
        }
        if (!isCustomHandleError) {
          message.warn(response.responseMsg)
        }
        reject(response)
      }
    }

    const error = (response, textStatus, jqXHR) => {

      if (showLoading) {
        hide()
      }

      reject(response)
    }

    const opts = Object.assign({
      url: fullUrl,
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(data),
      success: success,
      error: error
    }, buildCustomHeader(data))

    $.ajax(opts)
  })
}

export const API_ROOT1 = API_ROOT
