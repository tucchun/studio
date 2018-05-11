import CryptoJS from 'CryptoJS'

export function md5 (data) {
  // const hash = crypto.createHash('md5')
  // hash.update(data)
  return CryptoJS.MD5(data).toString() // hash.digest('hex')
}
