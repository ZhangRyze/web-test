import conf from '../../server.config'
import userModel from '../models/user'

export default {
    add: async (ctx, next) =>{
        let paramsData = ctx.request.body, { _id } = ctx.request.body;
        if (_id){
            console.log('----------------更新用户 user/add-----------------------');
            try {
                let data = await ctx.findById(userModel, _id);
                if (!data) {
                    ctx.error(400, "不存在该用户")
                }
                let _data = await ctx.update(userModel, { _id: paramsData._id }, paramsData)
                ctx.success(_data)
            } catch (e) {
                ctx.error(e)
            }
        }else{
            console.log('----------------添加用户 user/add-----------------------');
            try {
                let data = await ctx.findOne(userModel, {
                    $or: [{
                        loginName: paramsData.loginName,
                    }, {
                        userName: paramsData.userName
                    }]
                })
                if (data) {
                    ctx.error(400, "存在该用户")
                } else {
                    let { _id } = await ctx.add(userModel, paramsData);
                    ctx.success({ id: _id})
                }
            } catch (e) {
                ctx.error(e)
            }
        }
    },
    list: async (ctx, next) => {
        console.log('----------------获取用户信息列表接口 user/list-----------------------');
        let { userName, pageNo = 1, pageSize = 10 } = ctx.request.body;
        try {
            let reg = new RegExp(userName, 'i')
            let data = await ctx.findPage(userModel, {
                $or: [
                    { userName: { $regex: reg } }
                ]
            }, { password: 0, __v: 0}, { limit: pageSize * 1, skip: (pageNo - 1) * pageSize });
            ctx.success(data)
        } catch (e) {
            console.log(e)
            ctx.error(e)
        }
    },
    info: async (ctx, next) => {
        console.log('----------------获取用户信息接口 user/info-----------------------');
        let { id } = ctx.request.body;
        try {
            let data = await ctx.findById(userModel, id, { password: 0, __v: 0 });
            ctx.success(data)
        } catch (e) {
            console.log(e)
            ctx.error(e)
        }
    },
    del: async (ctx, next) =>{
        console.log('----------------删除用户 user/del-----------------------');
        console.log(ctx.request.body);
        
        let { id } = ctx.request.body
        try {
            let data = await ctx.findById(userModel, id);
            if (!data) {
                ctx.error(400, "不存在该用户")
            }
            ctx.remove(userModel, { _id: id })
            ctx.success()
        } catch (e) {
            ctx.error(e)
        }
    }
}