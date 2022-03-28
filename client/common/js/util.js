import config from './config.js'

/**
 * 防抖
 * fn是事件触发执行的函数
 * wait是指等待时长，在wait时间内多次触发函数只会被执行一次
 * immediate是否立即执行，true表示wait秒内触发只会执行第一次触发；false表示wait秒内触发只会执行最后一次触发
 */
function debounce(fn, wait = 1000, immediate = false) {
	var timeout;
	return function() {
		let ctx = this;
		let args = arguments;
		if (timeout) clearTimeout(timeout);
		if (immediate) {
			let callNow = !timeout;
			// wait秒后清除定时器
			timeout = setTimeout(() => {
				timeout = null;
			}, wait);
			// 先执行函数
			if (callNow) fn.apply(ctx, args)
		} else {
			// wait秒后执行fn
			timeout = setTimeout(() => {
				fn.apply(ctx, args)
			}, wait);
		}
	}
}

/**
 * 节流
 * fn是事件触发执行的函数
 * wait是指间隔时长，在wait时间内多次触发函数只会被执行一次
 * timeStamp: true时间戳版，false定时器版
 */
function throttle(fn, wait = 1000, timeStamp = false) {
	let previous = 0;
	let timeout;
	return function() {
		let ctx = this;
		let args = arguments;
		if (timeStamp) {
			let now = Date.now();
			if (now - previous > wait) {
				fn.apply(ctx, args);
				previous = now;
			}
		} else {
			if (!timeout) {
				timeout = setTimeout(() => {
					timeout = null;
					fn.apply(ctx, args)
				}, wait)
			}
		}
	}
}

/**
 * 手机格式正则验证
 */
function checkPhone(phone) {
	const myreg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
	if (!myreg.test(phone)) {
		return false;
	} else {
		return true;
	}
}

/**
 * 验证电话和手机号码和400号码
 * 电话格式：XXX-XXXXXXXX
 * 400号码格式：400-XXX-XXXX
 * @param {Object} phone
 */
function checkPhone2(phone) {
	var reg =
		/(^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$)|(^((\(\d{3}\))|(\d{3}\-))?(1[3578]\d{9})$)|(^(400)-(\d{3})-(\d{4})(.)(\d{1,4})$)|(^(400)-(\d{3})-(\d{4}$))/;
	return reg.test(phone)
}

/**
 * 动态域名配置
 */
function fileUrl(url) {
	const path = config.filePath;
	return `${path}${url}?s=251`
}

/**
 * 二维码生成
 */
function QR(url) {
	const path = config.qrPath;
	return (path + url);
}

/**
 * 上传图片
 */
function uploadImage(path) {
	const token = uni.getStorageSync('token');
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: config.uploadPath, //仅为示例，非真实的接口地址
			filePath: path,
			name: 'file',
			header: {
				'Authorization': ('Bearer ' + token),
			},
			success: (res) => {
				resolve(res);
			},
			fail(err) {
				console.log(err)
				reject(err);
			}
		});
	});
}

/**
 * 等待上传文件
 * @param {Object} fileList
 */
async function awaitUpload(fileList) {
	for (let i = 0; i < fileList.length; i++) {
		let obj = await uploadImage(fileList[i]);
		obj = JSON.parse(obj.data);
		fileList.splice(i, 1, obj.data);
	}
	return fileList;
}

/**
 * 时间日期转年月日格式
 */
function getDateTime(time) {
	let date = new Date(time);
	return (date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日 ' + date.getHours() + ':' +
		date.getMinutes() + ':' + date.getSeconds());
}

/**
 * 时间转日期格式
 */
function getTimeToDate(time) {
	let date = new Date(time);
	return (date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日');
}

/**
 * 绘制圆角矩形
 * @param {CanvasContext} ctx canvas上下文
 * @param {number} x 圆角矩形选区的左上角 x坐标
 * @param {number} y 圆角矩形选区的左上角 y坐标
 * @param {number} w 圆角矩形选区的宽度
 * @param {number} h 圆角矩形选区的高度
 * @param {number} r 圆角的半径,就是border-radius
 */
function roundRect(ctx, x, y, w, h, r) {
	// 开始绘制
	ctx.beginPath()
	// 因为边缘描边存在锯齿，最好指定使用 transparent 填充
	// 这里是使用 fill 还是 stroke都可以，二选一即可
	// ctx.setFillStyle('transparent')
	ctx.setStrokeStyle('transparent')
	// 左上角
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)

	// border-top
	ctx.moveTo(x + r, y)
	ctx.lineTo(x + w - r, y)
	ctx.lineTo(x + w, y + r)
	// 右上角
	ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)

	// border-right
	ctx.lineTo(x + w, y + h - r)
	ctx.lineTo(x + w - r, y + h)
	// 右下角
	ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)

	// border-bottom
	ctx.lineTo(x + r, y + h)
	ctx.lineTo(x, y + h - r)
	// 左下角
	ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)

	// border-left
	ctx.lineTo(x, y + r)
	ctx.lineTo(x + r, y)

	// 这里是使用 fill 还是 stroke都可以，二选一即可，但是需要与上面对应
	// ctx.fill();
	ctx.stroke();
	ctx.closePath();
	// 剪切
	ctx.clip();
}

/**
 * 绘制圆形图片
 * @param {Object} ctx canvas上下文
 * @param {Object} x x坐标
 * @param {Object} y y坐标
 * @param {Object} size 半径
 * @param {Object} img 本地图片地址
 */
function roundArc(ctx, x, y, size, img) {
	ctx.save(); // 先保存状态 已便于画完圆再用
	ctx.beginPath(); //开始绘制
	ctx.arc((x + (size / 2)), (y + (size / 2)), (size / 2), 0, Math.PI * 2);
	ctx.fill() //保证图片无bug填充
	ctx.closePath();
	ctx.clip(); //画了圆 再剪切 原始画布中剪切任意形状和尺寸。一旦剪切了某个区域，则所有之后的绘图都会被限制在被剪切的区域内
	ctx.drawImage(img, x, y, size, size); // 推进去图片
	ctx.restore();
}

/**
 * canvas字体换行
 * @param {Object} ctx canvas上下文
 * @param {Object} x x坐标
 * @param {Object} y y坐标
 * @param {Object} text 需要换行的字符串
 */
function whileText(ctx, x, y, text) {
	let textList = [];
	let val = '';
	let len = 14; //超过多少字后换行
	if (text.length > len) {
		for (let i = 0; i < text.length; i++) {
			val += text[i];
			if (i > 0) {
				let math = i % len;
				if (!math) {
					textList.push(val);
					val = '';
				} else if ((text.length - 1) == i) {
					textList.push(val);
					val = '';
				}
			}
		}
	}
	for (let i in textList) {
		ctx.fillText(textList[i], x, y);
		y += 16; //列间距
	}
}

/**
 * uni-app返回上一页
 */
function toBack() {
	uni.navigateBack({
		delta: 1
	});
}

export default {
	debounce,
	throttle,
	checkPhone,
	checkPhone2,
	fileUrl,
	QR,
	awaitUpload,
	getDateTime,
	getTimeToDate,
	roundRect,
	roundArc,
	whileText,
	toBack
}
