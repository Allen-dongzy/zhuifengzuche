import request from '@/request'

// 推荐车辆列表
export const getVehicles = (data, loading = '') => {  // 对接
	return request({
		url: "advertise/getVehicles",
		method: 'GET',
		data,
		loading
	})
}

// 显示文本
export const getAdvertise = (data, loading = '') => {  // 对接
	return request({
		url: "advertise/getAdvertise",
		method: 'GET',
		data,
		loading
	})
}