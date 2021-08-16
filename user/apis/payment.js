import request from '@/request'

// 支付宝资金冻结回调
export const paymentAliPayCallback = (data, loading = '') => { // 对接
	return request({
		url: 'payment/ali-pay-callback',
		method: 'POST',
		data,
		loading
	})
}

// 支付宝资金冻结
export const paymentAliPayFrozenMoney = (data, loading = '冻结中') => { // 对接
	return request({
		url: 'payment/ali-pay-frozen-money',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 支付宝资金解冻
export const paymentAliPayThawMoney = (data, loading = '解冻中') => {
	return request({
		url: 'payment/ali-pay-thaw-money',
		method: 'POST',
		data,
		loading
	})
}

// 收钱吧统一回调
export const paymentShouQianBaCallback = (data, loading = '') => {
	return request({
		url: 'payment/shou-qian-ba-callback',
		method: 'POST',
		data,
		loading
	})
}

// 支付
export const paymentPrecreate = (data, loading = '支付中') => {
	return request({
		url: 'payment/upay/v2/precreate',
		method: 'POST',
		data,
		loading
	})
}

// 支付查询
export const paymentQuery = (data, loading = '') => {
	return request({
		url: 'payment/upay/v2/query',
		method: 'POST',
		data,
		loading
	})
}

// 退款
export const paymentRefund = (data, loading = '') => {
	return request({
		url: 'payment/upay/v2/refund',
		method: 'POST',
		data,
		loading
	})
}

// 获取芝麻信用分验证结果
export const paymentZhiMaCreditScore = (accessToken, loading = '') => {
	return request({
		url: `payment/zhi_ma_credit_score/${accessToken}`,
		method: 'GET',
		data: {},
		loading
	})
}
