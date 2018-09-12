import multer from 'koa-multer'
import fs from 'fs'

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

export const pathList = (path) => {
    let _path = path ? path : 'resource'
    return new Promise((resolve, reject) => {
        fs.readdir(_path, (err, files) => {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            }
            console.log('find success!')
            resolve(files);
        })
    })
}