import request from '@/request'

// 根据主键查询
const breakRulesFindOneById = (id, loading = '') => {
	return request({
		url: `breakRules/findOneById/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 新增
const breakRulesInsert = (data, loading = '新增中') => {
	return request({
		url: 'breakRules/insert',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}

// 分页查询违章列表
const breakRulesPageNewQuery = (data, loading = '') => {
	return request({
		url: 'breakRules/pageNewQuery',
		contentType: 'application/json',
		method: 'POST',
		data,
		loading
	})
}
