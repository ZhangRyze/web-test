import jwt from 'jsonwebtoken'
import conf from '../../../server.config'
import userModel from '../../models/system/user'

export default {
    login: async (ctx, next) => {
        console.log('----------------登录接口 common/login-----------------------');
        let { loginName, password } = ctx.request.body;
        try {
            let data = await ctx.findOne(userModel, { loginName: loginName });
            if (!data) {
                return ctx.error(400, '用户不存在')
            }
            if (password !== data.password) {
                return ctx.error(400, '密码错误,请重新输入！');
            }
            await ctx.update(userModel, { _id: data._id }, { $set: { loginTime: new Date() } }) //更新登陆时间

            let payload = {
                userId: data._id,
                username: data.userName,
            }
            let token = jwt.sign(payload, conf.auth.secretKey, { expiresIn: '24h' })  //token签名 有效期为24小时
            ctx.cookies.set(conf.auth.tokenKey, token, {httpOnly: false});
            ctx.success({ id: data._id});
        } catch (e) {
            if (e === '暂无数据') {
                return ctx.error(400, '用户不存在')
            }
            ctx.error(e)
        }
    },
    auths: async (ctx, next) => {
        console.log('----------------获取用户权限 common/auths-----------------------');
        let token = ctx.cookies.get(conf.auth.tokenKey);
        
        // let { id } = ctx.request.body
        try {
            let _userInfo = jwt.decode(token, conf.auth.secretKey);
            let data = await ctx.findById(userModel, _userInfo.userId,
                { password: 0, __v: 0 },
                {
                    populate: { path: 'userType', select: { authsed: 0, '__v': 0 }, populate: { path: 'auths' } }
                })
            let _auths = data ? ctx.convertTree(data.userType.auths, 'parent', '_id') : []
            data ? ctx.success(_auths) : ctx.error(400, "用户不存在")
        } catch (e) {
            ctx.error(e)
        }
    }
}