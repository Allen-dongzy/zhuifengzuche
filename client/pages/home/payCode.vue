<template>
	<view class="">
		<view style="margin: auto;width: 220rpx;height: 220rpx;margin-top: 30vh;">
				<image style="width: 100%;height: 100%;"  :src="$util.fileUrl('/addCard.png')" mode=""></image>
		</view>
		<view style="width: 100%;text-align: center;font-size: 44rpx;margin-top: 30rpx;">¥3000.00</view>
		<view class="title">款项名称</view>
		
		<button  style=" color: white;
				width: 90%;
						margin:20vh auto 20rpx auto;
					    background-color: #5A7EFF;
					    border-radius: 50px;
					    font-size: 32rpx;
					    height: 96rpx;line-height: 96rpx;" type="default" >查看是否到账</button>
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
	.title{
		background-color: #EFF0F3;padding: 20rpx 40rpx;color:#999999;font-size: 24rpx;width: 30%;text-align: center;border-radius: 10rpx;margin: auto;margin-top: 30rpx;
	}

</style>
