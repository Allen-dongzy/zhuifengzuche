import request from '@/request'

// 取消订单
export const rentalOrderCancelOrderByUser = (data, loading = '提交中') => {
	return request({
		url: 'rentalOrder/cancelOrderByUser',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 创建订单
export const rentalOrderCreateOrders = (data, loading = '创建中') => {
	return request({
		url: 'rentalOrder/createOrders',
		method: 'POST',
		data,
		loading
	})
}

// 生成订单明细
export const rentalOrderGenerateOrder = (data, loading = '') => {
	return request({
		url: 'rentalOrder/generateOrder',
		method: 'POST',
		data,
		loading
	})
}

// 订单详情
export const rentalOrderOrderInfo = (data, loading = '') => {
	return request({
		url: 'rentalOrder/orderInfo',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 订单分页查询
export const rentalOrderPageQuery = (data, loading = '') => {
	return request({
		url: 'rentalOrder/pageQuery',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
