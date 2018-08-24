export default [
    {
        path: '/system/user',
        name: 'user-system',
        tag: '用户管理',
        component: () => import(/* webpackChunkName: 'role-system' */ '@/views/system/user'),
    }
]