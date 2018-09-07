import authModel from '../../models/system/auth'

export default {
    add: async (ctx, next) => {
        console.log('----------------添加权限 auth/add-----------------------')
        let paramsData = ctx.request.body
        try {
            if (paramsData.parent){
                paramsData.parentIds = paramsData.parentIds + ',' + paramsData.parent
            }
            let { _id } = await ctx.add(authModel, paramsData)
            ctx.success({ id: _id })
        } catch (e) {
            ctx.error(e)
        }
    },
    list: async (ctx, next) => {
        console.log('----------------权限列表 auth/list-----------------------')
        try {
            let data = await ctx.find(authModel, {}, { __v: 0 }, { sort: { sort_no:1} })
            data = ctx.convertTree(data, 'parent', '_id')
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
    update: async(ctx, next) => {
        console.log('----------------更新权限 auth/update-----------------------')
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.update(authModel, { _id: paramsData._id }, paramsData)
            data ? ctx.success(data) : ctx.error(400, "权限不存在")
        } catch (e) {
            ctx.error(e)
        }

    },
    info: async (ctx, next) => {
        console.log('----------------获取权限信息接口 auth/info-----------------------');
        let { id } = ctx.request.body;
        try {
            let data = await ctx.findById(authModel, id, { __v: 0 });
            data ? ctx.success(data) : ctx.error(400, "权限不存在")
        } catch (e) {
            ctx.error(e)
        }
    },
    del: async (ctx, next) => {
        console.log('----------------删除权限 auth/del-----------------------');
        let { id } = ctx.request.body
        try {
            let data = await ctx.remove(authModel, { _id: id })
            data ? ctx.success(data) : ctx.error(400, "权限不存在")
        } catch (e) {
            ctx.error(e)
        }
    },
}