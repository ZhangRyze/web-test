export default {
    pathList: async (ctx, next) => {
        console.log('----------------获取目录 files/pathList-----------------------')
        let paramsData = ctx.request.body
        try {
            let data = await ctx.pathList()
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
    create: async (ctx, next) =>{
        console.log('----------------获取目录 files/create-----------------------')
        let { name } = ctx.request.body
        try {
            let data = await ctx.createPath(name)
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    },
    fileList: async (ctx, next) =>{
        console.log('----------------获取文件 files/fileList-----------------------')
        let { name } = ctx.request.body
        try {
            let data = await ctx.getFiles(name)
            ctx.success(data)
        } catch (e) {
            ctx.error(e)
        }
    }
}