<template>
	<view class="cost-detail">
		<view class="price-bar">
			<view class="title">
				租金(￥{{info.orderVehiclePrice.averagePrice}}/日均)
			</view>
			<view class="price">
				￥<text>{{info.orderVehiclePrice.totalPrice}}</text>
			</view>
		</view>
		<view class="calendar" v-if="info.orderVehiclePrice && info.orderVehiclePrice.datePriceList">
			<view class="item" v-for="(item, index) in info.orderVehiclePrice.datePriceList" :key="index">
				<view class="date">{{item.time.slice(8,10)}}</view>
				<view class="price">￥{{item.price}}</view>
			</view>
		</view>
		<view class="list">

			<view class="item-bar" v-for="(item,index) in info.orderPriceList" :key="index">
				<view class="left">
					<view class="caption">{{item.name}}</view>
				</view>
				<view class="right">
					￥{{item.price.toString().startsWith('-') ? `-${item.price.toString().slice(1)}` : item.price}}
				</view>
			</view>
		</view>
		<view class="bottom-mat"></view>
		<view class="bottom">
			<view class="caption">总计</view>
			<view class="price">￥<text>{{Number(info.total).toFixed(2)}}</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: ''
			}
		},
		onLoad(e) {
			if (e && e.info) this.info = JSON.parse(e.info)
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
