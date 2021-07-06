import storage from '@/utils/storage'
import {
	getInfo
} from '@/apis/admin'

const user = {
	namespaced: true,
	state: {
		icon: '', // 头像
		menus: [], // 菜单
		roles: [], // 角色
		shopId: '', // 门店id
		username: '' // 用户名
	},
	mutations: {
		// 获取用户信息
		getInfo(state, {
			icon,
			menus,
			roles,
			shopId,
			username
		}) {
			if (icon) state.icon = icon
			if (menus) state.menus = menus
			if (roles) state.roles = roles
			if (shopId) state.shopId = shopId
			if (username) state.username = username
		},
		// 清空用户信息
		clearInfo(state) {
			state.icon = ''
			state.menus = []
			state.roles = []
			state.shopId = ''
			state.username = ''
		}
	},
	actions: {
		// 获取用户信息
		async getInfo({
			commit
		}) {
			if (!storage.get('token')) return
			const [err, res] = await getInfo()
			if (err) return
			commit('getInfo', res.data)
		}
	}
}

export default user
