export default [
    {
        path: '/',
        name: 'home',
        tag: '首页',
        component: () => import(/* webpackChunkName: 'home-index' */ '@/views/home/index'),
    }
]