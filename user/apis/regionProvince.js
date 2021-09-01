import request from '@/request'

// 查询区域(不传查询全部)
export const regionProvinceFindAreasList = (data, loading = '') => {
	return request({
		url: 'regionProvince/findAreasList',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 查询城市(不传查询全部)
export const regionProvinceFindCityList = (data, loading = '') => {
	return request({
		url: 'regionProvince/findCityList',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 根据省份编码查询省份(不传查询全部)
export const regionProvinceFindProvincesList = (data, loading = '') => {
	return request({
		url: 'regionProvince/findProvincesList',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
