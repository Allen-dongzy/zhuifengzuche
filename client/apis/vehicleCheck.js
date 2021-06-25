import request from '@/request'

// 出车检验-点击完成
const addOrderDelivery = (data, loading = '检验中') => {
	return request({
		url: 'vehicleCheck/addOrderDelivery',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 记录车辆检验
const addRecord = (data, loading = '记录中') => {
	return request({
		url: 'vehicleCheck/addRecord',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 记录检验备注
const addRemarks = (data, loading = '记录中') => {
	return request({
		url: 'vehicleCheck/addRemarks',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 修改车辆里程/油量
const changeOilOrMileage = (data, loading = '修改中') => {
	return request({
		url: 'vehicleCheck/changeOilOrMileage',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 车辆物件列表
const queryGoods = (vehicleId, orderId, loading = '修改中') => {
	return request({
		url: `vehicleCheck/queryGoods/${vehicleId}/${orderId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
