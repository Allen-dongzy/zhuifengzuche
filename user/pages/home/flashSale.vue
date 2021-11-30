<template>
	<view class="flash-sale">
		<uni-swiper-dot :info="info.vehicleModelImg" :current="current" field="content" mode="round" :dotsStyles="dotsStyles">
			<swiper class="swiper" :autoplay="true" :interval="3000" :circular="true" @change="swiperChange">
				<swiper-item v-for="(item, index) in info.vehicleModelImg" :key="index"><image class="banner" :src="item" mode="aspectFill"></image></swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="info-card">
			<view class="title-box">
				<view class="name-box">
					<text class="name">{{ info.vehicleModelBrandName }}{{ info.vehicleModelName }}</text>
					<text class="price">￥{{ info.discountedPrice }}/天</text>
					<text class="origin-price">￥{{ info.originalPrice }}/天</text>
				</view>
				<view class="label-box">
					<view v-for="(item, index) in info.labels.slice(0, 3)" :key="index" class="label">{{ item }}</view>
				</view>
			</view>
			<view class="params-box">
				<view class="params">{{ info.gears }} | {{ info.capacity }}座 | {{ info.vehicleOutputVolume }}</view>
				<view v-if="true" class="num">仅剩{{ info.remainingQuantity }}辆</view>
				<view v-else class="num">满租</view>
			</view>
			<view class="look-price-candar" @click="goPriceCalendar">
				点击查看价格日历
				<view class="arrow"></view>
			</view>
		</view>
		<view class="bar"></view>
		<view v-if="carKey" class="cart-card"><car-rental-card from="flashSale" :city="city" :address="address" @changeTime="timeHandler" @confirm="carRental" /></view>
	</view>
</template>

