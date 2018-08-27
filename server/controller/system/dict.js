import dictModel from '../../models/system/dict'

export default {
    add: async (ctx, next) => {
        let paramsData = ctx.request.body;
        console.log('----------------添加字典 dict/add-----------------------');
        try {
            let data = await ctx.findOne(dictModel, {
                $or: [{
                    code: paramsData.code,
                }, {
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
        let { code, name, pageNo = 1, pageSize = 10 } = ctx.request.body;
        try {
            let _code = new RegExp(code, 'i')
            let _name = new RegExp(name, 'i')
            let data = await ctx.findPage(dictModel, {
                $or: [
                    { code: { $regex: _code }, name: { $regex: _name } }
                ]
            }, { __v: 0 }, { limit: pageSize * 1, skip: (pageNo - 1) * pageSize });
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
}