<template>
	<view class="result">
		<image class="bg"
			:src="result===1 ? `${ossUrl}/common/res-success.png` : result===2 ? `${ossUrl}/common/res-error.png` : ''"
			mode="aspectFill"></image>
		<view class="title">{{result===1 ? '免押成功！' : result===2 ? '免押失败' : ''}}</view>
		<view v-if="result===1" class="info">请返回微信小程序并刷新页面~</view>
		<view v-else-if="result===2" class="info">失败原因：xxx</view>
		<view v-else-if="result===0" class="info">等待中...</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				result: 1, // 0 等待中 1 成功 2 失败
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.result {
		@include flex-col();
		padding-top: 40%;

		.bg {
			@include box(400rpx, 252rpx);
		}

		.title {
			@include font-set(32rpx, #000, 700);
			line-height: 44rpx;
			margin-top: 20rpx;
		}

		.info {
			@include font-set(24rpx, #000);
			line-height: 34rpx;
			margin-top: 30rpx;
		}
	}
</style>
