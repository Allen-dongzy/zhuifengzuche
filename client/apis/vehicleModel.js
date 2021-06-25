import request from '@/request'

// 根据id查询车型详情
const searchCarid = (Carid, loading = '查询中') => {
	return request({
		url: `vehicleModel/findById/${Carid}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data:{},
		loading
	})
}
// 车型新增
const insertVehicleModel = (data, loading = '新增中') => {
	return request({
		url: "vehicleModel/insert",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 车型条件分页查询
const vehicleModelPageQuery = (data, loading = ' ') => {
	return request({
		url: "vehicleModel/pageQuery",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 车型租金修改
const vehicleModelUpdate = (data, loading = '等待中') => {
	return request({
		url: "vehicleModel/rentList/update",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 车型修改
const vehicleModelUpdate = (data, loading = '等待中') => {
	return request({
		url: "vehicleModel/update",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}