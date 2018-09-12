import multer from 'koa-multer'
const storage = multer.diskStorage({
    destination: 'resource/banners/' + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate(),
    filename(ctx, file, cb) {
        const filenameArr = file.originalname.split('.');
        cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
    }
});
export const bnUpload = multer({ storage })
export const bnFun = async (ctx) => {
    console.log(ctx.req.file);
    ctx.body = ctx.request.body;
}