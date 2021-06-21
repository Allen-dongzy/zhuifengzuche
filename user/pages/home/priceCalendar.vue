<template>
	<view class="price-calendar">
		<view class="car-card">
			<image class="pic" src="https://youjia-image.cdn.bcebos.com/seriesImage/158738183449412be5bb.png@!w_600_fp">
			</image>
			<view class="description">
				<view class="caption">大众迈腾</view>
				<view class="params">
					<view class="info">大众 捷达丨自动 5座 2.0L</view>
					<view class="price">￥<text>188/天</text></view>
				</view>
				<view class="label-box">
					<view class="label">时尚</view>
					<view class="label">省油</view>
					<view class="label">舒适</view>
				</view>
			</view>
		</view>
		<view class="card-mat"></view>
		<uni-calendar :insert="true" :showMonth="false" :start-date="'2021-6-1'" :end-date="'2021-6-30'" :range="true">
		</uni-calendar>
	</view>
</template>

<script>
	export default {

	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';
	page{
		background-color: #EFF0F3;
	}

	.price-calendar {

		.car-card {
			position: fixed;
			@include box(100%, 188rpx, #fff);
			@include flex-row();
			padding: 30rpx 32rpx;
			box-shadow: 0 2rpx 4rpx 0 rgba(114, 141, 244, 0.25);

			.pic {
				@include box(204rpx, 128rpx);
			}

			.description {
				flex-grow: 1;
				margin-left: 38rpx;

				.caption {
					@include font-set(28rpx, #000, 500);
					line-height: 40rpx;
				}

				.params {
					@include flex-row(space-between);

					.info {
						@include font-set(24rpx, #000);
						line-height: 34rpx;
					}

					.price {
						@include font-set(16rpx, #FC3736, 700);
						padding-right: 16rpx;

						text {
							@include font-set(32rpx, #FC3736, 700);
							line-height: 42rpx;
						}
					}
				}

				.label-box {
					@include flex-row();
					margin-top: 20rpx;

					.label {
						@include box(62rpx, 34rpx, rgba(90, 126, 255, 0.10));
						@include flex-center;
						@include font-set(16rpx, #5A7EFF, 700);

						&~.label {
							margin-left: 8rpx;
						}
					}
				}
			}
		}

		.card-mat {
			height: 188rpx;
		}
		
		.uni-calendar__content {
			background-color: #EFF0F3 !important;
		}
		
		.uni-calendar-item--disable {
			background-color: transparent !important;
		}

		.uni-calendar {
			width: 700rpx;
			margin: 0 auto;
			margin-top: 40rpx;
		}

		.uni-calendar__header-btn-box,
		.uni-calendar__backtoday {
			display: none !important;
		}

		.uni-calendar__weeks:nth-of-type(1) {
			position: relative;
			top: -100rpx;
		}

		.uni-calendar__weeks {
			position: relative;
			top: -40rpx;
		}

		.uni-calendar__header {
			position: relative;
			top: 70rpx;
			border-bottom: 0 !important;
		}

		.uni-calendar__header-text {
			@include font-set(28rpx, #000, 700);
		}

		.uni-calendar__weeks-day {
			border-bottom: 0 !important;

			&>text {
				@include font-set(24rpx, #000, 500);
			}
		}

		.uni-calendar__weeks {
			&~.uni-calendar__weeks {
				margin-top: 20rpx;
			}
		}

		.uni-calendar-item--before-checked {
			background-color: rgba(90, 126, 255, 0.50) !important;
			// border-radius: 66rpx;

			.uni-calendar-item__weeks-box-item {
				background-color: #5A7EFF !important;
				// border-radius: 66rpx;
			}
		}

		.uni-calendar-item--after-checked {
			background-color: rgba(90, 126, 255, 0.50) !important;

			.uni-calendar-item__weeks-box-item {
				background-color: #5A7EFF !important;
			}
		}

		.uni-calendar-item--multiple {
			opacity: 1 !important;
		}

		.uni-calendar-item__weeks-lunar-text.uni-calendar-item--isDay-text.uni-calendar-item--multiple {
			background-color: transparent;
		}

		.uni-calendar-item__weeks-box-text.uni-calendar-item--multiple {
			background-color: transparent !important;
		}

		.uni-calendar-item__weeks-box.uni-calendar-item--before-checked.uni-calendar-item--multiple {
			background-color: rgba(90, 126, 255, 0.50) !important;
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
		}

		.uni-calendar-item__weeks-box.uni-calendar-item--after-checked.uni-calendar-item--multiple {
			background-color: rgba(90, 126, 255, 0.50) !important;
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}

		.uni-calendar-item__weeks-box.uni-calendar-item--multiple {
			background-color: rgba(90, 126, 255, 0.50) !important;
		}
	}
</style>
