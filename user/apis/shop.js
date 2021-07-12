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
