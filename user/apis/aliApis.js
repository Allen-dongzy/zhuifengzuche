import request from '@/request'

// 支付宝-订单详情
export const rentalOrderAliPageQuery = (data, loading = '') => { // 对接
	return request({
		url: 'rentalOrder/AliPageQuery',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 支付宝资金冻结
export const paymentAliPayFrozenMoney = (data, loading = '') => { // 对接
	return request({
		url: 'payment/ali-pay-frozen-money',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 支付宝资金冻结回调
export const paymentAliPayCallback = (data, loading = '') => { // 对接
	return request({
		url: 'payment/ali-pay-callback',
		method: 'POST',
		data,
		loading
	})
}

// 资金授权撤销
export const paymentAliPayFrozenCancel = (data, loading = '') => { // 对接
	return request({
		url: 'payment/ali-pay-frozen-cancel',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}