import request from '@/request'

// 获取该用户可以使用的优惠券（按照优惠金额倒序排列）
export const findIsUseCouponByUser = (data, loading = '') => { // 对接
	return request({
		url: 'coupon/findIsUseCouponByUser',
		method: 'GET',
		data,
		loading
	})
}

// 获取用户可以领取的新人券
export const findNewCoupon = (data, loading = '') => { // 对接
	return request({
		url: 'coupon/findNewCoupon',
		method: 'GET',
		data,
		loading
	})
}

// 领取单张优惠券
export const getCouponById = (data, loading = '领取中') => { // 对接
	return request({
		url: 'coupon/getCouponById',
		method: 'GET',
		data,
		loading
	})
}

// 一键领取该用户可以领取的新人券
export const oneClickReceiveNewCoupons = (data, loading = '领取中') => { // 对接
	return request({
		url: 'coupon/oneClickReceiveNewCoupons',
		method: 'GET',
		data,
		loading
	})
}

// 分页查询用户的优惠券
export const couponQueryPage = (data, loading = '') => { // 对接
	return request({
		url: 'coupon/queryPage',
		method: 'GET',
		data,
		loading
	})
}
