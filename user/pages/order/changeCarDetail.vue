<template>
	<view class="change-car-detail">
		<view class="card">
			<image class="pic" src="https://youjia-image.cdn.bcebos.com/seriesImage/158738183449412be5bb.png@!w_600_fp">
			</image>
			<view class="caption">大众迈腾</view>
			<view class="params">自动挡丨5座 丨2.0L</view>
			<view class="info">92#汽油</view>
			<image class="label" :src="`${ossUrl}/order/logo-label.png`"></image>
		</view>
		<image class="tranform" :src="`${ossUrl}/order/tranform.png`"></image>
		<view class="card">
			<image class="pic" src="https://youjia-image.cdn.bcebos.com/seriesImage/158738183449412be5bb.png@!w_600_fp">
			</image>
			<view class="caption">大众迈腾</view>
			<view class="params">自动挡丨5座 丨2.0L</view>
			<view class="info">92#汽油</view>
			<image class="label" :src="`${ossUrl}/order/logo-label.png`"></image>
		</view>
		<view class="bottom-mat"></view>
		<view class="bottom">
			<view class="header">驾无忧、基本保障等服务按原有进行</view>
			<view class="content">
				<view class="item" @click="$open('/pages/order/differenceDetails')">
					<view class="caption">补收差价</view>
					<view class="value">
						￥60<view class="arrow"></view>
					</view>
				</view>
			</view>
			<view class="btn">确认换车</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.change-car-detail {
		padding: 40rpx;

		.card {
			position: relative;
			@include box(670rpx, 368rpx, #fff);
			border-radius: 20rpx;
			box-shadow: 0 0 8prx 0 rgba(114, 141, 244, 0.25);
			padding: 40rpx;

			.pic {
				@include box(240rpx, 150rpx);
			}

			.caption {
				@include font-set(28rpx, #000, 500);
				line-height: 40rpx;
			}

			.params {
				@include font-set(24rpx, #999);
				line-height: 34rpx;
				margin-top: 10rpx;
			}

			.info {
				@include font-set(24rpx, #999);
				line-height: 34rpx;
				margin-top: 10rpx;
			}

			.label {
				position: absolute;
				top: 34rpx;
				right: 43rpx;
				@include box(181rpx, 197rpx);
			}
		}

		.tranform {
			@include circle(72rpx);
			display: block;
			margin: 30rpx auto;
		}
		
		.bottom-mat {
			height: 440rpx;
		}

		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 9;
			@include box(100%, 440rpx, #fff);
			padding: 0 32rpx;
			border-radius: 40rpx 40rpx 0 0;
			box-shadow: x 0 8rpx 0 rgba(114, 141, 244, 0.25);

			.header {
				@include box(100%, 120rpx, #fff);
				border-radius: 40rpx 40rpx 0 0;
				@include flex-row();
				@include font-set(28rpx, #000, 500);
				line-height: 40rpx;
				border-bottom: 1px solid #EFF0F3;
			}

			.content {
				.item {
					@include flex-row(space-between);
					margin-top: 38rpx;

					.caption {
						@include font-set(28rpx, #000, 500);
						line-height: 40rpx;
					}

					.value {
						@include flex-row();
						@include font-set(28rpx, #999, 700);
						line-height: 40rpx;

						.arrow {
							@include square(14rpx);
							border: 1px solid #999;
							border-left: 0;
							border-bottom: 0;
							transform: rotate(45deg);
							margin-left: 12rpx;
							margin-right: 8rpx;
						}
					}
				}
			}

			.btn {
				position: absolute;
				left: 50%;
				bottom: 48rpx;
				transform: translateX(-50%);
				@include box(670rpx, 96rpx, #5A7EFF);
				@include flex-center;
				@include font-set(32rpx, #fff, 700);
				border-radius: 52rpx;
			}
		}
	}
</style>
