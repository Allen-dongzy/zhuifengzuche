import request from '@/request'

// 分页查询违章列表
export const deliveryFindDeliveryPage = (data, loading = '') => { // 对接
	return request({
		url: 'delivery/findDeliveryPage',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 根据城市编码查询最近的送车点
export const deliveryFindNearDelivery = (data, loading = '') => {
	return request({
		url: 'delivery/findNearDelivery',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 根据送车点查询下面门店列表
export const deliveryFindShop = (data, loading = '') => {
	return request({
		url: 'delivery/findShop',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
