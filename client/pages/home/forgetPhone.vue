<template>
	<view class="content">
		<view class="topimg">
			<image class="loginBox" src="../../static/img/logo.png"></image>
		</view>
		<view class="topimg2">
			<image style="height:544rpx;width: 544rpx;" src="../../static/img/loginbg.png" mode=""></image>
		</view>
		<view class="setbox"> 

			<u-input type="number" password-icon="true" clearable />
			<view class="textTitle">{{account}}</view>
			<view style="display: flex;justify-content: center;align-items: center;">
				<view style="height: 96rpx;line-height: 96rpx;width: 62%;">
					<input class="codeInp" type="text" value="" />
				</view>
				<view class="codeText">
					获取验证码
				</view>
			</view>

			<view class="textTitle">{{password}}</view>
			
			<view style="width: 86%;margin: auto;height: 96rpx;" >
				<u-button type="primary"  :custom-style="customStyle" @click="next">下一步</u-button>
			</view>

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				account: '请输入手机号！',
				password: '验证码错误！',
				selectType: false,
				customStyle: {
						marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
						color: 'white'
					}
			}
		},
		methods: {
			next(){
				uni.navigateTo({
					url:'./forgetSet',
					animationType:'pop-in',
					animationDuration:200
				})
			}
		}
	}
</script>

<style lang="scss">
	.loginBox {
		width: 224rpx;
		height: 96rpx;
		margin-left: 32rpx;
	}

	.content {
		background-color: #5A7EFF;
		height: 100vh;
		width: 100%;
	}

	.topimg {
		position: relative;
	}

	.topimg2 {
		position: absolute;
		top: 10rpx;
		left: 110rpx;
	}

	.setbox {

		background-color: white;
		width: 90%;
		margin: auto;
		margin-top: 430rpx;
		border-radius: 20rpx;
		padding: 60rpx 0px;

	}

	.u-input {
		height: 96rpx;
		line-height: 96rpx;
		width: 86%;
		margin: auto;
		background-color: #EFF0F3;
		border-radius: 10rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
	}

	.u-input__input {
		height: 96rpx;
		line-height: 96rpx;
		width: 86%;
		margin: auto;
		background-color: #EFF0F3;
		border-radius: 10rpx;
		padding-left: 20rpx;
		font-size: 24rpx;
	}

	.u-input__right-icon {
		padding-right: 20rpx;
	}

	.textTitle {
		color: #FE3636;
		height: 40rpx;
		width: 86%;
		margin: 16rpx auto;
	}

	
	.codeInp{
		
		height: 100%;width: 100%; background-color: #EFF0F3;font-size: 24rpx;border-bottom-left-radius : 10rpx;border-top-left-radius : 10rpx;padding-left: 20rpx;
	}
	
	.codeText{
		height: 96rpx; line-height: 96rpx;color: #5A7EFF;font-size: 24rpx;background-color: #EFF0F3;padding: 0px 20rpx;border-bottom-right-radius : 10rpx;border-top-right-radius : 10rpx;
	}
	
</style>
