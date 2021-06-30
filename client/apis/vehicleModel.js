import request from '@/request'

// 根据id查询车型详情
export const searchCarid = (Carid, loading = '查询中') => {
	return request({
		url: `vehicleModel/findById/${Carid}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data:{},
		loading
	})
}
// 车型新增
export const insertVehicleModel = (data, loading = '新增中') => {
	return request({
		url: "vehicleModel/insert",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 车型条件分页查询
export const vehicleModelPageQuery = (data, loading = ' ') => { //对接
	return request({
		url: "vehicleModel/pageQuery",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 车型租金修改
export const vehicleModelPrice = (data, loading = '等待中') => {
	return request({
		url: "vehicleModel/rentList/update",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 车型修改
export const vehicleModelUpdate = (data, loading = '等待中') => {
	return request({
		url: "vehicleModel/update",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 车辆排量列表
export const outputVolume = (data, loading = '') => { //对接
	return request({
		url: "outputVolume/queryAll",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 车辆排量列表
export const queryAll = (data, loading = '') => { //对接
	return request({
		url: "vehicleModel/queryAll",
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data,
		loading
	})
}

