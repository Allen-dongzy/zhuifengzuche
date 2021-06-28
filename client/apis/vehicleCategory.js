import request from '@/request'

// 车辆类别列表
export const vehicleCategoryQueryAll = (data, loading = '') => {
	return request({
		url: 'vehicleCategory/queryAll',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}