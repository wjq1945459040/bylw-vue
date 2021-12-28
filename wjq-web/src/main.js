import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import axios from 'axios';

import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题
// import './assets/css/theme-green/index.css'; // 浅绿色主题
import './assets/css/icon.css';
import './components/common/directives';
import 'babel-polyfill';
import './permision.js';
axios.defaults.baseURL = 'http://localhost:8081';

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.prototype.$axios = axios
Vue.use(ElementUI, {
  size: 'small'
});
const i18n = new VueI18n({
  locale: 'zh',
  messages
});

//使用钩子函数对路由进行权限跳转
// router.beforeEach((to, from, next) => {
//   document.title = `${to.meta.title} | vue-manage-system`;
//   const role = localStorage.getItem('authority');
//   if (!role && to.path !== '/login' && to.path !== '/register') {
//     console.log(1);
//     next('/login');
//   } else if (to.meta.permission) {
//     // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//     role === '1' ? next() : next('/403');
//   } else {
//     // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
//     console.log(2);
//     next();
//   }
// });

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
