import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 初始化基础样式
import './assets/css/reset.css';
// 配置iview框架
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 全局注册通用组件
import '@/components/init'
import tools from '@/util/tools'

Vue.use(ElementUI, {
  size: 'small',
  zIndex: 1000
})

Vue.config.productionTip = false
Vue.prototype.util = tools

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
