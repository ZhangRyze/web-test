import roleModel from '../../models/system/role'

export default {
    add: async (ctx, next) => {
        console.log('----------------添加角色 role/add-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(roleModel, {
                $or: [{
                    name: paramsData.name
                },{
                    code: paramsData.code
                }]
            })
            if (data) {
                ctx.error(400, "存在该角色")
            } else {
                let { _id } = await ctx.add(roleModel, paramsData);
                ctx.success({ id: _id })
            }
        } catch (e) {
            ctx.error(e)
        }
    },
    list: async (ctx, next) => {
        console.log('----------------获取角色列表接口 role/list-----------------------');
        let { code, name, pageNo = 1, pageSize = 10 } = ctx.request.body;
        try {
            let _code = new RegExp(code, 'i')
            let _name = new RegExp(name, 'i')
            let data = await ctx.findPage(roleModel, {
                $or: [
                    { code: { $regex: _code }, name: { $regex: _name } },
                ]
            },
                { __v: 0 },
                {
                    limit: pageSize * 1,
                    skip: (pageNo - 1) * pageSize,
                    sort: { code: 1 }
                });
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
    all: async (ctx, next) => {
        console.log('----------------获取全部角色列表接口 role/all-----------------------');
        try {
            let data = await ctx.find(roleModel, null, { auths: 0, authsed:0, __v:0});
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
    update: async (ctx, next) => {
        console.log('----------------更新角色 role/update-----------------------');
        let paramsData = ctx.request.body;
        try {
            let data = await ctx.findOne(roleModel, {
                $or: [{
                    _id: { $ne: paramsData._id },
                    name: paramsData.name
                },{
                    _id: { $ne: paramsData._id },
                    code: paramsData.code
                }]
            })
            if (data) {
                ctx.error(400, "存在该角色编号或角色名称")
            } else {
                let data = await ctx.update(roleModel, { _id: paramsData._id }, paramsData)
                data ? ctx.success(data) : ctx.error(400, "角色不存在")
            }
        } catch (e) {
            ctx.error(e)
        }
    },
    info: async (ctx, next) => {
        console.log('----------------获取角色信息接口 role/info-----------------------');
        let { id } = ctx.request.body;
        try {
            let data = await ctx.findById(roleModel, id, { __v: 0 });
            data ? ctx.success(data) : ctx.error(400, "角色不存在")
        } catch (e) {
            ctx.error(e)
        }
    },
    del: async (ctx, next) => {
        console.log('----------------删除角色 role/del-----------------------');
        let { id } = ctx.request.body
        try {
            let data = await ctx.remove(roleModel, { _id: id })
            data ? ctx.success(data) : ctx.error(400, "角色不存在")
        } catch (e) {
            ctx.error(e)
        }
    }
}