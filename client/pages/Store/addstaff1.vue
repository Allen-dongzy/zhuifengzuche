<template>
	<view class="">
		<view style="width: 100%;border-bottom:20rpx solid #EFF0F3 ;">
			<view class="flexBox">
				<image style="width: 20rpx;height:20rpx;" src="../../static/img/1-1.png" mode=""></image>
				<view style="color:#5A7EFF;font-size: 32rpx;margin: 0rpx 20rpx;">基本信息</view>
				<image style="width: 12rpx;height:12rpx;" src="../../static/img/next1.png" mode=""></image>
				<image style="width: 20rpx;height:20rpx; margin: 0rpx 20rpx;" src="../../static/img/2.png" mode=""></image>
				<view style="font-size: 32rpx;color: #999999;">权限管理</view> 
			</view>
		</view>
		<view class="">
			<view class="title">姓名</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input style="background-color: #EFF0F3;width: 100%;height: 100%;border-radius: 10rpx;padding-left: 20rpx;font-size: 24rpx;" placeholder="请输入姓名" type="text"  /> </view>
		</view>
		<view class="">
			<view  class="title">手机号</view>
			<view style="width: 90%;margin: auto;height: 74rpx;"><input style="background-color: #EFF0F3;width: 100%;height: 100%;border-radius: 10rpx;padding-left: 20rpx;font-size: 24rpx;" placeholder="请输入手机号" type="text"  /> </view>
		</view>
		<view class="">
			<view  class="title">密码</view>
			<view class="moreInpbox">
				<view style="width: 90%;"><input :type="inpType" class="inpBox" style="width: 95%;"
						placeholder="请填写密码" /></view>
				<image v-show="showpass==false" style="height: 40rpx;width: 40rpx;"
					src="../../static/img/guan.png" mode="" @click="look"></image>
				<image v-show="showpass==true" style="height: 40rpx;width: 40rpx;"
					src="../../static/img/kai.png" mode="" @click="look"></image>
					
			</view> 
		</view>
		
		<button style=" color: white;
		width: 80%;
		margin: auto;
		margin-top: 80rpx;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx; 
		height: 96rpx;line-height: 96rpx;" type="default" @click="next">下一步</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showpass: true, //密码眼睛切换 false 关闭  true开启
				inpType:''
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

<style>
	.flexBox{
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
		height: 120rpx;
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
		height: 74rpx;
		width: 90%;
		margin: auto;
		font-size: 24rpx;
		color: #999999;
		padding-left: 20rpx;
	}
	.title{
	font-size: 28rpx;color: #000000;width: 90%;margin: 20rpx auto;	
	}
</style>
