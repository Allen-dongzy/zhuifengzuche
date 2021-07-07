import request from '@/request'

// 查询启用展示BANNER
export const customerHomeBannerGetSpread = (data, loading = '') => { // 对接
	return request({
		url: 'customerHomeBanner/getSpread',
		method: 'GET',
		data,
		loading
	})
}