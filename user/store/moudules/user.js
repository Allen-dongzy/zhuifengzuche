import storage from '@/utils/storage'
import {
	ssoInfo
} from '@/apis/sso'

const user = {
	namespaced: true,
	state: {
		birthday: '', // 生日
		city: '', // 城市
		email: '', // 邮箱
		icon: '', // 头像
		idCard: '', // 身份证
		job: '', // 工作
		memberLevelId: '', // 等级
		nickname: '', // 昵称
		phone: '', // 手机号
		realName: '', // 真实姓名
		username: '', // 用户名
	},
	mutations: {
		// 获取用户信息
		ssoInfo(state, {
			birthday,
			city,
			email,
			icon,
			idCard,
			job,
			memberLevelId,
			nickname,
			phone,
			realName,
			username
		}) {
			if (birthday) state.birthday = birthday
			if (city) state.city = city
			if (email) state.email = email
			if (icon) state.icon = icon
			if (idCard) state.idCard = idCard
			if (job) state.job = job
			if (memberLevelId) state.memberLevelId = memberLevelId
			if (nickname) state.nickname = nickname
			if (phone) state.phone = phone
			if (realName) state.realName = realName
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
		async ssoInfo({
			commit
		}) {
			if (!storage.get('token')) return
			const [err, res] = await ssoInfo()
			if (err) return
			commit('ssoInfo', res.data)
		}
	},
	getter: {
		// 获取用户信息
		ssoInfo: (state) => {
			return state
		}
	}
}

export default user
