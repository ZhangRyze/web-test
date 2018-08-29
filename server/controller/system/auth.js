import authModel from '../../models/system/auth'

export default {
    add: async (ctx, next) => {
        console.log('----------------添加权限 auth/add-----------------------')
        let paramsData = ctx.request.body
        try {
            let { _id } = await ctx.add(authModel, paramsData)
            ctx.success({ id: _id })
        } catch (e) {
            ctx.error(e)
        }
    },
    list: async (ctx, next) => {
        console.log('----------------权限列表 auth/list-----------------------')
        let { pageNo = 1, pageSize = 10 } = ctx.request.body
        try {
            let data = await ctx.findPage(authModel, {}, { __v: 0 }, { limit: pageSize * 1, skip: (pageNo - 1) * pageSize, sort: { sort_no:1} })
            console.log(data);
            data.list = ctx.convertTree(data.list, 'parent', '_id')
            console.log(data);
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