import Vue from 'vue'
import App from './App'
import store from '@/store'
import config from '@/request/config'
import storage from '@/utils/storage'
import '@/utils/uni-tools'

// 挂载vuex
Vue.prototype.$store = store
// 挂载项目缓存
Vue.prototype.$storage = storage
// 挂载oss
Vue.prototype.$ossUrl = config.ossUrl

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
