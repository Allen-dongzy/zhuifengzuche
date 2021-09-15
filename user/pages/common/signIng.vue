<template>
	<view>
		<canvas
			class="hand-canvas__writing"
			disable-scroll="true"
			@touchstart="uploadScaleStart"
			@touchmove="uploadScaleMove"
			@touchend="uploadScaleEnd"
			canvas-id="handWriting"
			id="handWriting"
		></canvas>
		<view class="bottom-box">
			<view class="btn clear" @tap="retDraw">清除</view>
			<view class="btn save" @tap="subCanvas">保存</view>
		</view>
	</view>
</template>

<script>
import Handwriting from '../../components/xgf-e-signature/e-signature.js'
import { mapState } from 'vuex'
import { uploadFiles } from '@/apis/oss'

export default {
	data() {
		return {
			handwriting: '',
			canvas_height: 0,
			img_src: ''
		}
	},
	onLoad() {
		this.initHeight()
	},
	computed: {
		// 窗口高度
		...mapState('app', ['screenHeight', 'windowHeight', 'titleBarHeight', 'statusBarHeight']),
		// page高度
		pageHeight() {
			let height = null
			/**
			 * 微信：页面高度为导航栏以下，所以滑动区域高度为 -> 页面高度
			 * 支付宝：页面高度为手机状态栏以下，所以滑动区域高度为 -> 屏幕高度 - 手机状态高度 - 页面导航栏高度
			 */
			// #ifdef MP-WEIXIN
			height = this.windowHeight
			// #endif
			// #ifdef MP-ALIPAY
			height = this.screenHeight - this.statusBarHeight - this.titleBarHeight
			// #endif
			return height
		}
	},
	methods: {
		initHeight() {
			let canvas_height = 0
			// 计算画布的高度和宽度
			let view = uni.createSelectorQuery().select('.hand-canvas__writing')
			view.boundingClientRect(data => {
				let top = data.top
				canvas_height = this.pageHeight - top - 100
				this.canvas_height = canvas_height
				/**
					 *  初始化需传入三个参数 
					 lineColor：  字体颜色 默认#1A1A1A 
					 slideValue： 字体粗细 默认50（内置 0，25，50, 75, 100 5档粗细）
					 canvasName： canvas的ID名 canvas-id
					 signaturePattern： 设置签名模式是横屏，还是竖屏 默认landscape（内置landscape、portrait）
					 canvasNameShadow：横屏时需要设置第二横屏canvas的ID名
					 canvasHeight： canvas的高度
					 canvasWidth: canvas的宽度*/
				this.handwriting = new Handwriting({
					lineColor: '#000',
					slideValue: '50', // 0, 25, 50, 75, 100
					canvasName: 'handWriting',
					signaturePattern: 'portrait', //landscape:横屏；portrait：竖屏；
					canvasNameShadow: 'handWritingShadow',
					canvasHeight: canvas_height,
					canvasWidth: data.width
				})
				// 内置函数
				//this.handwriting.selectColorEvent(color);   // 传入颜色参数 改变字体颜色
				//this.handwriting.selectSlideValue(slideValue);  // 传入粗细参数 0,25,50,75,100 改变字体粗细
			}).exec()
		},
		retDraw() {
			this.handwriting.retDraw()
		},
		uploadScaleStart(event) {
			//绑定到canvas的touchstart事件
			this.handwriting.uploadScaleStart(event)
		},
		uploadScaleMove(event) {
			//绑定到canvas的touchmove事件
			this.handwriting.uploadScaleMove(event)
		},
		uploadScaleEnd(event) {
			//绑定到canvas的uploadScaleEnd事件
			this.handwriting.uploadScaleEnd(event)
		},
		subCanvas() {
			this.handwriting
				.saveCanvas()
				.then(async res => {
					const [uploadErr, uploadRes] = await uploadFiles([res])
					if (uploadErr) {
						console.log(uploadErr)
						return
					}
					this.img_src = uploadRes[0]
					uni.$emit('refreshSign', {
						sign: this.img_src
					})
					this.$close()
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
}
</script>

<style lang="scss">
.hand-canvas__writing {
	width: 100%;
	height: 100vh;
	display: block;
	box-sizing: border-box;
	background-color: #fff;
}

.bottom-box {
	position: fixed;
	bottom: 40rpx;
	left: 50%;
	transform: translateX(-50%);
	z-index: 999;
	width: 100%;
	height: 180rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	.btn {
		width: 300rpx;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		box-sizing: border-box;
		border-radius: 50px;
		font-size: 32rpx;
		&.clear {
			background-color: #ffffff;
			border: 2rpx solid #b2b2b2;
			color: #b2b2b2;
		}
		&.save {
			background-color: #5a7eff;
			color: #ffffff;
		}
	}
}
</style>
