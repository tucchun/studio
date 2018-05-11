import path from 'path'
import fs from 'fs'
import _debug from 'debug'

const MOCK_DEF_FILE = 'mock.json'
const MOCK_PATH = 'mocks'
const DEF_PATH = 'definition'

// console.log(__dirname)
const debug = _debug('app:server:dev-mock')
export default function * (next) {
  const mockPath = path.join(__dirname, '..', MOCK_PATH, MOCK_DEF_FILE)
  let mockContent = ''
  let mockJson = {}
  let defContent = ''

  try {
    mockContent = fs.readFileSync(mockPath)
  } catch (e) {
    console.error(`load mock.json failed, path : [${mockPath}]`)
  }

  try {
    mockJson = JSON.parse(mockContent)
  } catch (e) {
    console.error('parse mock content failed')
  }

  if (!mockJson.definition) {
    console.error('mock.definition is not defined')
    mockJson.definition = []
  }

  for (let k = 0; k < mockJson.definition.length; k++) {
    const d = mockJson.definition[k]
    const xx = d.morkFile // morkFile looks like spacial, can not use this name
    if (this.path === d.path && this.method.toLowerCase() === d.type.toLowerCase()) {
      try {
        defContent = fs.readFileSync(path.join(__dirname, '..', MOCK_PATH, DEF_PATH, xx))
      } catch (e) {
        console.error(`failed to load ${d.mockFile}, ${e}`)
        defContent = 'ERROR'
      }

      break
    }
  }

  if (defContent) {
    this.body = JSON.parse(defContent)
  } else {
    return yield next
  }
}
