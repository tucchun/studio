import moment from 'moment'

export function renderDate (v) {
  return !v ? '' : moment(v).format("YYYY-MM-DD HH:mm:ss")
}

export function clearCookie () {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g);
  if (keys) {
    for (let i = keys.length; i >= 0; i--) {
      document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
    }
  }
}
/** number/string 得到显示的金额文本 ,unit 货币单位，默认￥ */
export function renderAmount (v, unit) {
  unit = unit || '￥'
  if (!v) {
    return '--'
  }
  if (typeof (v) === 'string') {
    let n = Number(v)
    if (isNaN(n)) {
      return v
    } else {
      v = n
    }
  }
  let text
  let negative = false
  if (typeof (v) === 'number') {
    // 是否负数
    negative = v < 0
    text = Math.abs(v).toFixed(2)
  } else {
    return '--'
  }
  return (negative ? '-' : '') + unit + text
}
