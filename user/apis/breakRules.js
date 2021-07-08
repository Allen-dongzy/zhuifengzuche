import request from '@/request'

// 根据主键查询
export const breakRulesFindOneById = (id, loading = '') => { //对接
	return request({
		url: `breakRules/findOneById/${id}`,
		contentType: 'application/x-www-form-urlencoded',
		method: 'POST',
		data: {},
		loading
	})
}

// 分页查询违章列表
export const breakRulesPageNewQuery = (data, loading = '') => { //对接
	return request({
		url: 'breakRules/pageNewQuery',
		method: 'POST',
		data,
		loading
	})
}
