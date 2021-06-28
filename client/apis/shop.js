import request from '@/request'

// 添加门店评价
export const evaluateAdd = (data, loading = '新增中') => {
	return request({
		url: "shop/evaluate/add",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 删除门店评价
export const evaluateDel = (data, loading = '删除中') => {
	return request({
		url: "shop/evaluate/del",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 修改门店评价
export const evaluateEdit = (data, loading = '修改中') => {
	return request({
		url: "shop/evaluate/edit",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 门店评价分页
export const evaluatePageQuery = (data, loading = '') => {
	return request({
		url: "shop/evaluate/pageQuery",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
