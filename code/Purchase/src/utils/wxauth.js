import initialStore from '../store'
import { parse } from 'url'
import base64 from './base64'

let authorize = sessionStorage.getItem('authorize')
if (window.location.host.match('localhost')) {
  authorize = true
}

export const getParams = () => {
  var wxInfo = JSON.parse(sessionStorage.getItem('wxInfo'))
  if (!wxInfo || !Object.keys(wxInfo).length) {
    wxInfo = parse(location.href, true).query
    sessionStorage.setItem('wxInfo', JSON.stringify(wxInfo))
  }

  for (let i in wxInfo) {
    if (i == 'nickName') {
      initialStore[i] = base64.decode(decodeURIComponent(wxInfo[i].split('#')[0]))
    } else {
      initialStore[i] = wxInfo[i]
    }
  }
}

export default function wxauth(appId, redirectUrl) {
  sessionStorage.setItem('authorize', 'auth')
  if (!authorize) {
    location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${encodeURIComponent(redirectUrl)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
  } else {
    getParams()
    return true
    // if (getParams()) {
    //   return true
    // } else {
    //   history.back()
    // }
  }
  return false
}
