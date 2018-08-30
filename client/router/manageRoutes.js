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
    {
        path: '/system/auth',
        name: 'auth-system',
        tag: '权限管理',
        component: () => import('@/views/system/auth'),
    },
    {
        path: '/system/role',
        name: 'role-system',
        tag: '角色管理',
        component: () => import('@/views/system/role'),
    },
]