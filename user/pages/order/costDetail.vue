<template>
	<view class="cost-detail">
		<view class="price-bar">
			<view class="title">
				租金(￥188/日均)
			</view>
			<view class="price">
				￥<text>188</text>
			</view>
		</view>
		<view class="calendar">
			<view class="item" v-for="(item, index) in 14" :key="index">
				<view class="date">16</view>
				<view class="price">￥219</view>
			</view>
		</view>
		<view class="list">
			<view class="item-bar">
				<view class="left">
					<view class="caption">异地调用</view>
					<view class="text">按取还车每公里3元计算</view>
				</view>
				<view class="right">￥29</view>
			</view>
			<view class="item-bar">
				<view class="left">
					<view class="caption">零散小时收费</view>
					<view class="text">租车非整天时零散小时收取的超时小费</view>
				</view>
				<view class="right">￥29</view>
			</view>
			<view class="item-bar">
				<view class="left">
					<view class="caption">夜间取车费</view>
					<view class="text">夜间取车费</view>
				</view>
				<view class="right">￥29</view>
			</view>
			<view class="item-bar">
				<view class="left">驾无忧保障</view>
				<view class="right">￥29</view>
			</view>
			<view class="item-bar">
				<view class="left">基本保障费</view>
				<view class="right">￥29</view>
			</view>
			<view class="item-bar">
				<view class="left">车辆整备费</view>
				<view class="right">￥29</view>
			</view>
			<view class="item-bar">
				<view class="left">优惠券减免</view>
				<view class="right">-￥29</view>
			</view>
		</view>
		<view class="bottom-mat"></view>
		<view class="bottom">
			<view class="caption">总计</view>
			<view class="price">￥<text>188.00</text></view>
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

	.cost-detail {
		.price-bar {
			@include box(100%, 100rpx);
			@include flex-row(space-between);
			padding: 0 32rpx;

			.title {
				@include flex-row();
				@include font-set(28rpx, #000, 700);
				line-height: 40rpx;
			}

			.price {
				@include font-set(16rpx, #FC3736, 700);

				text {
					@include font-set(36rpx, #FC3736, 700);
					line-height: 48rpx;
				}
			}
		}

		.calendar {
			background-color: #EFF0F3;
			@include flex-wrap;

			.item {
				@include square(107.15rpx);
				@include flex-col();

				.date {
					@include font-set(28rpx, #000, 700);
					line-height: 40rpx;
				}

				.price {
					@include font-set(20rpx, #999);
					line-height: 28rpx;
				}
			}
		}

		.list {
			@include box-w();
			padding: 0 32rpx;

			.item-bar {
				@include flex-row(space-between);

				&~.item-bar {
					border-top: 1px solid #EFF0F3;
				}

				.left {
					padding: 40rpx 0;
					@include font-set(28rpx, #000, 500);
					line-height: 40rpx;

					.text {
						@include font-set(24rpx, #999);
						line-height: 34rpx;
						margin-top: 10rpx;
					}
				}

				.right {
					@include font-set(28rpx, #999);
					line-height: 40rpx;
				}
			}
		}
		
		.bottom-mat {
			height: 166rpx;
		}

		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 9;
			@include box(100%, 166rpx, #fff);
			@include flex-row(space-between);
			padding: 0 32rpx;

			.caption {
				@include font-set(28rpx, #000, 500);
				line-height: 40rpx;
			}

			.price {
				@include font-set(16rpx, #FC3736, 700);

				text {
					@include font-set(36rpx, #FC3736, 700);
					line-height: 48rpx;
				}
			}
		}
	}
</style>
