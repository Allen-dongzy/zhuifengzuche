import {
	getInfo
} from '@/apis/admin'

const user = {
	namespaced: true,
	state: {
		icon: '', // 头像
		menus: [], // 菜单
		roles: [], // 角色
		username: '' // 用户名
	},
	mutations: {
		// 获取用户信息
		getInfo(state, {
			icon,
			menus,
			roles,
			username
		}) {
			if (icon) state.icon = icon
			if (menus) state.menus = menus
			if (roles) state.roles = roles
			if (username) state.username = username
		},
		// 清空用户信息
		clearInfo(state) {
			state.icon = ''
			state.menus = []
			state.roles = []
			state.username = ''
		}
	},
	actions: {
		// 获取用户信息
		async getInfo({
			commit
		}) {
			const [err, res] = await getInfo()
			if (err || res.code !== 200) return
			commit('getInfo', res.data)
		}
	}
}

export default user
