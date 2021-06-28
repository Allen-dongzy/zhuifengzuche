import request from '@/request'

// 添加钱包
const walletAdd = (data, loading = '添加中') => {
	return request({
		url: 'wallet/add',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 扣款
const walletDeduction = (data, loading = '提交中') => {
	return request({
		url: 'wallet/deduction',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 钱包查询
const walletQuery = (data, loading = '') => {
	return request({
		url: 'wallet/query',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 充值
const walletRecharge = (data, loading = '充值中') => {
	return request({
		url: 'wallet/recharge',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 提现
const walletWithdraw = (data, loading = '提现中') => {
	return request({
		url: 'wallet/withdraw',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
