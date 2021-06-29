import Vue from 'vue'

// 页面跳转
const open = (path, object = {}, closeSelf = 0) => {
	if (!path) return false
	let datas = ''
	// 如果第二个参数为数字类型[closeSelf]，则直接跳转。如果第二个为参数对象，则展开
	if (Object.prototype.toString.call(object) == '[object Number]') closeSelf = object
	else if (object || Object.keys(object).length !== 0) {
		for (const key in object) {
			if (object.hasOwnProperty(key)) datas += `${key}=${object[key]}&`
		}
		datas = datas.slice(0, datas.lastIndexOf('&'))
	}
	// 根据打开方式分为 跳转非tab页，关闭当前页跳转非tab页，关闭所有页跳转非tab页，跳转tab页
	switch (parseInt(closeSelf)) {
		case 0:
			uni.navigateTo({
				url: !datas ? path : `${path}?${datas}`
			})
			break;
		case 1:
			uni.redirectTo({
				url: !datas ? path : `${path}?${datas}`
			})
			break;
		case 2:
			uni.reLaunch({
				url: !datas ? path : `${path}?${datas}`
			})
			break;
		case 3:
			uni.switchTab({
				url: !datas ? path : `${path}?${datas}`
			});
			break;
	}
}

// 关闭页面
const close = (num = 1) => {
	uni.navigateBack({
		delta: num
	})
}

// 弹出一个toast轻提示
const toast = (info, isMask = false, position = 'bottom') => {
	if (!info) return false
	info = info.toString()
	uni.showToast({
		icon: 'none',
		title: info,
		mask: isMask,
		position
	})
}

// 弹出一个toast图标提示
const showToast = (info, iconType = 0, isMask = true, position = 'center') => {
	if (!info) return false
	const icons = ['success', 'loading']
	uni.showToast({
		icon: icons[iconType],
		title: info,
		mask: isMask,
		position
	});
}

// 弹出一个loading
const showLoading = (title = '', isMask = true) => {
	uni.showLoading({
		title,
		mask: isMask
	});
}

// 弹出一个模态框
const showModal = ({
	content,
	title = '提示',
	showCancel = true,
	confirmText = '确定',
	cancelText = '取消'
}) => {
	if (!content) return false
	return new Promise((resolve, reject) => {
		uni.showModal({
			title,
			content,
			showCancel,
			confirmText,
			cancelText,
			success(res) {
				if (res.confirm) resolve(0)
				else if (res.cancel) resolve(1)
			},
			fail(err) {
				reject(err)
			}
		});
	}).then(res => [null, res]).catch(err => [err])
}

