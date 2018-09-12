export default {
    upload: async (ctx, next) => {
        console.log('----------------添加banner banner/upload-----------------------')
        try {
            let data = await ctx.uploadFile(ctx, { path:'banners' })
            data ? ctx.success(data) : ctx.error(400, "上传失败")
        } catch (e) {
            ctx.error(e)
        }
    }
}