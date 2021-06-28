import request from '@/request'

// 非权限-查询区域
const allFindAreasList = (data, loading = '') => {
	return request({
		url: "regionProvince/all/findAreasList",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 非权限-查询城市
const allFindCityList = (data, loading = '') => {
	return request({
		url: "regionProvince/all/findCityList",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 非权限-查询省份
const allFindProvincesList = (data, loading = '') => {
	return request({
		url: "regionProvince/all/findProvincesList",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 权限-查询区域
const findAreasList = (data, loading = '') => {
	return request({
		url: "regionProvince/findAreasList",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 权限-查询城市
const findCityList = (data, loading = '') => {
	return request({
		url: "regionProvince/findCityList",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 权限-查询省份
const findProvincesList = (data, loading = '') => {
	return request({
		url: "regionProvince/findProvincesList",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
