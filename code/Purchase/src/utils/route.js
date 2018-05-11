import { route as reactRoute } from 'preact-router'
import { isNATIVE, gotoPageAndCallback, login } from './NativeCalls'

export function route(url, replace=false, callback) {
  if (isNATIVE) {
    if (url === '/home/shopcart') {
      gotoPageAndCallback({
        pageID: 'shopcart'
      })
      return
    }
    if (url === '/mobielogin') {
      login(() => {
        callback && callback()
      })
      return
    }
    if (url === '/home/index') {
      gotoPageAndCallback({
        pageID: 'home'
      })
      return
    }
  }

  reactRoute(url, replace)
}