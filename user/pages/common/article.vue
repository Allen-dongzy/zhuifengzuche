<template>
	<view class="article">
		<view class="caption-big">渠道合作</view>
		<view class="caption-small">1. 概述</view>
		<view class="caption-small">1.1 功能介绍</view>
		<view class="section">这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍</view>
		<view class="caption-small">1.2 功能介绍</view>
		<view class="section">1. 这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍</view>
		<view class="section">2. 这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍这里是功能介绍</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.article {
		padding: 40rpx 32rpx;

		.caption-big {
			@include font-set(36rpx, #000, 700);
			line-height: 50rpx;
		}

		.caption-small {
			@include font-set(28rpx, #000, 700);
			line-height: 40rpx;
			margin-top: 20rpx;
		}

		.section {
			@include font-set(28rpx, #666);
			@include text-both;
			line-height: 40rpx;
			margin-top: 50rpx;

			&~.caption-small {
				margin-top: 50rpx;
			}
		}
	}
</style>
