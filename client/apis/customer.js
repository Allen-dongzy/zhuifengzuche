import request from '@/request'

// 添加客户记录
const recordsAdd = (data, loading = '添加中') => {
	return request({
		url: "customer/records/add",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 调试编辑客户记录
const recordsEdit = (data, loading = '更新中') => {
	return request({
		url: "customer/records/edit",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 客户记录分页
const recordsPageQuery = (data, loading = '') => {
	return request({
		url: "customer/records/pageQuery",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}