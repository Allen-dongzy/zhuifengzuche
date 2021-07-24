import request from '@/request'

// 门店分页查询
export const memberShopPageQuery = (data, loading = '') => { // 对接
	return request({
		url: 'memberShop/pageQuery',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 门店信息
export const memberShop = (id, loading = '') => { // 对接
	return request({
		url: `memberShop/${id}`,
		method: 'GET',
		data: {},
		loading
	})
}
