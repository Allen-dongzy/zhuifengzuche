<template>
	<view class="">
		<view style="width: 90%;margin: auto;text-align: center;margin-top: 20vh;">
				<image  style="width: 400rpx;height: 252rpx;" :src="`${ossUrl}/common/res-success.png`" mode="aspectFill"></image>
		</view>
		<view class="title">评价成功！</view>
		<view class="title1">再次感谢您选择追风租车 </view>
		<view class="title1">20元优惠券已发送至您的账户，有效期7天</view>
	<button style=" color: white;
		width: 88%;
				margin: auto;
				margin-top: 10vh;
			    background-color: #5A7EFF;
			    border-radius: 50px;
			    font-size: 32rpx;
			    height: 96rpx;line-height: 96rpx; " type="default" @click="gopay">确定</button>
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
	.title{
		font-size:32rpx;
		width: 40%;
		text-align: center;
		margin: auto;
		font-weight: 400;
	}
	.title1{
		font-size:24rpx;
		width: 60%;
		text-align: center;
		margin: auto;
		color: #999999;
		margin-top: 20rpx;
	}
</style>
