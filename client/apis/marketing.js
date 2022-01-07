import request from '@/request'

// 租几送几车型列表
export const rentActivity = (data, loading = '等待中') => {  // 对接
	return request({
		url: "marketing/rentActivity",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 限时优惠车型列表
export const limited = (data, loading = '等待中') => {  // 对接
	return request({
		url: "marketing/listOfLimitedTimeOffers/pageQuery",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 优惠券列表
export const couponList = (data, loading = '等待中') => {  // 对接
	return request({
		url: "marketing/couponList",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 租几送几设置
export const rentSet = (data, loading = '等待中') => {  // 对接
	return request({
		url: "marketing/rentSet",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 限时优惠设置
export const listOfLimitedTimeOffers = (data, loading = '等待中') => {  // 对接
	return request({
		url: "marketing/listOfLimitedTimeOffers/save",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 优惠券设置
export const couponAdd = (data, loading = '等待中') => {  // 对接
	return request({
		url: "marketing/couponAdd",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 优惠券详情
export const couponinfo = (id, loading = '查询中') => {
	return request({
		url: `marketing/couponDetail/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data:{},
		loading
	})
}
// 优惠券详情
export const couponDel = (id, loading = '查询中') => {
	return request({
		url: `marketing/couponDel/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data:{},
		loading
	})
}
//赠送节点列表
export const couponNodeList = (id, loading = '查询中') => {
	return request({
		url: "marketing/couponNodeList",
		contentType: 'application/json',
		method: 'POST',
		data:{},
		loading
	})
}
//使用对象列表
export const userVip = (id, loading = '查询中') => {
	return request({
		url: "marketing/userVip",
		contentType: 'application/json',
		method: 'POST',
		data:{},
		loading
	})
}
