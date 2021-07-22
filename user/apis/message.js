import request from '@/request'

// 消息通知分页
export const messagePageQuery = (data, loading = '') => { // 对接
	return request({
		url: 'message/pageQuery',
		method: 'POST',
		data,
		loading
	})
}
