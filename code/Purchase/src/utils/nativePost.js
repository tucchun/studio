import { post, alertWithParamsAndCallback } from './NativeCalls'

export default function(url, data = {}, isEncrpyt = true, showLoading = false, isCustomHandleError = false) {
  console.log(`sending data ${JSON.stringify(data)} to url ${url}`)

  return new Promise((resolve, reject) => {
    post({
      url: `${url}?__t=${new Date().getTime()}`,
      params: data,
      showLoading: showLoading,
      isEncrpyt: isEncrpyt // debug: always false
    }, (response, responseCode, responseMsg) => {

      console.log(`response: ${response}, responseCode: ${responseCode}, responseMsg: ${responseMsg}`)

      if (responseCode) {
        if (!isCustomHandleError && !responseCode.startsWith('iOSNetworkError')) {
          alertWithParamsAndCallback({
            content: responseMsg
          })
        }
        reject({ responseCode, responseMsg })
      } else {
        try {
          response = JSON.parse(response)
        } catch (e) {
          console.log('接口返回数据解析失败', e)
          reject({ response, responseCode, responseMsg })
        }
        resolve(response)
      }
    })
  })
}