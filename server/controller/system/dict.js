import dictModel from '../../models/system/dict'

export default {
    add: async (ctx, next) => {
        let paramsData = ctx.request.body;
        console.log('----------------添加字典 dict/add-----------------------');
        try {
            let data = await ctx.findOne(dictModel, {
                $or: [{
                    name: paramsData.name
                }]
            })
            if (data) {
                ctx.error(400, "存在该字典")
            } else {
                let { _id } = await ctx.add(dictModel, paramsData);
                ctx.success({ id: _id })
            }
        } catch (e) {
            ctx.error(e)
        }
    },
    list: async (ctx, next) => {
        console.log('----------------获取字典列表接口 dict/list-----------------------');
        let { code, codeName, pageNo = 1, pageSize = 10 } = ctx.request.body;
        try {
            let _code = new RegExp(code, 'i')
            let _codeName = new RegExp(codeName, 'i')
            let data = await ctx.findPage(dictModel, {
                $or: [
                    { code: { $regex: _code }, codeName: { $regex: _codeName } },
                    { code: { $regex: _code }, codeName: { $regex: _codeName } }
                ]
            }, { __v: 0 }, { limit: pageSize * 1, skip: (pageNo - 1) * pageSize, sort:{code:1}});
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
    update: async (ctx, next) => {
        let paramsData = ctx.request.body;
        console.log('----------------更新字典 dict/update-----------------------');
        try {
            let data = await ctx.findOne(dictModel, {
                $or: [{
                    _id: { $ne: paramsData._id },
                    name: paramsData.name
                }]
            })
            if (data) {
                ctx.error(400, "存在该字典编号或字典名称")
            } else {
                let data = await ctx.update(dictModel, { _id: paramsData._id }, paramsData)
                data ? ctx.success(data) : ctx.error(400, "字典不存在")
            }
        } catch (e) {
            ctx.error(e)
        }
    },
    info: async (ctx, next) => {
        console.log('----------------获取字典信息接口 dict/info-----------------------');
        let { id } = ctx.request.body;
        try {
            let data = await ctx.findById(dictModel, id, { __v: 0 });
            data ? ctx.success(data) : ctx.error(400, "字典不存在")
        } catch (e) {
            ctx.error(e)
        }
    },
    del: async (ctx, next) => {
        console.log('----------------删除字典 dict/del-----------------------');
        let { id } = ctx.request.body
        try {
            let data = await ctx.remove(dictModel, { _id: id })
            data ? ctx.success(data) : ctx.error(400, "字典不存在")
        } catch (e) {
            ctx.error(e)
        }
    }
}