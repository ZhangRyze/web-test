import mongoose from 'mongoose'
import conf from '../server.config'
const DB_URL = `mongodb://${conf.mongodb.address}/${conf.mongodb.db}`
// const DB_URL = `mongodb://${conf.mongodb.username}:${conf.mongodb.pwd}@${conf.mongodb.address}/${conf.mongodb.db}`; // 账号登陆
mongoose.Promise = global.Promise
mongoose.connect(DB_URL, {}, err => { console.log(DB_URL+ ' = ' + (err ? "数据库连接失败！" : "数据库连接成功！"))})
export default mongoose
