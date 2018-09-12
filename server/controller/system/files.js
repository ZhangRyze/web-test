import fs from 'fs'

export default {
    list: async (ctx, next) => {
        console.log('----------------获取目录 files/list-----------------------')
        let paramsData = ctx.request.body
        try {
            let data = await ctx.pathList()
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
}