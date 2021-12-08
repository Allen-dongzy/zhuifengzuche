<template>
	<view class="">
		<view class="box">
			<view class="itembox" @click="next(1)">
				<view class="textbox">OTA管理</view>
				<image :src="$util.fileUrl('/heiyou.png')" style="height: 36rpx;width: 25rpx;"></image>
			</view>
			<view class="itembox" @click="next(2)">
				<view class="textbox">租几送几</view>
				<image :src="$util.fileUrl('/heiyou.png')" style="height: 36rpx;width: 25rpx;"></image>
			</view>
			<view class="itembox" @click="next(3)">
				<view class="textbox">优惠券</view>
				<image :src="$util.fileUrl('/heiyou.png')" style="height: 36rpx;width: 25rpx;"></image>
			</view>
			<view class="itembox1" @click="next(4)">
				<view class="textbox">限时优惠</view>
				<image :src="$util.fileUrl('/heiyou.png')" style="height: 36rpx;width: 25rpx;"></image>
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
			next(e){
				if(e==1){
					uni.navigateTo({
						url:'./carList',
						animationType:'pop-in',
						animationDuration:200
					})
				}else if(e==2){
					uni.navigateTo({
						url:'./give',
						animationType:'pop-in',
						animationDuration:200
					})
				}else if(e==3){
					uni.navigateTo({
						url:'./coupon',
						animationType:'pop-in',
						animationDuration:200
					})
				}else{
					uni.navigateTo({
						url:'./discount',
						animationType:'pop-in',
						animationDuration:200
					})
				}
			
			}
		}
	}
</script>

<style>
	.box{
		border:2rpx solid rgba(114,141,244,0.25);
		width: 90%;
		margin: auto;
		border-radius: 30rpx;
		text-align: center;
		color: #000000;
		margin-top: 40rpx;
	}
	.textbox{
		width: 90%;
		text-align: left;
	}
	.itembox{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 120rpx;
		line-height: 120rpx;
		border-bottom: 1px solid #EFEFEF;
		width: 90%;
		margin: auto;
	}
	.itembox1{
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100rpx;
		line-height: 100rpx;
		width: 90%;
		margin: auto;
	}
</style>
