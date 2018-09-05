import Axios from 'axios'
import Cookies from 'js-cookie'
import serverConf from '../../server.config'
import { Message } from 'element-ui'

class httpRequest {
    constructor() {
        this.options = {
            method: '',
            url: ''
        }
        // 存储请求队列
        this.queue = {}
    }
    // 销毁请求实例
    destroy (url){
        delete this.queue[url]
        const queue = Object.keys(this.queue)
        return queue.length
    }
    // 拦截器
    interceptors (instance, url) {
        // 请求拦截器
        instance.interceptors.request.use(config => {
            // if (!config.url.includes('user')){
            //     config.headers['x-access-token'] = Cookies.get(serverConf.tokenKey)
            // }
            return config
        }, err => {
            return Promise.reject(err)
        })
        // 响应拦截器
        instance.interceptors.response.use(res => {
            let { data, status } = res
            if (status !== 200){
                Message.error(data.msg)
                return false
            }
            return data
        }, err => {
            if (err.response){
                let { status, data } = err.response;
                if(status === 401){
                    Cookies.remove(serverConf.tokenKey)
                    Message.error('未登录，或登录失效，请登录')
                }else{
                    Message.error(data.msg)
                }
                return Promise.reject(data.msg)
            }else{
                return Promise.reject(err)
            }
        })
    }
    // 创建实例
    create (){
        let conf = {
            baseURL: serverConf.baseURL,
            timeout: 6000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            withCredentials: true
        }
        return Axios.create(conf)
    }
    // 请求实例
    request (options) {
        var instance = this.create()
        this.interceptors(instance, options.url)
        options = Object.assign({}, options)
        this.queue[options.url] = instance
        return instance(options)
    }
    // get请求
    get({url, parms}) {
        if (!url) return 
        return this.request({
            method: 'get',
            url: url,
            parms
        })
    }
    // post请求
    post ({url, data}){
        if (!url) return
        return this.request({
            method: 'post',
            url: url,
            data: data,
        })
    }
}
export default httpRequest
