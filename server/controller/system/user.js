import userModel from '../../models/system/user'

export default {
    add: async (ctx, next) =>{
        console.log('----------------添加用户 user/add-----------------------');
        let paramsData = ctx.request.body;
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
    },
    update: async (ctx, next) =>{
        console.log('----------------更新用户 user/update-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(userModel, {
                $or: [{
                    _id: { $ne: paramsData._id },
                    loginName: paramsData.loginName,
                }, {
                    _id: { $ne: paramsData._id },
                    userName: paramsData.userName
                }]
            })
            if (data){
                ctx.error(400, "存在该用户账户或用户名称")
            }else{
                let data = await ctx.update(userModel, { _id: paramsData._id }, paramsData)
                data ? ctx.success(data) : ctx.error(400, "用户不存在")
            }
        } catch (e) {
            ctx.error(e)
        }
    },
    updateUser: async(ctx, next) => {
        console.log('----------------更新用户状态 user/updateUser-----------------------');
        let { id, state} = ctx.request.body;
        console.log(state);
        
        try {
            let data = await ctx.update(userModel, { _id: id }, { state: state})
            data ? ctx.success(data) : ctx.error(400, "用户不存在")
        } catch (e) {
            ctx.error(e)
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
            }, 
            { password: 0, __v: 0 },
            { 
                limit: pageSize * 1,
                skip: (pageNo - 1) * pageSize ,
                populate: { path: 'userType', select: { '__v': 0 }}
            })
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
    info: async (ctx, next) => {
        console.log('----------------获取用户信息接口 user/info-----------------------');
        let { id } = ctx.request.body;
        try {
            let data = await ctx.findById(userModel, id, { password: 0, __v: 0 });
            data ? ctx.success(data) : ctx.error(400, "用户不存在") 
        } catch (e) {
            ctx.error(e)
        }
    },
    del: async (ctx, next) =>{
        console.log('----------------删除用户 user/del-----------------------');
        let { id } = ctx.request.body
        try {
            let data = await ctx.remove(userModel, { _id: id })
            data ? ctx.success(data) : ctx.error(400, "用户不存在")
        } catch (e) {
            ctx.error(e)
        }
    }
}