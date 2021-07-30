import request from '@/request'

// 提交换车信息
export const transferCommit = (data, loading = '发送中') => {
	return request({
		url: "transfer/commit",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 获取差价	
export const differenceOfPrices = (data, loading = '') => {
	return request({
		url: "transfer/differenceOfPrices",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

//交换车辆信息
export const transferInfo = (data, loading = '') => {
	return request({
		url: "transfer/transferInfo",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
