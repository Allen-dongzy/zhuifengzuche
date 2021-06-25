import request from '@/request'

// 车辆品牌列表
const vehicleBrandQueryAll = (data, loading = '') => {
	return request({
		url: 'vehicleBrand/queryAll',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}