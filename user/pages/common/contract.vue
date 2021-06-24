<template>
	<view class="">
		<view class="title">租车合同</view>
		<view class="title" style="font-size:28rpx;">1.概念</view>
		<view class="title" style="font-size:28rpx;">1.1功能介绍</view>
		<view class="title" style="font-size: 28rpx;color:#666;margin: 40rpx auto;">
			这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍
		</view>
		<view class="title" style="font-size:28rpx;">1.2功能介绍</view>
		<view class="title" style="font-size: 28rpx;color:#666;margin: 40rpx auto;">
			这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍
		</view>
		<view v-if="img==''" class="sign">
			<view  class="sign-box">点击签名</view>
		</view>
		<view v-else class="sign" style="    display: flex;
    align-items: center;
    justify-content: flex-end;">
		     <view class="">签名</view>
			<image style="width: 188rpx;height: 256rpx;transform: rotate(270deg);"  :src="img" mode=""></image>
		</view>
		
		<button style=" color: white;
			width: 88%;
					margin: auto;
					margin-top: 5vh;
				    background-color: #5A7EFF;
				    border-radius: 50px;
				    font-size: 32rpx;
				    height: 96rpx;line-height: 96rpx; " type="default" @click="go">提交</button>
					
					<button style=" border:none
					color: white;
						width: 88%;
								margin: auto;
								margin-top: 5vh;
							    background-color: #EFF0F3;
							    border-radius: 50px;
							    font-size: 32rpx;
							    height: 96rpx;line-height: 96rpx; " type="default">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				img:''
			}
		},
		onShow() {
			console.log(this.img)
		},
		methods: {
			go(){
			console.log('pp')
			uni.navigateTo({
				url:'./signIng'
			})
			}
		}
	}
</script>

<style>
	.title{
		width: 90%;
		font-size:35rpx;
		color: #000000;
		margin: 20rpx auto;
	}
	.sign{
		width: 90%;
		margin: auto;
		text-align: right;
	}
	.sign-box{
		color: #5A7EFF;
		border-bottom: 2rpx solid #5A7EFF;
		width: 20%;
		margin-left: 80%;
	}
</style>
