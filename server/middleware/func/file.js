import multer from 'koa-multer'

export const uploadFile = (_ctx, opts) => {
    let storage = multer.diskStorage({
        destination: `resource/${opts.path}/` + new Date().getFullYear() + (new Date().getMonth() + 1) + new Date().getDate(),
        filename(ctx, file, cb) {
            const filenameArr = file.originalname.split('.');
            cb(null, Date.now() + '.' + filenameArr[filenameArr.length - 1]);
        }
    });
    let upload = multer({ storage }).single(opts.path)
    return new Promise((resolve, reject) => {
        upload(_ctx).then(_res => {
            resolve(_res.req.file)
        }).catch(err => {
            reject(err);
        })
    })
}

