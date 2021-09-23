import {
	getPlatform
} from '@/utils/uni-tools'

const app = {
	namespaced: true,
	state: {
		titleBarHeight: 0, // 小程序导航栏高度
		statusBarHeight: 0, // 手机状态栏高度
		windowWidth: 0, // 页面窗口宽度
		windowHeight: 0, // 页面窗口高度
		screenHeight: 0, // 手机屏幕高度
		platform: null, // 平台
	},
	mutations: {
		// 设置系统信息
		setSystemInfo(state, {
			titleBarHeight,
			statusBarHeight,
			windowWidth,
			windowHeight,
			screenHeight
		}) {
			if (titleBarHeight) state.titleBarHeight = titleBarHeight
			if (statusBarHeight) state.statusBarHeight = statusBarHeight
			if (windowWidth) state.windowWidth = windowWidth
			if (windowHeight) state.windowHeight = windowHeight
			if (screenHeight) state.screenHeight = screenHeight
		},
		// 设置平台
		setPlatform(state) {
			state.platform = getPlatform()
		}
	},
	actions: {
		// 获取并设置系统信息
		setSystemInfo({
			commit
		}) {
			const res = uni.getSystemInfoSync()
			if (!res) return
			commit('setSystemInfo', {
				titleBarHeight: res.titleBarHeight,
				statusBarHeight: res.statusBarHeight,
				windowWidth: res.windowWidth,
				windowHeight: res.windowHeight,
				screenHeight: res.screenHeight
			})
		}
	}
}

export default app
