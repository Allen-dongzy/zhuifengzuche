<template>
	<view class="content">
		<view class="topimg">
			<image class="loginBox" :src="$util.fileUrl('/logo.png')"></image>
		</view>
		<view class="topimg2">
			<image style="height:544rpx;width: 544rpx;" :src="$util.fileUrl('/loginbg.png')" mode=""></image>
		</view>
		<view class="setbox">

		<input style="    background-color: #EFF0F3;
    width: 90%;
    margin: auto;
    height: 96rpx;
    border-radius: 10rpx;" type="text" value="" />
	
	
			<view class="textTitle">{{account}}</view>
			<view style="display: flex;justify-content: center;align-items: center;">
				<view style="height: 96rpx;line-height: 96rpx;width: 66%;">
					<input class="codeInp" type="text" value="" />
				</view>
				<view class="codeText">
					获取验证码
				</view>
			</view>

			<view class="textTitle">{{codeText}}</view>

			<view class="moreInpbox">
				<view style="width: 90%;"><input :type="inpType" class="inpBox" style="width: 95%;"
						placeholder="请填写密码" /></view>
				<!-- <view style="width: 20%;background-color: #EFF0F3;color: #5A7EFF;font-size: 24rpx;"> -->
				<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;"
					:src="$util.fileUrl('/guan.png')" mode="" @click="look"></image>
				<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;"
					:src="$util.fileUrl('/kai.png')" mode="" @click="look"></image>
				<!-- </view> -->
			</view> 
			
			<view class="textTitle">{{password}}</view>
			
			<view class="moreInpbox">
				<view style="width: 90%;"><input :type="inpType" class="inpBox" style="width: 95%;"
						placeholder="请填写密码" /></view>
				<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;"
					src="../../static/img/guan.png" mode="" @click="look"></image>
				<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;"
					src="../../static/img/kai.png" mode="" @click="look"></image>
		
			</view> 
			


		
		<button  style=" color: white;
			width: 80%;
					margin: auto;
					margin-top: 20rpx;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx;" type="default" >完成</button>

		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				account: '请输入手机号！', //手机号校验提示语句
				codeText: '验证码错误！', //验证码校验提示语句
				password: '两次账号密码不一样', //密码校验提示语句
					showpass: true, //密码眼睛切换 false 关闭  true开启
			}
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


	.textTitle {
		color: #FE3636;
		height: 40rpx;
		width: 86%;
		margin: 16rpx auto;
	}


	.codeInp {

		height: 100%;
		width: 100%;
		background-color: #EFF0F3;
		font-size: 24rpx;
		border-bottom-left-radius: 10rpx;
		border-top-left-radius: 10rpx;
		padding-left: 20rpx;
	}

	.codeText {
		height: 96rpx;
		line-height: 96rpx;
		color: #5A7EFF;
		font-size: 24rpx;
		background-color: #EFF0F3;
		padding: 0px 20rpx;
		border-bottom-right-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}
	
	
	.moreInpbox {
		display: flex;
		align-items: center;
		background-color: #EFF0F3;
		width: 90%;
		margin: auto;
		border-radius: 10rpx;
	}
	.inpBox {
		background-color: #EFF0F3;
		border-radius: 10rpx;
		height: 96rpx;
		width: 90%;
		margin: auto;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
	}
	
</style>
