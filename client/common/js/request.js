import config from './config.js'

/**
 * 全局请求封装
 */
export default (url, method, params) => {
	uni.showLoading({
		title: "加载中...",
		mask: true
	});

	if (url.indexOf('http') == -1) {
		url += config.path;
	}
	
	const token = uni.getStorageSync('token');
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			header: {
				'Authorization': ('Bearer ' + token)
			},
			data: {
				...params
			},
			success(res) {
				let accessToken = res.header['access-token'];
				if (accessToken) {
					uni.setStorageSync('token', accessToken);
				}

				if (res.data.statusCode != 200) {
					if (res.data.statusCode === 401) {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
					uni.showToast({
						title: res.data.error,
						icon: 'none'
					})
				}
				resolve(res.data);
			},
			fail(err) {
				uni.showToast({
					title: '服务器错误或请求超时',
					icon: 'none'
				})
				reject(err);
			},
			complete() {
				uni.hideLoading();
			}
		});
	});
};
