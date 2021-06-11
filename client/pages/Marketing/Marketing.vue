<template>
	<view class="">
		<view class="box" @click="next()">OTA管理</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			next(){
				uni.navigateTo({
					url:'./carList',
					animationType:'pop-in',
					animationDuration:200
				})
			}
		}
	}
</script>

<style>
	.box{
		border:2rpx solid rgba(114,141,244,0.25);
		height: 230rpx;
		width: 90%;
		margin: auto;
		border-radius: 30rpx;
		text-align: center;
		line-height: 230rpx;
		font-size: 40rpx;
		color: #000000;
		margin-top: 40rpx;
	}
</style>
