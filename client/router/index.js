import Vue from 'vue'
import Router from 'vue-router'

import homeRoutes from '@/router/homeRoutes'

const _import_ = file => () => import('@/views/' + file)

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/home',
        redirect: '/'
    },{
        path: '/404',
        name: 'error-404',
        component: _import_('error/404')
    },{
        path: '/',
        component: _import_(''),
        children: homeRoutes
    },{
        path: '/login',
        name: 'login',
        component: _import_('login'),
    }
]
export const asyncRouterMap = [{
    path: '/system',
    redirect: '/system/user',
    name: 'system',
    tag: '系统设置',
    component: _import_('layout'),
    children: [
        {
            path: 'user',
            name: 'user-system',
            tag: '用户管理',
            component: _import_('system/user'),
        }, {
            path: 'dict',
            name: 'dict-system',
            tag: '字典管理',
            component: _import_('system/dict'),
        },
        {
            path: 'auth',
            name: 'auth-system',
            tag: '权限管理',
            component: _import_('system/auth'),
        },
        {
            path: 'role',
            name: 'role-system',
            tag: '角色管理',
            component: _import_('system/role'),
        }
    ]
}]
export const router = new Router({
    mode: 'history',
    routes: constantRouterMap
});