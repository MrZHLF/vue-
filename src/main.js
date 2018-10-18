// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from "mint-ui"
import "mint-ui/lib/style.css"
import LyTab from "ly-tab"
import store from './store'
// import axios from "axios";
Vue.config.productionTip = false
// Vue.prototype.$axios = axios;
import loading from './common/images/39.gif'

import VueLazyload from 'vue-lazyload' //图片懒加载
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  loading
})


// 引入字体图标库
import '@/common/css/style.css'
Vue.use(LyTab);
Vue.use(MintUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
