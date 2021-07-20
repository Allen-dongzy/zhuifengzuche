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
//查询支付接口
export const payStatus = (data, loading = '') => {
	return request({
		url: "order/record/payStatus/"+data,
		contentType:'application/x-www-form-urlencoded',
		method: 'POST',  
		data:'',
		loading
	})
}