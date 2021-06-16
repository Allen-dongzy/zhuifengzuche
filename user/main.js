import Vue from 'vue'
import App from './App'
import store from '@/store' 
import {
	open,
	close,
	toast,
	showLoading
} from '@/utils/uni-tools'

// 挂载vuex
Vue.prototype.$store = store
// 挂载uni小工具
Vue.prototype.$open = open
Vue.prototype.$close = close
Vue.prototype.$toast = toast
Vue.prototype.$showLoading = showLoading

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
