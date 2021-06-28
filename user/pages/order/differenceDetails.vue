<template>
	<view class="difference-details">
		<view class="caption-blue">渝A·5213B 租金费用</view>
		<view class="group">
			<view class="item">
				<view class="title">租金*2天</view>
				<view class="value">+100</view>
			</view>
			<view class="item">
				<view class="title">服务费*2天</view>
				<view class="value">+50</view>
			</view>
			<view class="item">
				<view class="title">手续费</view>
				<view class="value">+50</view>
			</view>
			<view class="item">
				<view class="title">零散小时费*2小时</view>
				<view class="value">+50</view>
			</view>
		</view>
		<view class="group">
			<view class="item">
				<view class="title">租金退还*2天</view>
				<view class="value">-100</view>
			</view>
			<view class="item">
				<view class="title">服务费用退还*2天</view>
				<view class="value">-50</view>
			</view>
		</view>
		<view class="caption-blue">渝A·5213B 租金费用</view>
		<view class="group">
			<view class="item">
				<view class="title">租金*4天</view>
				<view class="value">+100</view>
			</view>
			<view class="item">
				<view class="title">服务费*4天</view>
				<view class="value">+50</view>
			</view>
			<view class="item">
				<view class="title">手续费</view>
				<view class="value">+50</view>
			</view>
			<view class="item">
				<view class="title">零散小时费*1小时</view>
				<view class="value">+50</view>
			</view>
		</view>
		<view class="caption-label top">
			<view class="left">
				<view class="line"></view>总计
			</view>
			<view class="right">+2460</view>
		</view>
		<view class="caption-label">
			<view class="left">
				<view class="line"></view>已收取
			</view>
			<view class="right">-780</view>
		</view>
		<view class="caption-label top">
			<view class="left">
				<view class="line"></view>差价
			</view>
			<view class="right">+1680</view>
		</view>
		<view class="hr-line"></view>
		<view class="caption-blue">渝A·5213B 租金费用</view>
		<view class="group">
			<view class="item">
				<view class="title">租金押金退还</view>
				<view class="value">-3000</view>
			</view>
		</view>
		<view class="caption-blue">渝A·5213B 租金费用</view>
		<view class="group">
			<view class="item">
				<view class="title">租金押金</view>
				<view class="value">+5000</view>
			</view>
		</view>
		<view class="caption-label top">
			<view class="left">
				<view class="line"></view>取车时支付押金
			</view>
			<view class="right">+2000</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.difference-details {
		padding: 0 32rpx;

		.caption-blue {
			@include font-set(28rpx, #5A7EFF, 500);
			line-height: 40rpx;
			margin-top: 40rpx;
		}

		.group {
			@include box-w();
			margin-top: 40rpx;

			.item {
				@include flex-row(space-between);
				line-height: 34rpx;

				.title {
					@include font-set(24rpx, #000);
				}

				.value {
					@include font-set(24rpx, #999);
				}
			}
		}

		.caption-label {
			@include flex-row(space-between);

			.left {
				@include flex-row();
				@include font-set(28rpx, #000, 700);
				line-height: 40rpx;
				margin-top: 10rpx;

				.line {
					@include box(8rpx, 24rpx, #5A7EFF);
					border-radius: 20rpx;
					margin-right: 12rpx;
				}
			}

			.right {
				@include font-set(24rpx, #999);
			}

			&.top {
				margin-top: 40rpx;
			}
		}

		.hr-line {
			@include box(100%, 2rpx, #fff);
			margin-top: 40rpx;
		}
	}
</style>
