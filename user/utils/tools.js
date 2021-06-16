import {
	toast
} from './uni-tools'

// 时间戳转成日期
const toDate = timestamp => {
	if (!timestamp) return false
	if (getType(timestamp) != 'number') return false
	const timeLen = timestamp.toString().length
	if (timeLen != 10 && timeLen != 13) return false
	let date = 0
	if (timeLen == 10) {
		date = new Date(timestamp * 1000) //时间戳为10位需*1000
	} else {
		date = new Date(timestamp)
	}
	const Y = add0(date.getFullYear())
	const M = add0(date.getMonth() + 1)
	const D = add0(date.getDate())
	const h = add0(date.getHours())
	const m = add0(date.getMinutes())
	const s = add0(date.getSeconds())
	return [Y, M, D, h, m, s]
}

// 计算现在到指定未来时间点的时间戳时间差
const getDifference = timeData => {
	if (!timeData.Y || !timeData.M || !timeData.D) return false
	const now = new Date().getTime()
	const future = new Date(timeData.Y, timeData.M - 1, timeData.D, timeData.h, timeData.m, timeData.s).getTime()
	const difference = future - now
	return difference
}

// 将时间戳形式的时间差转为常见时间差(倒计时推荐使用)
const durationToTime = (difference, len = 13) => {
	if (getType(difference) != 'number') return false
	if (difference <= 0) return false
	// 如果时间戳位13位则将时间戳转为10位
	if ((difference.toString()).length == 13 || len == 13) {
		difference = parseInt(difference / 1000)
	}
	const date = parseInt(difference / 86400)
	difference = difference % 86400
	const hour = parseInt(difference / 3600)
	difference = difference % 3600
	const minute = parseInt(difference / 60)
	difference = difference % 60
	const second = difference
	// 返回时间段
	return [add0(date), add0(hour), add0(minute), add0(second)]
}

// 十以内补零
const add0 = num => {
	if (!num && num[1]) return false
	num = num.toString()
	return num[1] ? num : '0' + num
}

// 类型判断
const getType = obj => {
	if (!obj) return false
	const type = typeof obj
	if (type != "object") return type
	return Object.prototype.toString.call(obj).replace(/^\[object (\S+)\]$/, '$1')
}

// 隐藏手机号
const hideMobile = mobile => {
	return `${mobile.slice(0, 3)}****${mobile.slice(7, 11)}`
}

// 写入文本到粘贴板
const setClipboard = text => {
	return new Promise((resolve, reject) => {
		// 数字没有 .length 不能执行selectText 需要转化成字符串
		const textString = text.toString()
		let input = document.querySelector('#copy-input')
		if (!input) {
			input = document.createElement('input')
			input.id = "copy-input"
			input.readOnly = "readOnly" // 防止ios聚焦触发键盘事件
			input.style.position = "absolute"
			input.style.top = "50%"
			input.style.left = "50%"
			input.style.zIndex = "-1000"
			input.style.transform = "translateX(-50%) translateY(-50%)"
			document.body.appendChild(input)
		}

		input.value = textString;
		// ios必须先选中文字且不支持 input.select()
		selectText(input, 0, textString.length)
		if (document.execCommand('copy')) {
			document.execCommand('copy')
			document.body.removeChild(input)
		} else reject('复制失败')
		input.blur()
		resolve(true)

		// input自带的select()方法在苹果端无法进行选择，所以需要自己去写一个类似的方法
		// 选择文本。createTextRange(setSelectionRange)是input方法
		function selectText (textbox, startIndex, stopIndex) {
			if (textbox.createTextRange) { //ie
				const range = textbox.createTextRange()
				range.collapse(true)
				range.moveStart('character', startIndex) //起始光标
				range.moveEnd('character', stopIndex - startIndex) //结束光标
				range.select() //不兼容苹果
			} else { //firefox/chrome
				textbox.setSelectionRange(startIndex, stopIndex)
				textbox.focus()
			}
		}
	}).then(res => [null, res]).catch(err => [err])
}

// 防抖
const debounce = (callback, delay = 500) => {
	let timer // 闭包存定时器状态
	return function () {
		let args = arguments // 携带的参数
		if (timer) clearTimeout(timer) // 清除定时器
		timer = setTimeout(() => { // 回调
			callback.apply(this, args)
		}, delay)
	}
}

// 节流
const throttle = (callback, delay = 2000) => {
	let isFirst = true
	let start = Date.now() // 闭包存起始时间
	return function () {
		let args = arguments // 携带的参数
		if (isFirst) { // 第一次触发
			callback.apply(this, args)
			start = Date.now()
			isFirst = false
			return
		}
		if (Date.now() - start > delay) { // 满足间隔时长触发
			callback.apply(this, args)
			start = Date.now()
			return
		}
		toast('操作频繁，请稍后再试！')
	}
}

export {
	toDate, // 时间戳转成日期
	getDifference, // 现在到指定时间的时间差
	durationToTime, // 时间差转时间段
	add0, // 十以内补零
	getType, // 类型判断
	hideMobile, // 隐藏手机号
	setClipboard, // 写入文本到粘贴板
	debounce, // 防抖
	throttle, // 节流
}
