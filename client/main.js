import Vue from 'vue'
import App from './App'
import store from './store'
import util from './common/js/util.js'
import api from './common/js/api.js'
import uView from "./components/uview-ui"

Vue.prototype.$store = store;
Vue.prototype.$util = util;
Vue.prototype.$http = api;
Vue.use(uView);

Vue.config.productionTip = false;

App.mpType = 'app';

const app = new Vue({
	...App
});
app.$mount();
