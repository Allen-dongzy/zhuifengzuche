import request from '@/request'

// 支付
export const precreate = (data, loading = '等待中') => {  // 对接
	return request({
		url: "payment/upay/v2/precreate",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
//查询状态支付接口
export const payStatus = (data, loading = '') => {
	return request({
		url: "order/record/payStatus/"+data,
		contentType:'application/x-www-form-urlencoded',
		method: 'POST',  
		data:'',
		loading
	})
}
// 退款
export const refund = (data, loading = '等待中') => {  
	return request({
		url: "return/vehicle/reimburse/"+data,
		contentType: 'application/json',
		method: 'GET',
		data:{},
		loading
	})
}
// 资金解冻
export const thawMoney = (data, loading = '等待中') => {  
	return request({
		url: "payment/ali-pay-thaw-money",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}