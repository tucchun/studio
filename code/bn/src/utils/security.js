import forge from 'node-forge'

export function md5(data) {
  data = data || ""
  let md = forge.md.md5.create()
  md.update(data)
  return md.digest().toHex().toString()
}
