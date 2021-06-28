<template>
	<view class="reservation-success">
		<view class="center">
			<image class="bg" :src="`${ossUrl}/common/res-success.png`" mode="widthFix"></image>
			<view class="text">预定成功！</view>
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

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.reservation-success {
		.center {
			position: absolute;
			left: 50%;
			top: 40%;
			transform: translateX(-50%) translateY(-50%);
			@include flex-col();

			.bg {
				@include box-w(318rpx);
			}

			.text {
				@include font-set(32rpx, #000, 700);
				line-height: 44rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
