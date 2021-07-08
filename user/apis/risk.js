import request from '@/request'

// 风控查询剩余次数
export const findQueryNum = (data, loading = '') => {//对接
	return request({
		url: 'risk/findQueryNum',
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data:{},
		loading
	})
}
// 查询
export const search = (data, loading = '查询中') => { //对接
	return request({
		url: 'risk/search',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

