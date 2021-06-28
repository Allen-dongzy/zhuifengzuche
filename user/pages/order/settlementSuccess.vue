<template>
	<view class="settlement-success">
		<view class="center">
			<image class="bg" :src="`${ossUrl}/common/res-success.png`"></image>
			<view class="caption">结算成功！</view>
			<view class="info-1">工作人员正在处理中 再次感谢您选择追风租车</view>
			<view class="btn">前往评价</view>
			<view class="info-2">收获您的好评是我们最幸福的事~ 完成评价后可获得20元优惠券</view>
			<view class="res">完成</view>
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

	.settlement-success {

		.center {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			@include flex-col(flex-start);

			.bg {
				@include box(400rpx, 252rpx);
			}

			.caption {
				@include font-set(32rpx, #000, 700);
				line-height: 44rpx;
				margin-top: 20rpx;
			}

			.info-1 {
				@include box(264rpx, 68rpx);
				margin: 20rpx auto 0;
				@include font-set(24rpx, #999);
				line-height: 34rpx;
			}

			.btn {
				@include box(670rpx, 96rpx, #5A7EFF);
				@include flex-center;
				@include font-set(32rpx, #fff, 700);
				border-radius: 52rpx;
				margin-top: 60rpx;
			}

			.info-2 {
				@include box(348rpx, 68rpx);
				margin: 60rpx auto 0;
				@include font-set(24rpx, #999);
				line-height: 34rpx;
			}

			.res {
				@include font-set(32rpx, #5A7EFF, 700);
				line-height: 44rpx;
				margin: 60rpx auto 0;
			}
		}
	}
</style>
