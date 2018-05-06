// const Vue = require('vue')
// import { createApp } from './app'
// const server = require('express')()
// const { createApp } = require('./app')
const path = require('path')
const fs = require('fs')
const express = require('express')
const favicon = require('serve-favicon')
const app = express()
const resolve = file => path.resolve(__dirname, file)
const { createBundleRenderer } = require('vue-server-renderer')
const templatePath = resolve('./src/index.template.html')
const port = process.env.PORT || 8080
const isProd = process.env.NODE_ENV === 'production'
const serverInfo =
  `express/${require('express/package.json').version} ` +
  `vue-server-renderer/${require('vue-server-renderer/package.json').version}`
let renderer
let readyPromise
// 1.创建vue根实例
// 2.创建renderer
// 3.把vue实例变成html

// 创建renderer
function createRenderer (bundle, options) {
  return createBundleRenderer(bundle, Object.assign(options, {
    // cache: LRU({})
    basedir: resolve('./dist'),
    runInNewContext: false
  }))
}

if (isProd) {
  const template = fs.readFileSync(resolve(templatePath), 'utf-8')
  const bundle = require('./dist/vue-ssr-server-bundle.json')
  const clientManifest = require('./dist/vue-ssr-client-manifest')
  renderer = createRenderer(bundle, {
    template,
    clientManifest
  })
} else {
  // 开发环境 添加热更新
  readyPromise = require('./build/setup-dev-server')(
    app,
    templatePath,
    (bundle, options) => {
      renderer = createRenderer(bundle, options)
    }
  )
}

// 将vue实例转换为html并发送客户端渲染
function render (req, res) {
  const s = Date.now()

  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Server', serverInfo)

  const handleError = err => {
    if (err.url) {
      res.redirect(err.url)
    } else if (err.code === 404) {
      res.status(404).send('404 | Page Not Found')
    } else {
      res.status(500).send('500 | Internal Server Error')
      console.error(`error during render : ${req.url}`)
      console.error(err.stack)
    }
  }

  const context = {
    title: 'vue-ssr',
    url: req.url,
    meta: `
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
    `
  }

  renderer.renderToString(context, (err, html) => {
    if (err) {
      return handleError(err)
    }
    res.send(html)
    if (!isProd) {
      console.log(`whole request: ${Date.now() - s}ms`)
    }
  })
}

app.use(express.static(path.resolve(__dirname, './dist')))
app.use(favicon('./build/logo.png'))
app.get('*', isProd ? render : (req, res) => {
  readyPromise.then(() => render(req, res))
})

app.listen(port, (msg) => {
  console.log(`server started at http://localhost:${port}`)
})
