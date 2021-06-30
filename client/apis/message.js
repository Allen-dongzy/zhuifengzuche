import request from '@/request'

// 添加消息通知
export const messageAdd = (data, loading = '新增中') => {
	return request({
		url: "message/add",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 删除消息通知
export const messageDel = (data, loading = '删除中') => {
	return request({
		url: "message/del",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 编辑消息通知
export const messageEdit = (data, loading = '更新中') => {
	return request({
		url: "message/edit",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

//  消息通知分页
export const messagePageQuery = (data, loading = '') => { // 对接
	return request({
		url: "message/pageQuery",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

//  消息通知总数
export const messageCount = (data, loading = '') => { // 对接
	return request({
		url: "message/count",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
