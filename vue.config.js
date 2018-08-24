const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    // 基本路径
    baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'WEB-INFO',
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,
    // 服务器端口号
    devServer: {
        port: '9000',
    },
    configureWebpack: {  
       
    },
    chainWebpack: config => {
        config.entry('app').clear().add('./client/main.js')
        config.resolve.alias.set('@', resolve('client'))
    }
}