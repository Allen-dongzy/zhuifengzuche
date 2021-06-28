import request from '@/request'

// 收付款审核
export const receiptPaymentAudit = (data, loading = '发送中') => {
	return request({
		url: "receiptPayment/audit",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 查询详情
export const findOneById = (id, loading = '') => {
	return request({
		url: `findOneById/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 分页查询收付款列表
export const receiptPaymentPageQuery = (id, loading = '') => {
	return request({
		url: 'receiptPayment/pageQuery',
		contentType: 'application/json',
		method: 'POST',
		data: {},
		loading
	})
}
