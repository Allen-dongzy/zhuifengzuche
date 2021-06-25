import Vue from 'vue'
import App from './App'
import store from './store'
import util from './common/js/util.js'
import cuCustom from './components/colorui/components/cu-custom.vue'
// import uView from "./components/uview-ui"

/**
 * 注册全局模块
 */
Vue.prototype.$store = store;
Vue.prototype.$util = util;

/**
 * 全局头部导航引入
 */
Vue.component('cu-custom',cuCustom)

/**
 * 载入全局模块
 */
// Vue.use(uView);

/**
 * 阻止启动生产消息
 */
Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
