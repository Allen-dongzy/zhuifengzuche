import request from '@/request'

// 查询所有城市
export const customerHomeBannerGetSpread = (data, loading = '') => {
	return request({
		url: 'customerHomeBanner/getSpread',
		method: 'GET',
		data,
		loading
	})
}