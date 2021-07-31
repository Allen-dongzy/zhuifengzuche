import request from '@/request'

// 验证用户支付宝免押
export const ssoVerification = (data, loading = '申请中') => { // 对接
	return request({
		url: 'sso/verification',
		method: 'POST',
		data,
		loading
	})
}
