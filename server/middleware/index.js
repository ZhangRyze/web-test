import path from 'path'
/*跨域*/
import cors from 'koa-cors'
import bodyParser from 'koa-bodyparser'
// import staticFiles from 'koa-static'
import handler from './handler'
import Send from './send'
import Log from './log'
import Func from './func'

export default app => {
    // 跨域
    app.use(cors());
    // 缓存拦截器
    app.use(async (ctx, next) => { 
        if (ctx.url == '/favicon.ico') return
        
        await next()
        // ctx.status = 200
        // ctx.set('Cache-Control', 'must-revalidation')
        // if (ctx.fresh) {
        //     ctx.status = 304
        //     return
        // }
    })
    // 方法封装
    app.use(Func())

    // 日志中间件
    app.use(Log())
    // 数据error处理
    app.use(handler())

    // 数据返回的封装
    app.use(Send())


    //post请求中间件
    app.use(bodyParser())

    // 增加错误的监听处理
    app.on("error", (err, ctx) => {
        if (ctx && !ctx.headerSent && ctx.status < 500) {
            ctx.status = 500
        }
        if (ctx && ctx.log && ctx.log.error) {
            if (!ctx.state.logged) {
                ctx.log.error(err.stack)
            }
        }
    })
}