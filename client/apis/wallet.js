import request from '@/request'

// 添加钱包
export const walletAdd = (data, loading = '添加中') => {
	return request({
		url: 'wallet/add',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 扣款
export const walletDeduction = (data, loading = '提交中') => {
	return request({
		url: 'wallet/deduction',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 钱包查询
export const walletQuery = (data, loading = '') => {
	return request({
		url: 'wallet/query',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 充值
export const walletRecharge = (data, loading = '充值中') => {
	return request({
		url: 'wallet/recharge',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 提现
export const walletWithdraw = (data, loading = '提现中') => {
	return request({
		url: 'wallet/withdraw',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
