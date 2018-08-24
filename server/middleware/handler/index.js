export default () =>{
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                code: err.statusCode || err.status || 500,
                msg: err.message
            };
        }
    };
}