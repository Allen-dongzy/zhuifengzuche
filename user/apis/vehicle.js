import request from '@/request'

// 车况概览-添加备注
export const vehicleAddRemarks = (data, loading = '提交中') => { // 对接
	return request({
		url: 'vehicle/addRemarks',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 租赁合同
export const vehicleGetVehicleCertificatess = (data, loading = '') => { // 对接
	return request({
		url: 'vehicle/getVehicleCertificates',
		method: 'GET',
		data,
		loading
	})
}

// 根据租车时间获取该车的租金
export const vehicleGetVehiclePrice = (data, loading = '') => {
	return request({
		url: 'vehicle/getVehiclePrice',
		method: 'POST',
		data,
		loading
	})
}

// 查询分页列表
export const vehiclePageQuery = (data, loading = '') => { // 对接
	return request({
		url: 'vehicle/pageQuery',
		method: 'POST',
		data,
		loading
	})
}

// 车辆品牌列表
export const vehicleQueryVehicleBrands = (data, loading = '') => { // 对接
	return request({
		url: 'vehicle/queryVehicleBrands',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 车辆类别列表
export const vehicleQueryVehicleCategorys = (deliveryId, loading = '') => { // 对接
	return request({
		url: `vehicle/queryVehicleCategorys/${deliveryId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 根据车型id查询租金列表
export const vehicleQueryVehicleModelRentList = (vehicleModelId, loading = '') => { // 对接
	return request({
		url: `vehicle/queryVehicleModelRentList/${vehicleModelId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 根据门店id和品牌id查车型列表
export const vehicleQueryVehicleModels = (deliveryId, brandId, loading = '') => { // 对接
	return request({
		url: `vehicle/queryVehicleModels/${deliveryId}/${brandId}/`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 车辆租赁计划列表
export const vehicleQuerySelectRentalPlanList = (vehicleId, loading = '') => { // 对接
	return request({
		url: `vehicle/selectRentalPlanList/${vehicleId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 租赁合同-签名
export const vehicleUpdateVehicleCertificates = (data, loading = '') => { // 对接
	return request({
		url: 'vehicle/updateVehicleCertificates',
		method: 'GET',
		data,
		loading
	})
}

// 车况概览
export const vehicleVehiclePreview = (vehicleId, orderId, loading = '') => { // 对接
	return request({
		url: `vehicle/vehiclePreview/${vehicleId}/${orderId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}
