import request from '@/request'

// 银行卡列表
export const receiptPaymentBankList = (id, loading = '') => { // 对接
	return request({
		url: 'receiptPayment/bankList',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 查询详情
export const receiptPaymentFindOneById = (id, loading = '') => { // 对接
	return request({
		url: `receiptPayment/findOneById/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 订单列表
export const receiptPaymentOrderList = (id, loading = '') => { // 对接
	return request({
		url: 'receiptPayment/orderList',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 分页查询收付款列表-必传字段交易类型
export const receiptPaymentPageQuery = (data, loading = '') => { // 对接
	return request({
		url: 'receiptPayment/pageQuery',
		method: 'POST',
		data,
		loading
	})
}

// 客户发起收付款-必传字段交易类型
export const receiptPaymentPayment = (data, loading = '提交中') => { // 对接
	return request({
		url: 'receiptPayment/payment',
		method: 'POST',
		data,
		loading
	})
}

// 发起付款-项目集合
export const receiptPaymentProjectList = (data, loading = '') => { // 对接
	return request({
		url: 'receiptPayment/projectList',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
