import request from '@/request'

// 添加银行卡
export const bankCardAdd = (data, loading = '添加中') => { // 对接
	return request({
		url: 'bankCard/add',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 删除银行卡
export const bankCardDel = (data, loading = '删除中') => { // 对接
	return request({
		url: 'bankCard/del',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 编辑银行卡
export const bankCardEdit = (data, loading = '提交中') => { // 对接
	return request({
		url: 'bankCard/edit',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 银行卡列表
export const bankCardList = (data, loading = '') => { // 对接
	return request({
		url: 'bank/list',
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data,
		loading
	})
}

// 查询单张银行卡
export const bankCard = (id, loading = '') => { // 对接
	return request({
		url: `bankCard/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data: {},
		loading
	})
}
