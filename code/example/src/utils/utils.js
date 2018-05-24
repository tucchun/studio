import moment from 'moment'

export function renderDate (v) {
  return !v ? '' : moment(v).format('YYYY-MM-DD HH:mm:ss')
}

export function clearCookie () {
  const keys = document.cookie.match(/[^ =;]+(?=\=)/g)
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

// 加
function floatAdd (arg1, arg2) {
  var r1, r2, m    
  try { r1 = arg1.toString().split('.')[1].length }catch (e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch(e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))    
  return (arg1 * m + arg2 * m) / m    
}

// 减
function floatSub (arg1, arg2) {
  var r1, r2, m, n    
 try { r1 = arg1.toString().split('.')[1].length } catch(e) { r1 = 0 }
  try { r2 = arg2.toString().split('.')[1].length } catch(e) { r2 = 0 }
  m = Math.pow(10, Math.max(r1, r2))    
 //动态控制精度长度    
 n = (r1 >= r2) ? r1:r2    
 return ((arg1 * m - arg2 * m) / m).toFixed(n)    
}

// 乘
function floatMul (arg1, arg2) {
  var m = 0, s1 = arg1.toString(), s2 = arg2.toString()     
 try { m += s1.split('.')[1].length }catch (e) {}
  try { m += s2.split('.')[1].length } catch(e) {}
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)     
}


// 除
function floatDiv (arg1, arg2) {
  var t1 = 0, t2 = 0, r1, r2     
   try { t1 = arg1.toString().split('.')[1].length } catch(e) {}
  try { t2 = arg2.toString().split('.')[1].length } catch(e) {}

  r1 = Number(arg1.toString().replace('.', ''))  

   r2 = Number(arg2.toString().replace('.', ''))     
   return (r1 / r2) * Math.pow(10, t2 - t1)     
}
