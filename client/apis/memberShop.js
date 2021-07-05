import request from '@/request'

// 开启/关闭门店
export const memberShopChangeStatus = (memberShopId, loading = '') => { // 对接
	return request({
		url: `memberShop/changeStatus/${memberShopId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 查看门店详情(带图片)
export const memberShopFindInfoById = (memberShopId, loading = '') => { // 对接
	return request({
		url: `memberShop/findInfoById/${memberShopId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data: {},
		loading
	})
}

// 门店分页
export const memberShopPageQuery = (data, loading = '') => { // 对接
	return request({
		url: 'memberShop/pageQuery',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
