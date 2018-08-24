import Vue from 'vue'
import Router from 'vue-router'

import homeRoutes from '@/router/homeRoutes';
import manageRoutes from '@/router/manageRoutes';

Vue.use(Router)

let routes = [
    {
        path: '/home',
        redirect: '/'
    },{
        path: '/system',
        redirect: '/system/user'
    },{
        path: '/404',
        name: 'error-404',
        component: () => import ('@/views/error/404')
    },{
        path: '/',
        component: () => import('@/views'),
        children: homeRoutes
    },{
        path: '/login',
        name: 'login',
        component: () => import ('@/views/login'),

    }, {
        path: '/system',
        component: () => import ('@/views/layout/'),
        children: manageRoutes
    }
]
var router = new Router({
    routes
})

export default router;