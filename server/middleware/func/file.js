import multer from 'koa-multer'
import fs from 'fs'

const readFileList = async (path, filesList) => {
    var files = await fs.readdir(path);
    files.forEach(function (itm, index) {
        var stat = fs.statSync(path + itm);
        if (stat.isDirectory()) {
            //递归读取文件
            readFileList(path + itm + "/", filesList)
        } else {
            var obj = {};//定义一个对象存放文件的路径和名字
            obj.path = path;//路径
            obj.filename = itm//名字
            filesList.push(obj);
        }
    })
}

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

export const createPath = (name) => {
    if (!name) return false
    let _path = 'resource/' + name
    return new Promise((resolve, reject) => {
        fs.mkdir(_path, (err) => {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            }
            console.log('create success!')
            resolve('success');
        })
    })
}

export const updatePath = (oldName, newName) => {
    if (!oldName || !newName) return false
    let _oldPath = 'resource/' + oldName
    let _newPath = 'resource/' + newName
    return new Promise((resolve, reject) => {
        fs.rename(_oldPath, _newPath, (err) => {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            }
            console.log('update success!')
            resolve('success');
        })
    })
}

export const removePath = (name) => {
    if (!name) return false
    let _path = 'resource/' + name
    return new Promise((resolve, reject) => {
        fs.rmdir(_path, (err) => {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            }
            console.log('remove success!')
            resolve('success');
        })
    })
}

export const getFiles = (name) => {
    if (!name) return false
    let _path = 'resource/' + name
    let filesList = [];
    readFileList(_path, filesList);
    return filesList;
}