export function formatNumber (value) {
  if (value === undefined || value === null) {
    return ''
  }

  if (typeof value === 'number') {
    value = value + ''
  }

  const parts = value.split('.')

  let part1 = ''
  if (parts[0].length <= 3) {
    part1 = (parts[0] === '' ? '0' : parts[0])
  } else {
    let mod = parts[0].length % 3
    part1 = (mod === 0 ? '' : (parts[0].substring(0, mod)))
    for (let i = 0; i < Math.floor(parts[0].length / 3); i++) {
      if ((mod === 0) && (i === 0)) {
        part1 += parts[0].substring(mod + 3 * i, mod + 3 * i + 3)
      } else {
        part1 += ',' + parts[0].substring(mod + 3 * i, mod + 3 * i + 3)
      }
    }
  }

  const part2l = parts[1] || ''
  let part2 = part2l
  for (let i = 0; i < 2 - part2l.length; i++) {
    part2 += '0'
  }

  return part1 + '.' + part2
}

export function containSpecialChar(s) {
  var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
  if(pattern.test(s)) {
    return true;
  }
  return false;
}

export function containSpecialExpression (string) {
  for (let s of string) {
    var hs = s.charCodeAt(0)
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (s.length > 1) {
        var ls = s.charCodeAt(1)
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (s.length > 1) {
      var ls = s.charCodeAt(1)
      if (ls == 0x20e3) {
        return true
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return true
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030 || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b || hs == 0x2b50) {
        return true
      }
    }
    return false
  }
}

/**
 * 分享地址映射
 * @param {*} type 分享平台类型 如微信
 * @param {*} url  分享链接
 */
export function shareUrlMap (type, url) {
  return url.replace(/app_onemind\/app/, 'onemind/index')
}

/**
 * css模块化 多个class合并
 * @param 多个class
 */
export function multStyle () {
  return [...arguments].join(' ')
}
