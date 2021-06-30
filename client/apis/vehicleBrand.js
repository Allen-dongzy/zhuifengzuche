import request from '@/request'

// 车辆品牌列表
export const vehicleBrandQueryAll = (data, loading = '') => { //对接
	return request({
		url: 'vehicleBrand/queryAll',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}