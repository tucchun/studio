const env = process.env.RUN_IN

export const weAppNo = {
  prd: 'onemindretail_prd',
  uat: 'onemindretail',
  fvt: 'onemindretail',
  dev: 'onemindretail',
  local: 'onemindretail'
}[env]


export const appId = {
  prd: 'wxfe70c566b10be60d',
  uat: 'wx37b2a08e77577150',
  fvt: 'wx31e9f9a802302b06',
  dev: 'wx499f62117ec1ba28',
  local: 'wx499f62117ec1ba28'
}[env]

export const redirectUrl = {
  prd: location.origin + '/wx/we-was-base.requestWxAccessToken?weAppNo=' + weAppNo + '&backUrl=',
  uat: location.origin + '/ec/wx/we-was-base.requestWxAccessToken?weAppNo=' + weAppNo + '&backUrl=',
  fvt: location.origin + '/ec/wx/we-was-base.requestWxAccessToken?weAppNo=' + weAppNo + '&backUrl=',
  dev: location.origin + '/ec/wx/we-was-base.requestWxAccessToken?weAppNo=' + weAppNo + '&backUrl='
}[env]

const validUrlHash = [
  '#/goodsdetail/',
  '#/home/classify',
  '#/freescan',
  '#/activity/'
]

export function getRedirectUrl() {
  var hash = location.hash
  var isValidUrlHash = false
  for (var i = validUrlHash.length - 1; i >= 0; i--) {
    if (hash.startsWith(validUrlHash[i])) {
      isValidUrlHash = true
    }
  }
  return isValidUrlHash ? redirectUrl + encodeURIComponent(location.href) : redirectUrl + encodeURIComponent(location.origin + location.pathname)
}

export function saveShareInfo(shareInfo) {
  if (shareInfo) {
    sessionStorage.setItem('shareInfo', JSON.stringify(shareInfo))
  }
}

export function getShareInfo() {
  return JSON.parse(sessionStorage.getItem('shareInfo'))
}

export function configShareMenuAction(shareInfo) {
  if (!shareInfo) {
    let imgUrl = __RUN_IN_PRD__ ? location.origin + '/static/public/logo120x120.jpg' : location.origin + '/ec/static/public/logo120x120.jpg'
    shareInfo = {
      shareTitle: '万麦，一家有腔调但不贵的便利店',
      shareDesc: '小而美说的就是→',
      shareImgUrl: imgUrl
    }
  }
  
  wx.onMenuShareTimeline({
    title: shareInfo.shareTitle,
    link: shareInfo.shareLink || (location.origin + location.pathname),
    imgUrl: shareInfo.shareImgUrl,
    success: () => {
        // 用户确认分享后执行的回调函数
    },
    cancel: () => {
        // 用户取消分享后执行的回调函数
    }
  })
  wx.onMenuShareAppMessage({
    title: shareInfo.shareTitle,
    desc: shareInfo.shareDesc,
    link: shareInfo.shareLink || (location.origin + location.pathname),
    imgUrl: shareInfo.shareImgUrl,
    success: () => {
      // 用户确认分享后执行的回调函数
    },
    cancel: () => {
        // 用户取消分享后执行的回调函数
    }
  })
}
