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
			<u-input type="password" password-icon="true" />
			<view class="textTitle">{{password}}</view>
			<view class="textTitle" style="color: #007AFF;" @click="forget">忘记密码？</view>
			<view style="width: 86%;margin: auto;height: 96rpx;">
				<u-button style="color: #007AFF;">登陆1</u-button>
			</view>
			<view class="selectBox">
				<view style="width: 32rpx;height: 32rpx;" @click="selectbox">
					<image v-show="selectType==false" style="height: 100%;width: 100%;" src="../../static/img/selectn.png"
						mode=""></image>
					<image v-show="selectType==true" style="height: 100%;width: 100%;" src="../../static/img/selecty.png"
						mode=""></image>
				</view>
				<view style="color: #262743;">已阅读并同意追风租车的<text style="color: #5A7EFF;">《用户协议》</text> </view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				account: '手机号未注册！',//手机号码校验提示语句
				password: '密码错误！',//密码校验提示语句
				selectType: false//协议切换
			}
		},
		methods: {
			selectbox() {
				if (this.selectType) {
					this.selectType = false
				} else {
					this.selectType = true
				}
			},
			forget(){
				uni.navigateTo({
					url:'./forgetPhone', 
					animationType:'pop-in',
					animationDuration:200,
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
		margin-top: 450rpx;
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

	.selectBox {
		display: flex;
		align-items: center;
		width: 86%;

		margin: auto;
		margin-top: 42rpx;
	}
</style>
