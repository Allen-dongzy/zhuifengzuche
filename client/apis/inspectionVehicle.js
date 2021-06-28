import request from '@/request'

// 新增事故记录
export const insertAccident = (data, loading = '新增中') => {
	return request({
		url: "inspectionVehicle/insertAccident",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 新增其他记录
export const insertOther = (data, loading = '新增中') => {
	return request({
		url: "inspectionVehicle/insertOther",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 分页查询记录表
export const inspectionVehiclePageQuery = (data, loading = '') => {
	return request({
		url: "inspectionVehicle/pageQuery",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
