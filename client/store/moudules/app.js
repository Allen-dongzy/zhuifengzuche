const app = {
	namespaced: true,
	state: {
		statusBarHeight: 0, // 状态栏高度
		windowWidth: 0, // 窗口宽度
		windowHeight: 0, // 窗口高度
		screenHeight: 0 // 屏幕高度
	},
	mutations: {
		// 设置系统信息
		setSystemInfo (state, {
			statusBarHeight,
			windowWidth,
			windowHeight,
			screenHeight
		}) {
			if (statusBarHeight) state.statusBarHeight = statusBarHeight
			if (windowWidth) state.windowWidth = windowWidth
			if (windowHeight) state.windowHeight = windowHeight
			if (screenHeight) state.screenHeight = screenHeight
		}
	},
	actions: {
		// 获取并设置系统信息
		setSystemInfo ({
			commit
		}) {
			const res = uni.getSystemInfoSync()
			if (!res) return
			commit('setSystemInfo', {
				statusBarHeight: res.statusBarHeight,
				windowWidth: res.windowWidth,
				windowHeight: res.windowHeight,
				screenHeight: res.screenHeight
			})
		}
	}
}

export default app
