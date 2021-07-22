import request from '@/request'

// 添加购买记录
export const addBuyHistory = (data, loading = '') => {
	return request({
		url: "risk/addBuyHistory",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 剩余查询次数
export const findQueryNum = (data, loading = '') => {
	return request({
		url: "risk/findQueryNum",
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data:{},
		loading
	})
}
// 剩余查询次数
export const search = (data, loading = '') => {
	return request({
		url: "risk/search",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}