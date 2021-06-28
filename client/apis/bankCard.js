import request from '@/request'

// 添加银行卡
export const bankCardAdd = (data, loading = '添加中') => {
	return request({
		url: 'bankCard/add',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 删除银行卡
export const bankCardDel = (data, loading = '删除中') => {
	return request({
		url: 'bankCard/del',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 编辑银行卡
export const bankCardEdit = (data, loading = '提交中') => {
	return request({
		url: 'bankCard/edit',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
