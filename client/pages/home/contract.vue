<template>
	<view class="contract">
		<view class="caption-1">租车合同</view>
		<view class="caption-2">1. 概述</view>
		<view class="caption-2">1.1 功能介绍</view>
		<view class="section">这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍</view>
		<view class="caption-2">1.2 功能介绍</view>
		<view class="section">1. 这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍</view>
		<view class="section">2. 这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍</view>
		<view class="bottom">签名：<image class="sign"
				src="https://img2.baidu.com/it/u=2469876902,2248648219&fm=26&fmt=auto&gp=0.jpg" mode="aspectFill">
			</image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/static/scss/_mixin.scss';

	.contract {
		padding: 40rpx 32rpx;

		.caption-1 {
			@include font-set(36rpx, #000, 700);
		}

		.caption-2 {
			@include font-set(28rpx, #000, 700);
			margin-top: 20rpx;
		}

		.section {
			@include font-set(28rpx, #000);
			margin-top: 50rpx;
			line-height: 40rpx;

			&~.caption-2 {
				margin-top: 50rpx;
			}
		}

		.bottom {
			position: fixed;
			right: 32rpx;
			bottom: 70rpx;
			@include box-w();
			@include flex-row(flex-end);
			@include font-set(32rpx, #5A7EFF, 500);

			.sign {
				@include box-b(150rpx, 62rpx);
				margin-left: 20rpx;
			}
		}
	}
</style>
