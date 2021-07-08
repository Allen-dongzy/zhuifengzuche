import request from '@/request'

// 门店分页查询
export const memberShopPageQuery = (data, loading = '') => {
	return request({
		url: 'memberShop/pageQuery',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

