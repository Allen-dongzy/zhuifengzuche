import request from '@/request'

// 修改车辆状态
export const vehicleChangeStatus = (vehicleId, vehicleStatus, loading = '修改中') => {
	return request({
		url: `vehicle/changeStatus/${vehicleId}/${vehicleStatus}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 车辆新增
export const vehicleInsert = (data, loading = '新增中') => {
	return request({
		url: 'vehicle/insert',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 车辆管理租赁计划条件分页查询
export const vehiclePageLeaseQuery = (data, loading = '') => {
	return request({
		url: 'vehicle/pageLeaseQuery',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 车辆管理首页条件分页查询
export const vehiclePageQuery = (data, loading = '') => {
	return request({
		url: 'vehicle/pageQuery',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 车辆租赁计划预留
export const vehiclePlanInsert = (data, loading = '') => {
	return request({
		url: 'vehicle/planInsert',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 根据车辆主键查询
export const vehicleSelectOne = (id, loading = '') => {
	return request({
		url: `vehicle/selectOne/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		loading
	})
}

// 车辆详情租赁计划列表
export const vehicleSelectRentalPlanList = (vehicleId, loading = '') => {
	return request({
		url: `vehicle/selectRentalPlanList/${vehicleId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 车辆修改
export const vehicleUpdate = (data, loading = '修改中') => {
	return request({
		url: 'vehicle/update',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 车辆列表
export const vehicleQueryAll = (data, loading = '') => { // 对接
	return request({
		url: 'vehicle/queryAll',
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data,
		loading
	})
}

// 检验收车
export const backCar = (data, loading = '') => { // 对接
	return request({
		url: `return/vehicle/${data}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data:{},
		loading
	})
}

// 结算
export const settlement = (data, loading = '') => { // 对接
	return request({
		url: 'return/vehicle',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 结算
export const dataEcho = (data, loading = '') => { // 对接
	return request({
		url: `return/vehicle/dataEcho/${data}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data:{},
		loading
	})
}