// 选择图片-相机/相册
const chooseImgs = (count = 1, type = 'all', origin = false) => {
	let sourceType = ['album', 'camera']
	if (type == 'album') sourceType = ['album']
	else if (type == 'camera') sourceType = ['camera']
	return new Promise((resolve, reject) => {
		uni.chooseImage({
			count: count, // 相册下的可选图片个数
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType, // 从相册选择或相机拍摄
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	}).then(res => {
		if (origin) return [null, res]
		else return [null, res.tempFilePaths]
	}).catch(err => {
		return [err]
	})
}

// 上传文件(配合config使用)
const uploadFiles = async tempFilePaths => {
	const config = await import('@/request/config').then((res) => res.default)
	return new Promise((resolve, reject) => {
		let imgArr = []
		for (let i = 0; i < tempFilePaths.length; i++) {
			uni.uploadFile({
				header: {
					'Content-Type': 'multipart/form-data'
				},
				url: `${config.host}/${config.apiKeyword}/${config.uploadImgUrl}`, //上传接口
				filePath: tempFilePaths[i],
				name: 'file',
				success: (res) => {
					const url = JSON.parse(res.data).data
					imgArr.push(url);
					if (imgArr.length === tempFilePaths.length) resolve(imgArr)
				},
				fail: (err => reject(err))
			});
		}
	}).then(res => [null, res]).catch(err => [err])
}

// 预览图片
const previewImgs = (urls, current = 0) => {
	if (!urls) return false
	return new Promise((resolve, reject) => {
		uni.previewImage({
			current, // 当前要显示图片的链接/索引值
			urls,
			indicator: 'number',
			loop: false,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	}).then(res => [null, res]).catch(err => [err])
}


// 列表公共处理(可选配置)
const listManager = (list, page, limit, config) => {
	let dataStatus = 'more' // 数据状态 more下拉前 loading下拉前 noMore下拉后-没有更多 noData下拉后-暂无数据
	let requestKey = true // 请求开关
	let isRender = true // 决定本次是否请求
	let listType = 'other' // 判断列表类型(有时候是对象而非数组)
	if (Object.prototype.toString.apply(list) === '[object Object]') listType = 'object'
	else if (Object.prototype.toString.apply(list) === '[object Array]') listType = 'array'
	else return
	// 获取列表长度
	let listLen = (config && config.listLength) || (listType == 'array' ? list.length : Object.keys(list).length)
	if (listLen == 0 && page == 1) { // 列表无数据 关闭请求
		dataStatus = 'noData'
		requestKey = false
		isRender = false
	} else if (listLen == 0 && page > 1) { // 本次暂无数据 关闭请求
		dataStatus = 'noMore'
		requestKey = false
		isRender = false
	} else if (listLen > 0 && listLen < limit) { // 下次暂无数据 渲染本次 关闭请求
		dataStatus = 'noMore'
		requestKey = false
	} else dataStatus = 'more'
	return {
		dataStatus,
		requestKey,
		isRender
	}
}

// 获取app版本号
const getVersion = () => {
	// #ifdef APP-PLUS
	return new Promise((resolve, reject) => {
		plus.runtime.getProperty(plus.runtime.appid, (wgtinfo) => {
			if (wgtinfo && wgtinfo.version) resolve(wgtinfo.version)
			else reject('获取失败')
		})
	}).then(res => [null, res]).catch(err => [err])
	// #endif
}

// 清除缓存
const clearCache = () => {
	let that = this;
	let os = plus.os.name;
	uni.showLoading({
		title: '清除中'
	})
	if (os == 'Android') {
		let main = plus.android.runtimeMainActivity();
		let sdRoot = main.getCacheDir();
		let files = plus.android.invoke(sdRoot, "listFiles");
		let len = files.length;
		if (len <= 0) {
			setTimeout(() => {
				uni.hideLoading()
				uni.showToast({
					title: '缓存清理完成',
					duration: 2000,
					icon: 'none'
				});
			}, 1000)
			return
		}
		for (let i = 0; i < len; i++) {
			let filePath = '' + files[i]; // 没有找到合适的方法获取路径，这样写可以转成文件路径  
			plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
				if (entry.isDirectory) {
					entry.removeRecursively(function(entry) { //递归删除其下的所有文件及子目录  
						uni.hideLoading()
						uni.showToast({
							title: '缓存清理完成',
							duration: 2000,
							icon: 'none'
						});
						that.formatSize(); // 重新计算缓存  
					}, function(e) {
						uni.hideLoading()
						console.log(e.message)
					});
				} else {
					uni.hideLoading()
					entry.remove();
				}
			}, function(e) {
				uni.hideLoading()
				console.log('文件路径读取失败')
			});
		}
	} else { // ios暂时未找到清理缓存的方法，以下是官方提供的方法，但是无效，会报错  
		plus.cache.clear(function() {
			uni.showToast({
				title: '缓存清理完成',
				duration: 2000,
				icon: 'none'
			});
			that.formatSize();
		});
	}
}

// 挂载uni小工具
Vue.prototype.$open = open
Vue.prototype.$close = close
Vue.prototype.$toast = toast
Vue.prototype.$showLoading = showLoading
Vue.prototype.$showModal = showModal

// 导出
export {
	open, // 页面跳转
	close, // 关闭页面
	toast, // 弹一个toast轻提示
	showToast, // 弹一个toast图标提示
	showLoading, // 弹一个loading
	showModal, // 弹一个模态框
	chooseImgs, // 选择图片
	uploadFiles, // 上传文件
	previewImgs, // 预览图片
	listManager, // 列表公共处理
	getVersion, // 获取app版本号
	clearCache, // 清除缓存
}
