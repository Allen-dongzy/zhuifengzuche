import Vue from 'vue'
import Vuex from 'vuex'
import app from './moudules/app'
import user from './moudules/user'
import city from './moudules/city'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		app,
		user,
		city
	}
})
