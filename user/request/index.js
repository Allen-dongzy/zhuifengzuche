import md5 from 'js-md5'
import config from '@/request/config'
import {
	open,
	toast,
	showLoading
} from '@/utils/uni-tools'

// 请求类型
const Methods = ['GET', 'POST', 'PUT', 'DELETE']

// 请求状态
const Status = {
	200: '',
	201: '该操作已创建！',
	401: '请重新登录！',
	402: '账号或密码错误！',
	403: '禁止访问！',
	404: '未找到资源！',
	500: '',
	999: '未知的状态'
}

// 请求
const request = async (params) => {
	// 调用请求控制器
	return await requestController(params)
}

// 请求控制器
const requestController = async (params) => {
	// 设置请求地址
	params = setUrl(params)
	// 设置请求动词
	params = setRquestMethod(params)
	// 设置请求头信息
	params = setRquestHeader(params)
	// 设置请求体信息
	params = setRquestData(params)
	// 生成签名
	params = await calculateMD5(params)
	// 通信之前
	params = commBefore(params)
	// 通信
	params = await comm(params)
	// 通信之后
	return commAfter(params)
}

// 设置请求地址
const setUrl = params => {
	// 根据不同场景设置地址
	if (config.apiVersion) {
		params.url = `${config.host}/${params.apiVersion}/${config.apiKeyword}/${params.url}`
	} else {
		params.url = `${config.host}/${config.apiKeyword}/${params.url}`
	}
	return params
}

// 设置请求动词
const setRquestMethod = params => {
	let method = params.method.toUpperCase()
	if (~Methods.indexOf(method)) method = 'GET'
	params.method = method
	return params
}

// 设置请求头信息
const setRquestHeader = params => {
	// 设置header-content-type
	let contentType = ''
	if (params.method === "GET") {
		contentType = "application/x-www-form-urlencoded;charset=UTF-8"
	} else {
		contentType = "application/json;charset=UTF-8"
	}
	params.header['Content-Type'] = contentType
	return params
}

// 设置请求体信息
const setRquestData = params => {
	// 空参数处理
	if (params.data === '' || params.data === null) params.data = {}
	return params
}

// md5加密生成签名
const calculateMD5 = (params) => {
	const obj = params.data
	return new Promise(resolve => {
		const key = config.secretKey
		let sign = ''
		if (Object.prototype.toString.call(obj) != '[object Object]' || Object.kes(obj).length === 0) {
			// 如果不是对象,也就是说使用的GET和DELETE请求,那么不用加密,直接返回空,如果是空对象也返回空
			sign = key + '--' + key
		} else {
			// 非空对象进行逐一加密
			Object.keys(obj).sort().forEach((k) => {
				sign += key + k + '--' + obj[k] + key
			})
		}
		resolve(md5(sign).toUpperCase());
	}).then(res => {
		params.md5Sign = res
		return params
	})
}

// 通信之前
const commBefore = params => {
	// 防止表单重复提交
	let info = ''
	if (!params.isLoading) return
	if (params.method === 'GET') info = '请求中...'
	else if (params.method === 'POST') info = '提交中...'
	showLoading(info)
	return params
}


// 通信
const comm = async params => {
	// 请求
	const [err, res] = await uni.request({
		header: params.header,
		url: params.url,
		method: params.method,
		data: params.data,
		timeout: 20000
	})
	params.res = res
	params.err = err
	return params
}

// 通讯之后
const commAfter = params => {
	// 若在loading状态则隐藏loading
	if (params.isLoading) uni.hideLoading()
	// 通信合集
	let returnResult = []
	// 通信结果
	if (params.res) {
		returnResult = codeManager(params.res)
	} else {
		returnResult = [params.err]
		if (err.errMsg === 'request:fail timeout' || err.errMsg === 'request:fail ') {
			toast('网络请求超时，请稍后重试！')
		} else if (Object.prototype.toString.call(err.message) === '[object String]') {
			toast(err.message)
		}
	}
	return returnResult
}

// 状态管理
const codeManager = (res) => {
	let code = parseInt(res.data.code)
	// 通信合集
	let returnResult = []
	//返回状态：200返回成功，401重新登录，422后端返回报错，500请求异常
	switch (code) {
		case 200:
			returnResult = [null, res.data]
			break
		case 201:
		case 401:
		case 402:
		case 403:
		case 404:
			returnResult = [res.data]
			break
		case 500:
			const message = res.data.message
			if (Object.prototype.toString.call(message) === '[object String]') Status[code] = message
			returnResult = [res.data]
			break
		default:
			code = 999
			returnResult = [res.data]
	}
	if (Status[code]) toast(Status[code])
	return returnResult
}

export default request
