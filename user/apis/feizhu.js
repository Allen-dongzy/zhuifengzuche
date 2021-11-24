import request from '@/request'

// 飞猪订单状态修改
export const feizhuOrderStatus = (data, loading = '') => { // 对接
	return request({
		url: 'feizhu/feizhuOrderStatus',
		method: 'POST',
		data,
		loading
	})
}