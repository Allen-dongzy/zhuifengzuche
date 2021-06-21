<template>
	<view class="">
		<view class="flexBox">
			<image style="height: 92rpx;width: 92rpx;" :src="`${ossUrl}/common/cache-logo.png`" mode=""></image>
			<view class="contnetBox">
					<view class="name">[追风] · 官方客服电话</view>
					<view class="phone">400620005</view>
			</view>
			<image style="height: 44rpx;width: 44rpx;" :src="`${ossUrl}/common/phone-big.png`" mode=""></image>
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
	.flexBox{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.name{
		font-size: 28rpx;
		color: black;
		margin: 20rpx;
	}
	.phone{
	color: #5A7EFF;	
	font-size: 28rpx;
	margin: 20rpx;
	}
	.contnetBox{
		width: 70%;
	}
</style>
