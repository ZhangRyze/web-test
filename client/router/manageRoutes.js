export default [
    {
        path: '/system/user',
        name: 'user-system',
        tag: '用户管理',
        component: () => import('@/views/system/user'),
    }, {
        path: '/system/dict',
        name: 'dict-system',
        tag: '字典管理',
        component: () => import('@/views/system/dict'),
    },

]