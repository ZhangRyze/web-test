import store from '@/store'
import { getToken } from '@/util/auth'
import { router } from './index'
import conf from '../../server.config'

router.beforeEach((to, from, next) => {
    if (getToken()) { //存在token
        if(to.path === '/login'){
            next('/')
        }else{
            if (!store.state.user.auths) { // 不存在用户信息， 需要重新拉取
                store.dispatch('getUserAuths').then(res => { //拉取用户信息
                    router.addRoutes(store.state.user.auths)
                    next({ ...to }) //hash模式  确保路由加载完成
                })
            } else { // 存在信息，直接跳转到该页面
                next()
            }
        }
    } else {
        if (conf.auth.whiteList.indexOf(to.path) >= 0 || to.path === '/') { //是否在白名单内,不在的话直接跳转登录页
            next()
        } else {
            next('/login')
        }
    }
})
router.afterEach((to, from) => {
    document.title = to.name
})

export default router
