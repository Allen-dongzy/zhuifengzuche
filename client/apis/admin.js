import request from '@/request'

// 登出功能
const adminLogout = (data, loading = '等待中') => {
	return request({
		url: "admin/logout",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}
// 添加员工
const addEmployee = (data, loading = '添加中') => {
	return request({
		url: "admin/addEmployee",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 车主注册
const adminCarOwnersRegister = (data, loading = '等待中') => {
	return request({
		url: "admin/carOwnersRegister",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 校验注册参数
export const adminCheckRegister = (data, loading = '等待中') => {
	return request({
		url: "admin/checkRegister",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
// 删除指定用户信息
const deleteUserId = (userId, loading = '删除中') => {
	return request({
		url: `admin/delete/${userId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data:{},
		loading
	})
}

// 编辑员工
const editEmployee = (data, loading = '更新中') => {
	return request({
		url: "admin/editEmployee",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 微信或支付宝登录根据code授权
const getCodeByWxCode = (data, loading = '等待中') => {
	return request({
		url: "admin/getCodeByWxCode",
		contentType: 'application/json',
		method: 'GET',
		data,
		loading
	})
}

// 获取当前登录用户信息
const getInfo = (data, loading = '') => {
	return request({
		url: "admin/info",
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data,
		loading
	})
}

// 根据用户名或姓名分页获取用户列表
const getList = (data, loading = '等待中') => {
	return request({
		url: "admin/list",
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data,
		loading
	})
}
// 根据用户名获取通用用户信息
const getLoadByUsername = (data, loading = '') => {
	return request({
		url: "admin/loadByUsername",
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data,
		loading
	})
}
// 员工端统一登录接口(登录以后返回token)
const login = (data, loading = '') => {
	return request({
		url: "admin/login",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 给用户分配角色
const update = (data, loading = '等待中') => {
	return request({
		url: "admin/role/update",
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data,
		loading
	})
}

// 获取指定用户的角色
const setspecialUserId = (userId, loading = '等待中') => {
	return request({
		url:`admin/role/${userId}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data:{},
		loading
	})
}
// 商家注册
export const shopOwnerRegister = (data, loading = '等待中') => {
	return request({
		url: "admin/shopOwnerRegister",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 同步支付宝或微信用户数据
const synchronizeUserInfo = (data, loading = '等待中') => {
	return request({
		url: "admin/synchronizeUserInfo",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 修改指定用户信息
const editUserid = (userid, loading = '等待中') => {
	return request({
		url: `admin/update/${userid}`,
		contentType: 'application/json',
		method: 'POST',
		data:{},
		loading  
	})
} 
// 忘记密码
const updatePassword = (data, loading = '等待中') => {
	return request({
		url: `admin/updatePassword`,
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 修改帐号状态
const changgeId = (id, loading = '等待中') => {
	return request({
		url: `admin/updateStatus/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data:{},
		loading
	})
}

// 获取指定用户信息
const getId = (Id, loading = '等待中') => {
	return request({
		url: `admin/${Id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data:{},
		loading
	})
}