export default () => {
    let render = ctx => {
        return (json, msg) => {
            ctx.set("Content-Type", "application/json");
            ctx.body = JSON.stringify({
                code: 200,
                data: json || {},
                msg: msg || 'success'
            });
        }
    }
    let renderError = ctx => {
        return (code, msg) => {
            let message = msg || "服务器内部错误"
            ctx.throw(code, message);
        }
    }
    return async (ctx, next) => {
        ctx.success = render(ctx);
        ctx.error = renderError(ctx);
        await next()
    }
}