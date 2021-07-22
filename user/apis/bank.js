import request from '@/request'

// 银行卡列表
export const bankList = (data, loading = '') => { // 对接
	return request({
		url: 'bank/list',
		method: 'GET',
		data,
		loading
	})
}