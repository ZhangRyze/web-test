/* 
 * 公共Add方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 */
export const add = (model, conditions) => {
    return new Promise((resolve, reject) => {
        model.create(conditions, (err, res) => {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            }
            console.log('save success!')
            resolve(res);
        })
    })
}



/*
 * 公共update方法
 * @param model 要操作数据库的模型
 * @param conditions 增加的条件,如{id:xxx}
 * @param update 更新条件{set{id:xxx}}
 * @param options
 */
export const update = (model, conditions, update, options) => {
    return new Promise((resolve, reject) => {
        model.findByIdAndUpdate(conditions, update, options, (err, res) => {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            }
            if (res && res.n != 0) {
                console.log('update success!');
            } else {
                console.log('update fail:no this data!');
            }
            resolve(res);
        })
    })
}


/**
 * 公共remove方法
 * @param model
 * @param conditions
 */
export const removeById = (model, conditions) => {
    return new Promise((resolve, reject) => {
        model.findByIdAndRemove(conditions, (err, res) => {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            } else {
                if (res && res.n != 0) {
                    console.log('remove success!');
                } else {
                    console.log('remove fail:no this data!');
                }
                resolve(res);
            }
        })
    })
}

/**
 * 公共remove方法
 * @param model
 * @param conditions
 */
export const remove = (model, conditions) => {
    return new Promise((resolve, reject) => {
        model.deleteMany(conditions, (err, res) => {
            if (err) {
                console.error('Error: ' + JSON.stringify(err));
                reject(err);
                return false;
            } else {
                if (res && res.n != 0) {
                    console.log('remove success!');
                } else {
                    console.log('remove fail:no this data!');
                }
                resolve(res);
            }
        })
    })
}

/**
 * 公共find方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 * @param callback
 */
export const find = (model, conditions, fields, options = {}) => {
    var sort = options.sort == undefined ? { _id: -1 } : options.sort;
    delete options.sort;
    var populate = options.populate == undefined ? "" : options.populate
    delete options.populate
    return new Promise((resolve, reject) => {
        model.find(conditions, fields, options)
            .sort(sort)
            .populate(populate)
            .exec((err, res) => {
                if (err) {
                    console.error('Error: ' + JSON.stringify(err));
                    reject(err);
                    return false;
                } else {
                    if (res && res.length != 0) {
                        console.log('find success!');
                    } else {
                        console.log('find fail:no this data!');
                    }
                    resolve(res)
                }
            })
    })
}

/**
 * 公共findById方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 * @param callback
 */
export const findById = (model, conditions, fields, options = {}) => {
    var sort = options.sort == undefined ? { _id: -1 } : options.sort;
    delete options.sort;
    var populate = options.populate == undefined ? "" : options.populate
    delete options.populate

    return new Promise((resolve, reject) => {
        model.findById(conditions, fields, options)
            .sort(sort)
            .populate(populate)
            .exec((err, res) => {
                if (err) {
                    console.error('Error: ' + JSON.stringify(err));
                    reject(err);
                    return false;
                } else {
                    if (res && res.length != 0) {
                        console.log('find success!');
                    } else {
                        console.log('find fail:no this data!');
                    }
                    resolve(res)
                }
            })
    })
}


/**
 * 公共findOne方法 非关联查找
 * @param model
 * @param conditions
 * @param fields 查找时限定的条件，如顺序，某些字段不查找等
 * @param options
 * @param callback
 */
export const findOne = (model, conditions, fields, options = {}) => {
    var sort = options.sort == undefined ? { _id: -1 } : options.sort;
    delete options.sort;
    var populate = options.populate == undefined ? "" : options.populate
    delete options.populate

    return new Promise((resolve, reject) => {
        model.findOne(conditions, fields, options)
            .sort(sort)
            .populate(populate)
            .exec((err, res)=>{
                if (err) {
                    console.error('Error: ' + JSON.stringify(err));
                    reject(err);
                    return false;
                } else {
                    if (res) {
                        console.log('find success!');
                    } else {
                        console.log('find fail:no this data!');
                    }
                    resolve(res);
                }
            })
    })
}


export const findPage = async (model, conditions, fields, options = {}) => {
    var sort = options.sort == undefined ? { _id: -1 } : options.sort
    delete options.sort
    var populate = options.populate == undefined ? "" : options.populate
    delete options.populate
    const getCount = () => {
        return new Promise((resolve, reject) => {
            model.find(conditions, fields).count({}, (err, res) => {
                if (err) {
                    console.log('查询长度错误')
                    return reject(err);
                }
                resolve(res)
            })
        })
    }
    const count = await getCount()
    return new Promise((resolve, reject) => {
        model.find(conditions, fields, options)
            .sort(sort)
            .populate(populate)
            .exec((err, res) => {
                if (err) {
                    console.error('Error: ' + JSON.stringify(err));
                    reject(err);
                    return false;
                } else {
                    if (res.length != 0) {
                        console.log('find success!');
                        resolve({
                            list: res,
                            total: count
                        })
                    } else {
                        console.log('find fail:no this data!');
                        resolve({
                            list: res,
                            total: count
                        })
                    }
                }
            })
    })
}
