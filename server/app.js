import Koa from 'koa'
import ip from 'ip'
import conf from '../server.config'
import Middleware from './middleware'
import Router from './router'
import './mongodb'
const app = new Koa()

Middleware(app)
Router(app)

app.listen(conf.port, '0.0.0.0', () => {
    console.log(`server is running at http://${ip.address()}:${conf.port}`)
})