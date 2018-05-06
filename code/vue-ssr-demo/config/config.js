
let config = {}

let webpackConfig = {}
webpackConfig.entry = './src/entry-client.js'
webpackConfig.output = {}
webpackConfig.output.filename = 'index.js'
webpackConfig.htmlTemplate = '../src/index.template.html'

config.webpackConfig = webpackConfig

module.exports = config
