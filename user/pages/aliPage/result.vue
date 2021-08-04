<template>
	<view class="result">
		<image class="bg"
			:src="result===1 ? `${ossUrl}/common/res-success.png` : result===2 ? `${ossUrl}/common/res-error.png` : ''"
			mode="aspectFill"></image>
		<view class="title">{{result===1 ? '免押成功！' : result===2 ? '免押失败' : ''}}</view>
		<view v-if="result===0" class="info">等待中...</view>
		<view v-else class="info">请返回微信小程序并刷新页面~</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				result: 0, // 0 等待中 1 成功 2 失败
			}
		},
		onLoad(e) {
			if (e && e.result) this.result = parseInt(e.result)
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
