<template>
	<view class="order-pay">
		<view class="info">
			<view class="caption">实付租金</view>
			<view class="price">￥<text>{{price}}</text></view>
		</view>
		<view class="toast">*取车时支付租车押金￥5000，可以取车时申请免押</view>
		<view class="btn" @click="pay">支&#32;付</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				price:''
			}
		},
		onLoad(e) {
		console.log(e.price)
		this.price=e.price
		},
		methods: {
			pay(){
				uni.reLaunch({
					url:'./order'
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.order-pay {
		padding: 0 32rpx;

		.info {
			@include box(100%, 124rpx);
			@include flex-row(space-between);
			border-bottom: 1px solid #EFF0F3;

			.caption {
				@include font-set(28rpx, #000, 500);
			}

			.price {
				@include font-set(20rpx, #FC3736, 700);

				text {
					@include font-set(36rpx, #FC3736, 700);
					line-height: 50rpx;
				}
			}
		}

		.toast {
			@include font-set(24rpx, #999);
			line-height: 34rpx;
			margin-top: 18rpx;
		}

		.btn {
			position: absolute;
			bottom: 60rpx;
			left: 50%;
			transform: translateX(-50%);
			@include box(670rpx, 96rpx, #5A7EFF);
			@include flex-center;
			@include font-set(32rpx, #fff, 700);
			border-radius: 52rpx;
		}
	}
</style>
