import request from '@/request'

// 发送忘记密码短信验证码
const sendForgotCode = (data, loading = '发送中') => {
	return request({
		url: "sms/sendForgotCode",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 发送注册短信验证码
const sendRegisterCode = (data, loading = '发送中') => {
	return request({
		url: "sms/sendRegisterCode",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}