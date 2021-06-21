<template>
	<view class="">
		<view  class="titlebox" :style="{backgroundImage: 'url('+`${ossUrl}/mine/payinfo.png`+')'}">
			<view style="margin-left: 30rpx;padding-top: 60rpx;color:white;">待支付</view>
		</view>
		<view class="titleName"> 
			<view class="blackText">项目名称项目名称</view>
			<view class="grayTetx">渝A·5231B丨2021-06-03</view>
		</view>
		<view class="flexBox">
			<view class="flexleft">店员</view>
			<view class="flexright">张全蛋</view>
		</view>
		<view class="flexBox">
			<view class="flexleft">金额</view>
			<view class="flexright" style="color: #FC3736;">¥100.00</view>
		</view>
		<view class="flexBox">
			<view class="flexleft">付款人</view>
			<view class="flexright">张全蛋</view>
		</view>
		
		<view style="width: 90%;margin: auto;margin-top: 30rpx;font-size: 28rpx;">备注</view>
		<view style="width: 90%;margin: auto;margin-top: 30rpx;color: #999999;font-size: 24rpx;">这里是备注信息这里是备注信息</view>
		<view  style="width: 90%;margin: auto;">
			<view v-for="(item,index) in 3" style="display: inline-block;margin: 40rpx 10rpx;">
				<image style="width:160rpx;height:160rpx;" :src="`${ossUrl}/mine/shoukuan.png`" mode=""></image>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.titlebox{
		width: 100%;
		height: 192rpx;
		
	}
	.titleName{
			width: 100%;
			height: 114rpx;
			border-bottom: 20rpx solid #EFF0F3;
			padding: 30rpx 20rpx;
			border-top-left-radius: 20rpx;
			border-top-right-radius: 20rpx;
			background-color: white;
			margin-top: -34rpx;
	} 
	.blackText{
		font-size: 28rpx;
		color: #000000;
		margin-bottom: 30rpx;
	}
	.grayTetx{
		color: #999999;
		font-size: 24rpx;
	}
	.flexBox{
		width: 90%;
		margin: auto;
		padding: 30rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
		display: flex;
		align-items: center;
	}
	.flexleft{
		color: #000000;
		font-size: 28rpx;
		width: 15%;
	}
	.flexright{
		color: #999999;
		font-size: 28rpx;
		width: 85%;
		text-align: right;
	}
</style>
