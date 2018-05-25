import React from 'react'
import { render } from 'react-dom'
import APP from './pages/Index'
import ajax from './utils/ajax'
import initialStore from './store'
import forge from 'node-forge'
import { appId } from './utils/config'
// import {} from './utils/security'
import { clearCookie } from 'utils/utils'
import { genAesKey, rsaEnc, encPwd, rsaEnctryptASE, rsaEnctryptPassword } from './utils/security'
window.forge = forge
// import Toast from './components/Widgets/Toast'

// re-build ajax method
// const ajax = (url, param, config) => fetch(url, param, {}, false, true, false)

// find root element
const MOUNT_ELEMENT = document.getElementById('root')

// define render method
let _render = (store = {}, key = null) => {
  // document.getElementById('loading').style.display = 'none'
  // MOUNT_ELEMENT.style.display = 'block'
  render(<APP initialStore={store} />, MOUNT_ELEMENT)
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = _render
  _render = () => {
    try {
      renderApp(initialStore, Math.random())
    } catch (error) {
      console.error(error)
    }
  }
  module.hot.accept(['./pages/Index'], () => requestAnimationFrame(_render))
}

/**
 * initialize the page, such as weixin auth, get common data via ajax
 * must return a Promise
 *
 * @return {Promise} the promise contain all initial data
 */

function initializePage () {
  var startTime = new Date().getTime()
  var initTime = startTime
  console.log('init start', startTime)
  if (__DEV__) {
    // if (!sessionStorage.getItem('firstRender')) {
    //   document.getElementById('loading').style.display = 'block'
    //   sessionStorage.setItem('firstRender', 'rendered')
    // }
    if (__DEV__) {
      // dev:ojvjkt2FtCJRaRKgDp-dzzLsD6F4
      // fvt:oMBo2wHOhkMDOdJRHqU616Rosc3A oMBo2wIRhbzcuHqfAPLe4gaYoZZ4 uat:okge4vxKGy0_Z07xuy_4aWZrwzvo
      initialStore.openid = 'okge4vxKGy0_Z07xuy_4aWZrwzvo'
      initialStore.unionid = 'o8rAp0y0_4TanjUkgrs2kCgA-irg:1'
      initialStore.headImgUrl = 'http://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJoG7YWJ0WsYjhIeDUl9PzVyDZ8zGWictgbLH03vLsWdkhDxmWChO4JHUx1NTFyKic7X14ZVLA3hpug/0'
      initialStore.nickName = '测试'
    }
    ajax('/los/intf-login.authLogin', {
      appId: appId,
      openId: initialStore.openid,
      unionId: initialStore.unionid,
      thirdType: '00'
    }).then(res => {
      const currentTime = new Date().getTime()
      console.log('start render page', currentTime, 'time cost', currentTime - initTime)
      console.log('config end initialStore: ', Object.assign({}, initialStore))
      _render(initialStore)
    }).catch(err => {
      // Toast('登陆失败')
      console.error(err)
    })
  }
}

// initializePage()

async function login () {
  //  初始信息

  debugger
  clearCookie()
  let k = genAesKey()
  // let rsa = rsaEnctryptASE(k)
  // const FVT_UAT_RSA_PUBLIC_KEY_ENC_AES = 'DE4764EDBDD55EC6C55DFBFA2C1BBB09ADD083DE0EB3699AF6E71A4FB83AA5C337972AF1E6035B442A25E525DD42CA4AD2DC3DBA299B985CD0CCC26088A140955F300833CBBB96F9EA6B591BFD62E53B5D5BB7221B51A3F02B5FFDE862994C41C34D51CE28D9633457092AE5574C52F85C0BA2591A20169E62942B1025176A17'
  // let _rsa = forge.ssh.publicKeyToOpenSSH(k, FVT_UAT_RSA_PUBLIC_KEY_ENC_AES)
  // console.log(rsa === _rsa)
  let initData = await ajax({
    url: '/los/2b-admin-front.updateSession',
    data: {
      encFlag: 0,
      reqData: rsaEnctryptASE(k)
    }
  }).then((res) => {
    return {
      pwdTime: res.data.model.pwdTime,
      disabled: false,
      timeOfGettingWpdTime: new Date().getTime()
    }
  })
  k = genAesKey()
  const username = 'suzw001'
  const pwd = 'abcd1234'
  const timeDiff = new Date().getTime() - initData.timeOfGettingWpdTime
  const timeToSend = parseInt(initData.pwdTime) + timeDiff
  let loginData = await ajax({
    url: '/los/2b-admin-front.login',
    data: {
      encFlag: 0,
      loginName: username,
      loginPwd: encPwd(pwd, timeToSend),
      encKey: rsaEnctryptASE(k)
    }
  })

  console.log(loginData)
}

// login()
_render(initialStore)

