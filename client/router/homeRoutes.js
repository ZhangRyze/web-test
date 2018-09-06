export default [
    {
        path: '/',
        name: 'home',
        meta:{
            tag: '首页',
        },
        component: () => import(/* webpackChunkName: 'home-index' */ '@/views/home/index'),
    }
]