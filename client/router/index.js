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
        meta: { tag: "404" },
        component: _import_('error/404')
    },{
        path: '/',
        meta: { tag: "首页" },
        component: _import_(''),
        children: homeRoutes
    },{
        path: '/login',
        name: 'login',
        meta: { tag:"登录平台" },
        component: _import_('login'),
    }
]
export const asyncRouterMap = [{
    path: '/system',
    redirect: '/system/user',
    name: 'system',
    meta: { tag: '系统设置' },
    component: _import_('layout'),
    children: [
        {
            path: 'user',
            name: 'user-system',
            meta:{
                tag: '用户管理',
            },
            component: _import_('system/user'),
        }, {
            path: 'dict',
            name: 'dict-system',
            meta: {
                tag: '字典管理',
            },
            component: _import_('system/dict'),
        },
        {
            path: 'auth',
            name: 'auth-system',
            meta: {
                tag: '权限管理',
            },
            component: _import_('system/auth'),
        },
        {
            path: 'role',
            name: 'role-system',
            meta: {
                tag: '角色管理',
            },
            component: _import_('system/role'),
        },
        {
            path: 'banner',
            name: 'banner-system',
            meta: {
                tag: 'banner管理',
            },
            component: _import_('system/banner'),
        },
        {
            path: 'files',
            name: 'files-system',
            meta: {
                tag: '文件管理',
            },
            component: _import_('system/files'),
        }
    ]
}]
export const router = new Router({
    mode: 'history',
    routes: constantRouterMap
});