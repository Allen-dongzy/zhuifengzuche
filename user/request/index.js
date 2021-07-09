import md5 from 'js-md5'
import config from '@/request/config'
import storage from '@/utils/storage'
import store from '@/store'
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
	401: '该操作未经授权！',
	403: '该操作被禁止！',
	404: '未找到资源！',
	500: '操作异常',
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
	if (!~Methods.indexOf(method)) method = 'GET'
	params.method = method
	return params
}

// 设置请求头信息
const setRquestHeader = params => {
	params.header = {}
	// 设置content-type
	if (params.contentType) {
		params.header['Content-Type'] = params.contentType
		delete params.contentType
	} else if (params.method === "GET") {
		params.header['Content-Type'] = "application/x-www-form-urlencoded"
	} else {
		params.header['Content-Type'] = "application/json"
	}
	// 设置token
	if (storage.get('token')) params.header.Authorization = storage.get('token')
	return params
}

// 设置请求体信息
const setRquestData = params => {
	// 空参数处理
	if (params.data === '' || params.data === null || params.data === undefined) params.data = {}
	return params
}

// md5加密生成签名
const calculateMD5 = (params) => {
	const obj = params.data
	return new Promise(resolve => {
		const key = config.secretKey
		let sign = ''
		if (Object.prototype.toString.call(obj) != '[object Object]' || Object.keys(obj).length === 0) {
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
	// loading提示
	if (!params.loading) return params
	showLoading(params.loading)
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
	if (params.loading) uni.hideLoading()
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
	const code = parseInt(res.data.code)
	// 通信合集
	let returnResult = []
	//返回状态
	if (code === 200) {
		returnResult = [null, res.data]
	} else {
		const message = res.data.message
		if (Object.prototype.toString.call(message) === '[object String]') Status[code] = message
		returnResult = [res.data]
			console.log(code) 
		if (code === 401) open('/pages/common/login')
	}
	if (Status[code]) {
		store.commit("user/clearInfo")
		storage.remove('token')
		toast(Status[code])
	}
	return returnResult
}

export default request
