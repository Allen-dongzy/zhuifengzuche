import request from '@/request'

// 检验收车
export const returnVehicle = (orderId, loading = '') => { // 对接
	return request({
		url: `return/vehicle/${orderId}`,
		method: 'GET',
		data: {},
		loading
	})
}
