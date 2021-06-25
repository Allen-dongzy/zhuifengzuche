import request from '@/request'

// 删除送车点
const deliveryDelete = (data, loading = '删除中') => {
	return request({
		url: 'delivery/delete',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 条件分页查询列表
const deliveryPageQuery = (data, loading = '') => {
	return request({
		url: 'delivery/pageQuery',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 新增送车点
const deliverySave = (data, loading = '新增中') => {
	return request({
		url: 'delivery/save',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 编辑送车点
const deliveryUpdate = (data, loading = '提交中') => {
	return request({
		url: 'delivery/update',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
