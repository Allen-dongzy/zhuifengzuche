import request from '@/request'

// 查询所有城市
export const regionCityFindAllCity = (data, loading = '') => { // 对接
	return request({
		url: 'regionCity/findAllCity',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 通过区域码查询所在城市
export const regionCityFindCityByAreaCode = (data, loading = '') => {
	return request({
		url: 'regionCity/findCityByAreaCode',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 根据经纬度查询城市
export const regionCityFindCityByLatLng = (data, loading = '') => { // 对接
	return request({
		url: 'regionCity/findCityByLatLng',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 查询城市下有送车点的的区域
export const regionCityFindDeliveryArea = (data, loading = '') => {
	return request({
		url: 'regionCity/findDeliveryArea',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 查询热门城市
export const regionCityFindHotCity = (data, loading = '') => { // 对接
	return request({
		url: 'regionCity/findHotCity',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
