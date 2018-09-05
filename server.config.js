import path from 'path'
const auth = {
    secretKey: '123456789',
    tokenKey: 'Token-Auth',
    whiteList: ['/login'],
    blackList: ['login']
}

const log = {
    logLevel: 'debug', // 指定记录的日志级别
    dir: path.resolve(__dirname, './logs'), // 指定日志存放的目录名
    projectName: 'web-test', // 项目名，记录在日志中的项目信息
    ip: '0.0.0.0' // 默认情况下服务器 ip 地址
}
const port = process.env.NODE_ENV === 'production' ? '80' : '3000'
const baseURL = 'http://localhost:3000'

export default {
    env: process.env.NODE_ENV,
    baseURL: baseURL,
    port,
    auth,
    log,
    mongodb: {
        username: 'admin',
        pwd: '123456',
        address: 'localhost:27017',
        db: 'test'
    }
}