import request from '@/request'

// 添加银行卡
export const bankCardAdd = (data, loading = '添加中') => { // 对接
	return request({
		url: 'bankCard/add',
		method: 'POST',
		data,
		loading
	})
}

// 删除银行卡
export const bankCardDel = (data, loading = '删除中') => { // 对接
	return request({
		url: 'bankCard/del',
		method: 'POST',
		data,
		loading
	})
}

// 编辑银行卡
export const bankCardEdit = (data, loading = '提交中') => { // 对接
	return request({
		url: 'bankCard/edit',
		method: 'POST',
		data,
		loading
	})
}

// 查询银行卡列表
export const bankCardList = (data, loading = '') => { // 对接
	return request({
		url: 'bankCard/list',
		method: 'GET',
		data,
		loading
	})
}