<template>
	<view class="content">
		<view class="topimg">
			<image class="loginBox" src="../../static/logo.png"></image>
		</view>
		<view class="topimg2">
			<image style="height:544rpx;width: 544rpx;" src="../../static/loginbg.png" mode=""></image>
		</view>
		<view class="setbox">

			<u-input type="password" password-icon="true" />
			<view class="textTitle">{{password}}</view>
			<u-input type="password" password-icon="true" />
	
	
	<view style="width: 86%;margin: auto;height: 96rpx;" @click="ok">
		<u-button type="primary"  :custom-style="customStyle">完成</u-button>
	</view>

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				password: '两次账号密码不一样',
				selectType: false,
				customStyle: {
						marginTop: '20px', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
						color: 'white'
					}
			}
		},
		methods: {
			ok(){
				
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


</style>
