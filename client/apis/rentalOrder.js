import request from '@/request'

//订单管理分页查询
const getOrderPageList = (data, loading = '') => {
	return request({
		url: "rentalOrder/getOrderPageList",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

//获取订单管理状态列表与数量
const getOrderStatus = (data, loading = '') => {
	return request({
		url: "rentalOrder/getOrderStatus",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
//订单详情
const orderInfo = (data, loading = '等待中') => {
	return request({
		url: "rentalOrder/orderInfo",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}