<script>
import CarRentalCard from '@/components/car-rental-card/car-rental-card'
import { limitedTimeOfferInfo } from '@/apis/vehicle'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			dotsStyles: {
				bottom: 40,
				backgroundColor: '#dadada',
				border: 0,
				selectedBackgroundColor: 'rgba(218,218,218,0.40)',
				selectedBorder: 'rgba(218,218,218,0.40)'
			}, // 轮播样式
			info: {}, // 信息
			current: 0, // 轮播当前索引
			carKey: false, // 控制选车卡片
			deliveryId: null, // 送车点id
			vehicleModelId: null, // 车型id
			takeCarTime: null, // 送车时间
			carAlsoTime: null, // 还车时间
			city: {}, // 对应城市
			address: {} // 对应送车点
		}
	},
	components: {
		CarRentalCard
	},
	onLoad(e) {
		if (e && e.deliveryId) this.deliveryId = e.deliveryId
		if (e && e.vehicleModelId) this.vehicleModelId = e.vehicleModelId
		this.carKey = true
	},
	methods: {
		// 前往价格日历
		goPriceCalendar() {
			const info = {
				vehicleModelId: this.info.vehicleModelId,
				vehicleModelFiles: JSON.stringify(this.info.vehicleModelImg),
				brandName: this.info.vehicleModelBrandName,
				vehicleModelName: this.info.vehicleModelName,
				gears: this.info.gears,
				capacity: this.info.capacity,
				outputVolumeName: this.info.vehicleOutputVolume,
				toDayPrice: this.info.discountedPrice,
				labels: this.info.labels
			}
			this.$open('/pages/home/priceCalendar', {
				info: JSON.stringify(info),
				takeCarTime: this.takeCarTime,
				carAlsoTime: this.carAlsoTime
			})
		},
		// 轮播改变
		swiperChange(e) {
			this.current = e.detail.current
		},
		// 租车时间处理
		timeHandler(e) {
			this.takeCarTime = e.takeCarTime
			this.carAlsoTime = e.carAlsoTime
			this.limitedTimeOfferInfo()
		},
		// 获取信息
		async limitedTimeOfferInfo() {
			const params = {
				deliveryId: this.deliveryId,
				vehicleModelId: this.vehicleModelId,
				beginTime: this.takeCarTime,
				endTime: this.carAlsoTime
			}
			const [err, res] = await limitedTimeOfferInfo(params)
			if (err) return
			this.info = res.data
			this.info.vehicleModelImg = JSON.parse(res.data.vehicleModelImg)
			this.info.labels = JSON.parse(res.data.labels)
			this.city = {
				shortName: this.info.deliveryVo.cityName
			}
			this.address = {
				id: this.deliveryId,
				name: this.info.deliveryVo.name
			}
		},
		// 立即租车
		carRental(params) {
			this.$open('/pages/order/confirmOrder', {
				...params.info,
				carModelId: this.vehicleModelId
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

page {
	background-color: #fff !important;
}

.flash-sale {
	.uni-swiper__warp {
		box-shadow: 0 3rpx 2rpx 0 #eff0f3;
	}

	.swiper,
	.banner {
		@include box(100%, 392rpx, #ddd);
	}

	.info-card {
		@include box-w(100%, #fff);
		padding: 40rpx 32rpx;

		.title-box {
			.name-box {
				@include flex-row();

				.name {
					@include font-set(32rpx, #000, 700);
					line-height: 44rpx;
				}

				.price {
					@include font-set(32rpx, #fc3736, 700);
					line-height: 44rpx;
					margin-left: 20rpx;
				}

				.origin-price {
					@include font-set(24rpx, #999);
					text-decoration: line-through;
					line-height: 34rpx;
					margin-left: 10rpx;
				}
			}

			.label-box {
				@include flex-row();
				margin-left: 32rpx;

				.label {
					@include box-h(34rpx, rgba(90, 126, 255, 0.1));
					padding: 0 10rpx;
					@include flex-center;
					@include font-set(16rpx, #5a7eff, 700);

					& ~ .label {
						margin-left: 12rpx;
					}
				}
			}
		}

		.params-box {
			@include flex-row(space-between);
			margin-top: 14rpx;

			.params {
				@include font-set(24rpx, #999);
				line-height: 34rpx;
			}

			.num {
				@include font-set(24rpx, #fc3736, 700);
				line-height: 34rpx;
			}
		}

		.look-price-candar {
			@include flex-row();
			@include font-set(24rpx, #5a7eff);
			line-height: 34rpx;
			margin-top: 20rpx;

			.arrow {
				@include square(18rpx);
				border: 1px solid #5a7eff;
				border-top: 0;
				border-left: 0;
				transform: rotate(-45deg);
				margin-left: 10rpx;
			}
		}
	}

	.bar {
		@include box-h(20rpx, #eff0f3);
	}

	.cart-card {
		@include box-w(100%, #fff);
		padding-top: 40rpx;
		padding-bottom: 60rpx;
	}

	.process-modal {
		position: relative;
		@include box-w(608rpx, #fff);
		@include flex-col(flex-start);
		height: 820rpx;
		padding: 40rpx;
		border-radius: 20rpx;

		.process-content {
			max-height: 630rpx;
		}

		.title {
			@include font-set(36rpx, #000, 700);
			line-height: 50rpx;
		}

		.info {
			@include font-set(24rpx, #000);
			@include text-both;
			margin-top: 40rpx;

			text {
				color: #5a7eff;
			}
		}

		.process {
			@include box(474rpx, 132rpx);
			margin-top: 40rpx;
			margin-bottom: 40rpx;
		}

		.section {
			@include text-both;

			& ~ .section {
				margin-top: 30rpx;
			}

			.caption {
				@include font-set(24rpx, #000, 700);
				line-height: 34rpx;
			}

			.text {
				@include font-set(24rpx, #000);
				line-height: 34rpx;
				margin-top: 10rpx;
			}
		}

		.btn-box {
			@include bottom();
			@include box-w(100%, #fff);
			padding: 20rpx 0 40rpx;

			.btn {
				@include box(300rpx, 96rpx, #5a7eff);
				@include flex-center;
				@include font-set(32rpx, #fff, 700);
				border-radius: 52rpx;
				margin: 0 auto;
			}
		}
	}
}
</style>
