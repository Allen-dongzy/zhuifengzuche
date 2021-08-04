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
