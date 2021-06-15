<template>
	<view class="">
		<view class="box">
			<view class="flexBox">
				<view class="add">新增+</view>
				<view style="font-size: 28rpx;margin-left: 60%;">搜索</view>
				<image style="height: 28rpx;width: 28rpx;margin-left: 10rpx;" :src="$util.fileUrl('/fangdajing.png')" mode=""></image>
			</view>
			<view class="listBox">
				<view class="flexBox">
					<view class="blackText">渝A·5231B</view>
					<view class="redText" style="width: 73%;text-align: right;">¥188.00</view>
				</view>
				<view class="flexBox">
					<view class="grayText">大众</view>
					<view class="grayText">捷达</view>
				</view> 
				<view class="flexBox">
					<view style="margin-right: 20rpx;font-size: 24rpx;">张全蛋</view>
					<view style="font-size: 24rpx;">2021-06-02 18:54 - 2021-06-03 18:54</view>
				</view>
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
	.flexBox{
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}
	.add{
		border-radius: 10rpx;
		color: #5A7EFF;
		border:2rpx solid #5A7EFF;
		height:48rpx;
		line-height: 48rpx;
		text-align: center;
		width: 172rpx;
	}
	.box{
		width: 90%;
		margin: auto;
	}
	.listBox{
		border-radius: 20rpx;
		border: 2rpx solid rgba(114,141,244,0.25);
		padding: 30rpx;	
		margin-top: 30rpx;
	}
	.blackText{
		color: #000000;
		font-weight: bold;
		font-size: 28rpx;
	}
	.redText{
		color: #FC3736;
		font-weight: bold;
		font-size: 28rpx;
	}
	.grayText{
		color: #999999;
		font-size: 24rpx;
		margin-right: 20rpx;
	}
</style>
