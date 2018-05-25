import forge from 'node-forge'
import rsaEncrypt from 'utils/rsa'
import CryptoJS from 'CryptoJS'
// import NodeRSA from 'node-rsa'

export function md5 (data) {
  data = data || ''
  let md = forge.md.md5.create()
  md.update(data)
  return md.digest().toHex().toString()
}

export function aesEnc (data, key) {
  //
  // // const cipher = crypto.createCipheriv(algorithm, key, iv)
  // // let crypted = cipher.update(data, 'utf8', 'binary')
  // // crypted += cipher.final('binary')
  // crypted = new Buffer(crypted, 'binary').toString('base64')
  // return crypted
  const _key = CryptoJS.enc.Utf8.parse(key)
  const iv = CryptoJS.enc.Utf8.parse(key)

  return CryptoJS.AES.encrypt(data, _key, {
    mode: CryptoJS.mode.ECB,
    iv: iv
  }).toString()
}

export function aesDec (encData, key) {
  const _key = CryptoJS.enc.Utf8.parse(key)
  const iv = CryptoJS.enc.Utf8.parse(key)

  console.log(aesEnc('aaaaaa', 'aaaaaaaaaaaaaaaa'))

  return CryptoJS.AES.decrypt(encData, _key, {
    iv: iv,
    mode: CryptoJS.mode.ECB
  }).toString(CryptoJS.enc.Utf8)
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

// const rsaAESPublicKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA57U0CC3ZqD5uufBtAZ/QgWhAn20npjUnMrLw7SVnpPPPezgbHgFyhD1G2aIrbqmf+BxPRXElfns86gvliKUcHqj3gcAZySNpnvRTZcG1pAgajIbkl5UJdfzdfHYkjqUlyvYBtY8r5IKLX0CVF+iel21hrkC4RjxmOqDJao0lhC2D8fKlYc+jzPI/Kh0oSUGJ0Co3mdyEdmmi0pyFo0jI8CURA3GqRUxboJVX+x81rx1CVJiRyfI4ncphhCZQTGNmwrh0li1u2r85HGb8SbhtzcK5bjUKkJUharn7biv8UrZpujAGqG8q8rroQQ3TnY0cLlnFyGi3Emr7BedF3CbvTQIDAQAB'
// 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC7jlJH45MUjm/xLECfkH0hEEU8+/hAXKnVlYmZPTqpRzRmv1Qw9NilLy+7yD7Y3WKtYswj4E5Y80tgx/Wj8I+0kC5F+WicTVZEn2T/3WU4ncZ0zRUwzY51Y0kx43Gbu3QnTxHm9hvd+fqVlM0bWEzdne4bSWo+WY66Mpg1pzLBywIDAQAB'
// const rsaPwdPublicKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDK6Arv2WOLjc+D6c0a6B2PZFVpLi0XZ70Tbr/AWVYgwb2GN06wkPSu/LPJGAZpWFE0xKEjPym1RhL07FTN8oqpyneaMhU1VtcZ2abGY4oNXJD9X66rpnzaKbCGJryce6RI2FXXnviAvvYrC5ZmY7NFeaFcNqFnnWJeaPgm/fUQ3QIDAQAB'

const FVT_UAT_RSA_PUBLIC_KEY_ENC_AES = 'DE4764EDBDD55EC6C55DFBFA2C1BBB09ADD083DE0EB3699AF6E71A4FB83AA5C337972AF1E6035B442A25E525DD42CA4AD2DC3DBA299B985CD0CCC26088A140955F300833CBBB96F9EA6B591BFD62E53B5D5BB7221B51A3F02B5FFDE862994C41C34D51CE28D9633457092AE5574C52F85C0BA2591A20169E62942B1025176A17'
// const FVT_UAT_RSA_PUBLIC_KEY_ENC_PASSWD = '3CBE3815908400E4940C3F46DCE3590512994D73C428067C1160B74C84895C12D23193C019165600E48F3410C60785F704A3F52F630B25628D1C20CD60208C042D7947F1125740952C23D3F10604110404FC700D4764146536412BDE8063934CE4E60803F4025D2D964025D8D596463802540F43F70805B4F015170072D147F5413814D85461D92D234D1BC0CE59920A155616E921C530961844E63A41718A2435D7D39E4AE4664E303EFA1BA5F63920452BF24D494FD3679551115F4438F3C56184C4439F9538550E250E06FD201064A2C60340B7001482FC2415346292E93589DC8D0D5802CE0B800D65908CF7D0C6F881D33940184CE4D2175D5225448D39'
const FVT_UAT_RSA_PUBLIC_KEY_ENC_PASSWD = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApl44FzCEAOSUDD9g3onZbRkzTxPEkaZ8Ewc3tIsjXBLsMzPagrZwAOSPnbDgb4X3BkP1l2MljwkNHCdNYCcmbC15R/esV0cVLcPt8QYEeQqE/HaNR2QuztZbK96AY5Nm5OyIA/QCXS2WQCxy1zzgoajud0P3cAW08BuxAhlRR/VbobtYvghzlSnNG8DowziKFVYw6ShFmjyyrOy6QxGkJDXx055k5gzomD76G6x2oSbFK/Jnsu/tz5vrEV9EOppFYYTEq5+VOFUojq4G/SaQzKLGA0C3ABSc/cqvNGKS6twj3I0NwaloC4ANzZcm99dG+IHtOUaytoTsF11SjUsnOQIDAQAB'
const PRD_RSA_PUBLIC_KEY_ENC_AES = 'E97987EACC6ECAB9458870E70DB017AD7B13464D3E4C5DF902D15AB5B1A2DD70653F9580871C7BC67F508ADBE15A7D75C9766D7A26AE0858284E7E1A3FB831F4386522C3E079AB428A253832E2D621AC4660E86CFC810EB5984825CDA55290FB1F9F9D4D6D1A41A6F1C26BC8DA74AEBBDCD76BE1077761EDD7060091A8076F71'
const PRD_RSA_PUBLIC_KEY_ENC_PASSWD = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApl44FzCEAOSUDD9g3onZbRkzTxPEkaZ8Ewc3tIsjXBLsMzPagrZwAOSPnbDgb4X3BkP1l2MljwkNHCdNYCcmbC15R/esV0cVLcPt8QYEeQqE/HaNR2QuztZbK96AY5Nm5OyIA/QCXS2WQCxy1zzgoajud0P3cAW08BuxAhlRR/VbobtYvghzlSnNG8DowziKFVYw6ShFmjyyrOy6QxGkJDXx055k5gzomD76G6x2oSbFK/Jnsu/tz5vrEV9EOppFYYTEq5+VOFUojq4G/SaQzKLGA0C3ABSc/cqvNGKS6twj3I0NwaloC4ANzZcm99dG+IHtOUaytoTsF11SjUsnOQIDAQAB'
export function rsaEnc(data, publicKey) {
  // if (location.host.match('localhost')) {
  const key = new NodeRSA()
  key.setOptions({
    encryptionScheme: 'pkcs1',
    environment: 'browser'
  })
  key.importKey(publicKey, 'pkcs8-public')
  return key.encrypt(data, 'base64')
  // } else {
  //   return rsaEncrypt(data, publicKey)
  // }
}

export function rsaEnctryptASE(data) {
  console.log('__RUN_IN_PRD__: ', __RUN_IN_PRD__)
  // return rsaEnc(data, __RUN_IN_PRD__ ? PRD_RSA_PUBLIC_KEY_ENC_PASSWD : FVT_UAT_RSA_PUBLIC_KEY_ENC_PASSWD)
  return rsaEncrypt(data, __RUN_IN_PRD__ ? PRD_RSA_PUBLIC_KEY_ENC_AES : FVT_UAT_RSA_PUBLIC_KEY_ENC_AES)
}

export function rsaEnctryptPassword(data) {
  console.log('__RUN_IN_PRD__: ', __RUN_IN_PRD__)
  // return rsaEnc(data, __RUN_IN_PRD__ ? PRD_RSA_PUBLIC_KEY_ENC_PASSWD : FVT_UAT_RSA_PUBLIC_KEY_ENC_PASSWD)
  return rsaEncrypt(data, __RUN_IN_PRD__ ? PRD_RSA_PUBLIC_KEY_ENC_AES : FVT_UAT_RSA_PUBLIC_KEY_ENC_AES)
}

export function encPwd(pwd, timestamp) {
  console.log('pwd: ', pwd)
  console.log('timestamp: ', timestamp)
  if (typeof timestamp !== 'string') {
    timestamp += ''
  }

  function pad(num, n) {
    if ((num + '').length >= n) return num
    return pad('0' + num, n)
  }

  const _pwd = pad(timestamp.length, 2) + timestamp + pad(pwd.length, 2) + pwd
  return rsaEnctryptPassword(_pwd)
}
