import request from '@/request'

// 微信或支付宝登录根据code授权
export const getCodeByWxCode = (data, loading = '') => {
	return request({
		url: 'sso/getCodeByWxCode',
		contentType: 'application/json',
		method: 'GET',
		data,
		loading
	})
}

// 获取会员信息
export const ssoInfo = (data, loading = '') => { // 对接
	return request({
		url: 'sso/info',
		method: 'GET',
		data,
		loading
	})
}

// 登录
export const login = (data, loading = '登陆中') => { // 对接
	return request({
		url: 'sso/login',
		method: 'POST',
		data,
		loading
	})
}

// 完善信息
export const perfectInformation = (data, loading = '提交中') => {
	return request({
		url: 'sso/perfectInformation',
		method: 'POST',
		data,
		loading
	})
}

// 客户端发送登录短信验证码
export const sendLoginCode = (data, loading = '发送中') => { // 对接
	return request({
		url: 'sso/sendLoginCode',
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 同步支付宝或微信用户数据
export const synchronizeUserInfo = (data, loading = '更新中') => {
	return request({
		url: 'sso/synchronizeUserInfo',
		method: 'POST',
		data,
		loading
	})
}