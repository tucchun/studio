const Koa = require('koa')
const app = new Koa()


// x-response-time
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    ctx.set('X-Response-Time', `${ms}ms`)
})

// logger
app.use(async (ctx, next) => {
    const start = Date.now()
    await next()
    const ms = Date.now() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}`)
})

// response
app.use(async ctx => {
    ctx.body = 'hello world'
})

const http_port = 8000;
const https_port = 8001;
// app.listen(port, () => {
//     console.log(`started！ http://localhost:${port}`)
// })

const http = require('http')
const https = require('https')
http.createServer(app.callback()).listen(http_port, () => {
    console.log(`started！ http://localhost:${http_port}`)
})
https.createServer(app.callback()).listen(https_port, () => {
    console.log(`started！ http://localhost:${https_port}`)
})