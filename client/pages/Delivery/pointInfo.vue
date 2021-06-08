<template>
	<view class="">
		<view class="flexBox" style="width: 90%;margin: auto;">
			<view class="blueLine"></view>
			<view style="margin-left: 10rpx;">江北区</view> 
		</view>
		<view style="width: 90%;margin: auto;margin-top: 20rpx;">
			<view class="name">滨江路皇冠大道送车点</view>
			<view class="flexBox" style="margin-top: 10rpx;">
				<view style="color: #B2B2B2;font-size: 24rpx;width: 90%;">这里是送车点地址</view>
				<image style="width:32rpx;height: 32rpx;" :src="$util.fileUrl('/map.png')" mode=""></image>
			</view>
			<view style="font-size: 28rpx;padding: 20rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">车辆整备费：￥50</view>
			<view style="font-size: 28rpx;padding: 20rpx 0rpx;border-bottom: 2rpx solid #EFF0F3;">交通枢纽：是</view>
			
		<view class="buttonBox">
			<view class="empty">删除</view>
			<view class="sure">编辑</view>
		</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.blueLine{
	background-color: #5A7EFF;
	width: 8rpx;
	height: 24rpx;
}
.title{
	color: #000000;
	font-size: 28rpx;
}
.flexBox{
	display: flex;
	align-items: center;
}
.name{
	font-size: 28rpx;
	color: #000000;
	
}
	.empty {
		color: #B2B2B2;
		border: 2rpx solid #B2B2B2;
		padding: 26rpx 118rpx;
		font-size: 32rpx;
		border-radius: 50rpx;
		margin-right: 20rpx;
	}

	.sure {
		color: white;
		padding: 26rpx 118rpx;
		font-size: 32rpx;
		background-color: #5A7EFF;
		border-radius: 50rpx;
		margin-left: 20rpx;
	}
	.buttonBox {
		justify-content: center;
		display: flex;
		align-items: center;
		margin-top: 60vh;
	}
</style>
