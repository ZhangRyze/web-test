import Koa from 'koa'
import path from 'path'
import ip from 'ip'
import conf from '../server.config'
import staticFiles from 'koa-static'
import Middleware from './middleware'
import Router from './router'
import './mongodb'
const app = new Koa()

//静态文件中间件
Middleware(app)
Router(app)
app.use(staticFiles(path.resolve(__dirname, '../resource')));

app.listen(conf.port, '0.0.0.0', () => {
    console.log(`server is running at http://${ip.address()}:${conf.port}`)
})