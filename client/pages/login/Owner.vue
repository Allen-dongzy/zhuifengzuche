<template>
	<view class="">
		<view class="topNav">
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" src="../../static/img/1-1.png" mode=""></image>
			</view>
			<view style="font-size: 32rpx;color: #5A7EFF;">基本信息</view>
			<view style="width: 10%;text-align: center;line-height: 3px;">
				<image style="width: 10rpx;height: 10rpx;" src="../../static/img/next2.png" mode=""></image>
			</view>
			<view style="width: 5%;text-align: center;">
				<image style="width: 20rpx;height: 20rpx;" src="../../static/img/2.png" mode=""></image>
			</view>
			<view style="font-size: 32rpx;">证件信息</view>
		</view>

		<view class="">
			<u-form :model="form" ref="uForm" :border-bottom="show">
				<u-form-item :border-bottom="show">
					<view class="fromTitel">姓名</view>
					<input class="inpBox" type="text" placeholder="请填写姓名" />
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">身份证号码 </view>
					<input class="inpBox" type="text" placeholder="请填写身份证号码" />
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">手机号</view>
					<input class="inpBox" type="text" placeholder="请填写手机号码" />
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">验证码</view>
					<view class="moreInpbox">
						<view style="width: 78%;"><input class="inpBox" style="width: 100%;" type="text"
								placeholder="请填写验证码" /></view>
						<view style="width: 20%;background-color: #EFF0F3;color: #5A7EFF;font-size: 24rpx;">获取验证码</view>
					</view>
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">邮箱</view>
					<input class="inpBox" type="text" placeholder="请填写邮箱" />
				</u-form-item>

				<u-form-item :border-bottom="show">
					<view class="fromTitel">密码</view>
					<view class="moreInpbox">
						<view style="width: 90%;"><input :type="inpType" class="inpBox" style="width: 95%;"
								placeholder="请填写密码" /></view>
						<!-- <view style="width: 20%;background-color: #EFF0F3;color: #5A7EFF;font-size: 24rpx;"> -->
						<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;"
							src="../../static/img/guan.png" mode="" @click="look"></image>
						<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;"
							src="../../static/img/kai.png" mode="" @click="look"></image>
						<!-- </view> -->
					</view>
				</u-form-item>
				<u-form-item :border-bottom="show">
					<view class="fromTitel">推荐码 </view>
					<input class="inpBox" type="text" placeholder="请填写推荐码" />
				</u-form-item>
			</u-form>

			<u-button type="primary" :custom-style="customStyle" @click="next">下一步</u-button>


		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					name: '',
					intro: '',
					sex: ''
				}, //表单列表
				show: false, //底部边框线
				showpass: true, //密码眼睛切换 false 关闭  true开启
				inpType: 'password', //切换密码框type
				customStyle: {
					margin: 'auto',
					marginTop: '60px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					marginBottom: '20px',
					color: 'white',
					width: '90%',
					borderRadius: '50rpx',
					backgroundColor: '#5A7EFF'
				} //按钮样式
			}
		},
		onLoad() {

		},
		methods: {
			look() {
				console.log('ppp')
				if (this.showpass) {
					this.showpass = false
					this.inpType = 'password'
				} else {
					this.showpass = true
					this.inpType = 'number'
				}
			},
			next() {
				uni.navigateTo({
					url: './OwnerCard',
					animationType: 'pop-in',
					animationDuration: 200
				})
			}
		}
	}
</script>

<style>
	.topNav {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 122rpx;
		width: 100%;
		border-bottom: 20rpx solid #EFF0F3;
	}

	.inpBox {
		background-color: #EFF0F3;
		border-radius: 10rpx;
		height: 74rpx;
		width: 90%;
		margin: auto;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
	}

	.fromTitel {
		width: 90%;
		margin: auto;
	}

	.moreInpbox {
		display: flex;
		align-items: center;
		background-color: #EFF0F3;
		width: 90%;
		margin: auto;
		border-radius: 10rpx;
	}
</style>
