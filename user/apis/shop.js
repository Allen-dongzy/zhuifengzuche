import request from '@/request'

// 门店分页查询
export const shopEvaluatePageQueryById = (data, loading = '') => { // 对接
	return request({
		url: 'shop/evaluate/pageQueryById',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 添加门店评价
export const shopEvaluateAdd = (data, loading = '提交中') => { // 对接
	return request({
		url: 'shop/evaluate/add',
		method: 'POST',
		data,
		loading
	})
}

// 订单门店分页查询
export const shopEvaluatePageQuery = (data, loading = '') => { // 对接
	return request({
		url: 'shop/evaluate/pageQuery',
		method: 'POST',
		data,
		loading
	})
}
