import forge from 'node-forge'
import rsaEncrypt from 'utils/rsa'

export function md5 (data) {
  data = data || ''
  let md = forge.md.md5.create()
  md.update(data)
  return md.digest().toHex().toString()
}

export function genAesKey () {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const maxPos = chars.length

  let ret = ''
  for (let i = 0; i < 16; i++) {
    ret += chars.charAt(Math.floor(Math.random() * maxPos))
  }

  return ret
}

const FVT_UAT_RSA_PUBLIC_KEY_ENC_AES = 'DE4764EDBDD55EC6C55DFBFA2C1BBB09ADD083DE0EB3699AF6E71A4FB83AA5C337972AF1E6035B442A25E525DD42CA4AD2DC3DBA299B985CD0CCC26088A140955F300833CBBB96F9EA6B591BFD62E53B5D5BB7221B51A3F02B5FFDE862994C41C34D51CE28D9633457092AE5574C52F85C0BA2591A20169E62942B1025176A17'
const PRD_RSA_PUBLIC_KEY_ENC_AES = 'E97987EACC6ECAB9458870E70DB017AD7B13464D3E4C5DF902D15AB5B1A2DD70653F9580871C7BC67F508ADBE15A7D75C9766D7A26AE0858284E7E1A3FB831F4386522C3E079AB428A253832E2D621AC4660E86CFC810EB5984825CDA55290FB1F9F9D4D6D1A41A6F1C26BC8DA74AEBBDCD76BE1077761EDD7060091A8076F71'

export function rsaEnctryptASE (data) {
  console.log('__RUN_IN_PRD__: ', __RUN_IN_PRD__)
  return rsaEncrypt(data, __RUN_IN_PRD__ ? PRD_RSA_PUBLIC_KEY_ENC_AES : FVT_UAT_RSA_PUBLIC_KEY_ENC_AES)
}

export function rsaEnctryptPassword (data) {
  console.log('__IN_PRD_JENKINS__: ', __RUN_IN_PRD__)
  return rsaEncrypt(data, __RUN_IN_PRD__ ? PRD_RSA_PUBLIC_KEY_ENC_AES : FVT_UAT_RSA_PUBLIC_KEY_ENC_AES)
}


export function encPwd (pwd, timestamp) {
  console.log('pwd: ', pwd)
  console.log('timestamp: ', timestamp)
  if (typeof timestamp !== 'string') {
    timestamp += ''
  }

  function pad (num, n) {
    if ((num + '').length >= n) return num
    return pad('0' + num, n)
  }

  const _pwd = pad(timestamp.length, 2) + timestamp + pad(pwd.length, 2) + pwd
  return rsaEnctryptPassword(_pwd)
}
