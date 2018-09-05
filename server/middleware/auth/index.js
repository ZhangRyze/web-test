import jwt from 'jsonwebtoken'
import conf from '../../../server.config'

export default () => {
    return async (ctx, next) => {
        if (!conf.auth.whiteList.some(v => ctx.path.indexOf(v) >= 0 )) {
            let token = ctx.cookies.get(conf.auth.tokenKey);
            try {
                jwt.verify(token, conf.auth.secretKey);
            } catch (e) {
                if ('TokenExpiredError' === e.name) {
                    ctx.error(401, 'token已过期, 请重新登录!');
                }
                ctx.error(401, 'token验证失败, 请重新登录!');
            }
        }
        await next();
    }
}