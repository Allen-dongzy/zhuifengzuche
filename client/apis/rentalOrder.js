import request from '@/request'

//订单管理分页查询
export const getOrderPageList = (data, loading = '') => {
	return request({
		url: "rentalOrder/getOrderPageList",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

//获取订单管理状态列表与数量
export const getOrderStatus = (data, loading = '') => {
	return request({
		url: "rentalOrder/getOrderStatus",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
//订单详情
export const orderInfo = (data, loading = '等待中') => {
	return request({
		url: "rentalOrder/orderInfo",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}


//交付车辆
export const deliveryVehicleSave = (data, loading = '等待中') => {
	return request({
		url: "rentalOrder/deliveryVehicleSave",
		contentType:'application/json',
		method: 'POST',  
		data,
		loading
	})
}

//交付车辆查询
export const deliveryVehicleGet = (data, loading = '等待中') => {
	return request({
		url: "rentalOrder/deliveryVehicleGet",
		contentType:'application/x-www-form-urlencoded',
		method: 'POST',  
		data,
		loading
	})
}

//调试检测免押状态
export const depositType = (data, loading = '等待中') => {
	return request({
		url: `rentalOrder/check/depositType/${data}`,
		contentType:'application/x-www-form-urlencoded',
		method: 'GET',  
		data:{},
		loading
	})
}

//员工-查看交车情况
export const getCertificates = (data, loading = '等待中') => {
	return request({
		url: `vehicleCheck/getCertificates/${data}`,
		contentType:'application/x-www-form-urlencoded',
		method: 'POST',  
		data:{},
		loading
	})
}