// debugger
// // rsa公钥加密，传入: 公钥PEM形式
// function _encrypt_by_rsa (message, pubkey) {
//   var pki = forge.pki
//   var pem = pki.publicKeyFromAsn1(pubkey)
//   var publicKey = pki.publicKeyFromPem(pem)
//   return publicKey.encrypt(message)
// }

// var pubkey = 'DE4764EDBDD55EC6C55DFBFA2C1BBB09ADD083DE0EB3699AF6E71A4FB83AA5C337972AF1E6035B442A25E525DD42CA4AD2DC3DBA299B985CD0CCC26088A140955F300833CBBB96F9EA6B591BFD62E53B5D5BB7221B51A3F02B5FFDE862994C41C34D51CE28D9633457092AE5574C52F85C0BA2591A20169E62942B1025176A17/lTUqwtiEkwY0ZZkDvktfjijpiDJMp4xscN18CAwEAAQ=='

// console.log(_encrypt_by_rsa('11', pubkey))
debugger
var rsa = forge.pki.rsa

// generate an RSA key pair synchronously
// *NOT RECOMMENDED* -- can be significantly slower than async and will not
// use native APIs if available.
var keypair = rsa.generateKeyPair({bits: 2048, e: 0x10001})

// generate an RSA key pair asynchronously (uses web workers if available)
// use workers: -1 to run a fast core estimator to optimize # of workers
// *RECOMMENDED* - can be significantly faster than sync -- and will use
// native APIs if available.
rsa.generateKeyPair({bits: 2048, workers: 2}, function(err, keypair) {
  // keypair.privateKey, keypair.publicKey
})

// generate an RSA key pair in steps that attempt to run for a specified period
// of time on the main JS thread
var state = rsa.createKeyPairGenerationState(2048, 0x10001)
var step = function() {
  // run for 100 ms
  if(!rsa.stepKeyPairGenerationState(state, 100)) {
    setTimeout(step, 1)
  }
  else {
    // done, turn off progress indicator, use state.keys
  }
}
// turn on progress indicator, schedule generation to run
setTimeout(step)

// sign data with a private key and output DigestInfo DER-encoded bytes
// (defaults to RSASSA PKCS#1 v1.5)
var md = forge.md.sha1.create()
md.update('sign this', 'utf8')
var signature = privateKey.sign(md)

// verify data with a public key
// (defaults to RSASSA PKCS#1 v1.5)
var verified = publicKey.verify(md.digest().bytes(), signature)

// sign data using RSASSA-PSS where PSS uses a SHA-1 hash, a SHA-1 based
// masking function MGF1, and a 20 byte salt
var md = forge.md.sha1.create()
md.update('sign this', 'utf8')
var pss = forge.pss.create({
  md: forge.md.sha1.create(),
  mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
  saltLength: 20
  // optionally pass 'prng' with a custom PRNG implementation
  // optionalls pass 'salt' with a forge.util.ByteBuffer w/custom salt
})
var signature = privateKey.sign(md, pss)

// verify RSASSA-PSS signature
var pss = forge.pss.create({
  md: forge.md.sha1.create(),
  mgf: forge.mgf.mgf1.create(forge.md.sha1.create()),
  saltLength: 20
  // optionally pass 'prng' with a custom PRNG implementation
})
var md = forge.md.sha1.create()
md.update('sign this', 'utf8')
publicKey.verify(md.digest().getBytes(), signature, pss)

// encrypt data with a public key (defaults to RSAES PKCS#1 v1.5)
var encrypted = publicKey.encrypt(bytes)

// decrypt data with a private key (defaults to RSAES PKCS#1 v1.5)
var decrypted = privateKey.decrypt(encrypted)

// encrypt data with a public key using RSAES PKCS#1 v1.5
var encrypted = publicKey.encrypt(bytes, 'RSAES-PKCS1-V1_5')

// decrypt data with a private key using RSAES PKCS#1 v1.5
var decrypted = privateKey.decrypt(encrypted, 'RSAES-PKCS1-V1_5')

// encrypt data with a public key using RSAES-OAEP
var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP')

// decrypt data with a private key using RSAES-OAEP
var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP')

// encrypt data with a public key using RSAES-OAEP/SHA-256
var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
  md: forge.md.sha256.create()
})

// decrypt data with a private key using RSAES-OAEP/SHA-256
var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
  md: forge.md.sha256.create()
})

// encrypt data with a public key using RSAES-OAEP/SHA-256/MGF1-SHA-1
// compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
var encrypted = publicKey.encrypt(bytes, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha1.create()
  }
})

// decrypt data with a private key using RSAES-OAEP/SHA-256/MGF1-SHA-1
// compatible with Java's RSA/ECB/OAEPWithSHA-256AndMGF1Padding
var decrypted = privateKey.decrypt(encrypted, 'RSA-OAEP', {
  md: forge.md.sha256.create(),
  mgf1: {
    md: forge.md.sha1.create()
  }
})
