import request from '@/request'

// 删除发票抬头
export const invoiceDelete = (data, loading = '删除中') => {
	return request({
		url: 'invoice/delete',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 查询用户的发票抬头
export const invoiceQueryByUser = (data, loading = '') => {
	return request({
		url: 'invoice/queryByUser',
		method: 'GET',
		data,
		loading
	})
}

// 新增发票抬头
export const invoiceSave = (data, loading = '提交中') => {
	return request({
		url: 'invoice/save',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 修改发票抬头
export const invoiceUpdate = (data, loading = '修改中') => {
	return request({
		url: 'invoice/update',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
