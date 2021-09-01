import storage from '@/utils/storage'
import {
	ssoInfo
} from '@/apis/sso'

const user = {
	namespaced: true,
	state: {
		aliId: '', // 支付宝id
		birthday: '', // 生日
		city: '', // 城市
		couponCount: 0, // 优惠券数量
		email: '', // 邮箱
		emergencyContactName: '', // 紧急联系人
		emergencyContactPhone: '', // 紧急联系人电话
		gender: 0, // 性别
		icon: '', // 头像
		idCard: '', // 身份证
		isRealName: 0, // 是否实名
		job: '', // 工作
		memberLevelId: '', // 等级
		nickname: '', // 昵称
		phone: '', // 手机号
		realName: '', // 真实姓名
		username: '', // 用户名
	},
	mutations: {
		// 设置用户信息
		setUserInfo(state, info) {
			const {
				aliId,
				birthday,
				city,
				couponCount,
				email,
				emergencyContactName,
				emergencyContactPhone,
				gender,
				icon,
				idCard,
				isRealName,
				job,
				memberLevelId,
				nickname,
				phone,
				realName,
				username
			} = info
			if (aliId) state.aliId = aliId
			if (birthday) state.birthday = birthday
			if (city) state.city = city
			if (couponCount) state.couponCount = couponCount
			if (email) state.email = email
			if (emergencyContactName) state.emergencyContactName = emergencyContactName
			if (emergencyContactPhone) state.emergencyContactPhone = emergencyContactPhone
			if (gender) state.gender = gender
			if (icon) state.icon = icon
			if (idCard) state.idCard = idCard
			if (isRealName) state.isRealName = isRealName
			if (job) state.job = job
			if (memberLevelId) state.memberLevelId = memberLevelId
			if (nickname) state.nickname = nickname
			if (phone) state.phone = phone
			if (realName) state.realName = realName
			if (username) state.username = username
			storage.set('userinfo', info)
		},
		// 清空用户信息
		clearInfo(state) {
			state.aliId = ''
			state.birthday = ''
			state.city = ''
			state.couponCount = 0
			state.email = ''
			state.emergencyContactName = ''
			state.emergencyContactPhone = ''
			state.gender = 0
			state.icon = ''
			state.idCard = ''
			state.isRealName = 0
			state.job = ''
			state.memberLevelId = ''
			state.nickname = ''
			state.phone = ''
			state.realName = ''
			state.username = ''
			storage.remove('userinfo')
		}
	},
	actions: {
		// 获取用户信息
		async getUserInfo({
			commit
		}, action = '') {
			if (!storage.get('token')) return
			const userinfo = storage.get('userinfo')
			if (userinfo && Object.keys(userinfo).length > 0 && action !== 'refresh') {
				commit('setUserInfo', userinfo)
				return
			}
			const [err, res] = await ssoInfo()
			if (err) return
			commit('setUserInfo', res.data)
		}
	},
	getter: {
		// 获取用户信息
		getUserInfo: (state) => {
			return state
		}
	}
}

export default user
