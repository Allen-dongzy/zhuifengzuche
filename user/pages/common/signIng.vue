<template>
	<view>
		<view class="hand-canvas" :style="'height: '+canvas_height+'px;'">
			<canvas style="width: 100%;height: 80vh;" class="hand-canvas__writing" disable-scroll="true"
				@touchstart="uploadScaleStart" @touchmove="uploadScaleMove" @touchend="uploadScaleEnd"
				canvas-id="handWriting">
			</canvas>

			<!--        <canvas class="hand-canvas__shadow" :style="'width: '+canvas_height+'px;'"
                canvas-id="handWritingShadow">
            </canvas> -->
		</view>
		<view style="display: flex;align-items: center;justify-content: center;">
			<!--        <view @tap="retDraw" style="width:300rpx;height:96rpx;border-radius: 50rpx;">清除</view>
            <view @tap="subCanvas">签名</view> -->


			<button @tap="retDraw"
				style=" color:#B2B2B2;width:300rpx;margin: auto; border: 2rpx solid #B2B2B2; border-radius: 50px;font-size: 32rpx; height: 96rpx;line-height: 96rpx; "
				type="default">清除</button>

			<button @tap="subCanvas"
				style=" color: white;width:300rpx;margin: auto;background-color: #5A7EFF;border-radius: 50px;font-size: 32rpx;height: 96rpx;line-height: 96rpx; "
				type="default">保存</button>



		</view>

	</view>
</template>

<script>
	import Handwriting from "../../components/xgf-e-signature/e-signature.js"

	let that = ''

	export default {
		data() {
			return {
				handwriting: '',
				canvas_height: 0,
				img_src: ''
			}
		},
		onLoad() {
			that = this

			that.initHeight()
		},
		methods: {
			initHeight: () => {
				let canvas_height = 0
				uni.getSystemInfo({
					success(res) {
						let phoneHeight = res.windowHeight;
						console.log(res.windowHeight);
						// 计算画布的高度和宽度
						let view = uni.createSelectorQuery().select('.hand-canvas__writing');
						view.boundingClientRect(data => {
							console.log(data);
							let top = data.top;
							canvas_height = phoneHeight - top - 100;
							console.log(`到顶部的距离===${data.top}`);
							that.canvas_height = canvas_height

							/**
							 *  初始化需传入三个参数 
							 lineColor：  字体颜色 默认#1A1A1A 
							 slideValue： 字体粗细 默认50（内置 0，25，50, 75, 100 5档粗细）
							 canvasName： canvas的ID名 canvas-id
							 signaturePattern： 设置签名模式是横屏，还是竖屏 默认landscape（内置landscape、portrait）
							 canvasNameShadow：横屏时需要设置第二横屏canvas的ID名
							 canvasHeight： canvas的高度
							 canvasWidth: canvas的宽度*/
							that.handwriting = new Handwriting({
								lineColor: 'black',
								slideValue: '50', // 0, 25, 50, 75, 100
								canvasName: 'handWriting',
								signaturePattern: 'portrait', //landscape:横屏；portrait：竖屏；
								canvasNameShadow: 'handWritingShadow',
								canvasHeight: canvas_height,
								canvasWidth: data.width
							})

							// 内置函数
							//that.handwriting.selectColorEvent(color);   // 传入颜色参数 改变字体颜色
							//that.handwriting.selectSlideValue(slideValue);  // 传入粗细参数 0,25,50,75,100 改变字体粗细
						}).exec();
					}
				});

			},
			retDraw() {
				that.handwriting.retDraw()
			},
			uploadScaleStart(event) {
				//绑定到canvas的touchstart事件
				that.handwriting.uploadScaleStart(event)
			},
			uploadScaleMove(event) {
				//绑定到canvas的touchmove事件
				that.handwriting.uploadScaleMove(event)
			},
			uploadScaleEnd(event) {
				//绑定到canvas的uploadScaleEnd事件
				that.handwriting.uploadScaleEnd(event)
			},
			subCanvas() {
				that.handwriting.saveCanvas().then(res => {
					that.img_src = res
					uni.$emit('refreshSign', {
						sign: that.img_src
					})
					this.$close()
				}).catch(err => {
					console.log(err);
				});

			},
		}
	}
</script>
