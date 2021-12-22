import request from '@/request'

// 添加门店评价
export const evaluateAdd = (data, loading = '新增中') => {
	return request({
		url: "shop/evaluate/add",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 删除门店评价
export const evaluateDel = (data, loading = '删除中') => { // 对接
	return request({
		url: "shop/evaluate/del",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 修改门店评价
export const evaluateEdit = (data, loading = '修改中') => {
	return request({
		url: "shop/evaluate/edit",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 门店评价分页
export const evaluatePageQuery = (data, loading = '') => { // 对接
	return request({
		url: "shop/evaluate/pageQuery",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 树形菜单
export const treeList = (data, loading = '') => { // 对接
	return request({
		url: "menu/employee/tree",
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data,
		loading
	})
}

//获取注册门店详情
export const getInfo = (data, loading = '') => { // 对接
	return request({
		url: "memberShop/findInfoById/"+data,
		contentType: 'application/x-www-form-urlencoded',
		method: 'GET',
		data:'',
		loading
	}) 
}
//编辑门店
export const update = (data, loading = '') => { // 对接
	return request({
		url: "memberShop/update",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

//新增门店
export const shopOwnerRegister = (data, loading = '') => { // 对接
	return request({
		url: "admin/shopOwnerRegister",
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}