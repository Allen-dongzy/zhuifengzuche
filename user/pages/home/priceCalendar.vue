<template>
	<view class="price-calendar">
		<view class="car-card">
			<image class="pic" :src="info.vehicleModelFiles | jsonFormat" mode="aspectFill">
			</image>
			<view class="description">
				<view class="caption">{{info.brandName}}</view>
				<view class="params">
					<view class="info">{{info.vehicleModelName}}丨{{info.gears}} {{info.capacity}}座
						{{info.outputVolumeName}}
					</view>
					<view class="price">￥<text>{{info.toDayPrice}}/天</text></view>
				</view>
				<view class="label-box" v-if="info.labels && info.labels.length>0">
					<view class="label" v-for="(item, index) in info.labels.slice(0,3)" :key="index">{{item}}</view>
				</view>
			</view>
		</view>
		<view class="card-mat"></view>
		<uni-calendar :insert="true" :showMonth="false" :customRange="customRange" :start-date="startDate"
			:end-date="endDate" :selected="selectedList" :range="true" :disabled="true">
		</uni-calendar>
	</view>
</template>

<script>
	import {
		vehicleQueryVehicleModelRentList
	} from '@/apis/vehicle'

	export default {
		data() {
			return {
				info: {}, // 车辆信息
				startDate: '',
				endDate: '',
				customRange: [],
				selectedList: []
			}
		},
		filters: {
			jsonFormat(str) {
				return str ? JSON.parse(str)[0] : ''
			}
		},
		onLoad(e) {
			if (e && e.info) this.info = JSON.parse(e.info)
			if (e && e.takeCarTime && e.carAlsoTime) this.customRange.push(e.takeCarTime.split(' ')[0], e.carAlsoTime
				.split(' ')[0])
			this.vehicleQueryVehicleModelRentList()
		},
		methods: {
			// 获取价格日历
			async vehicleQueryVehicleModelRentList() {
				const [err, res] = await vehicleQueryVehicleModelRentList(this.info.vehicleModelId)
				if (err) return
				this.startDate = res.data[0].rentalTime.split(' ')[0]
				this.endDate = res.data[res.data.length - 1].rentalTime.split(' ')[0]
				res.data.forEach(item => {
					item.date = item.rentalTime.split(' ')[0]
					item.info = `￥${item.rentalMoney}`
				})
				this.selectedList = res.data
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
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

		.uni-calendar__header-btn-box {
			.uni-calendar__header-btn {
				border-left-color: #999;
				border-top-color: #999;
			}
		}

		.uni-calendar__backtoday {
			display: none !important;
		}

		.uni-calendar-item__weeks-box-circle {
			background-color: transparent !important;
		}

		.uni-calendar-item__weeks-lunar-text.uni-calendar-item--extra {
			color: #5A7EFF !important;
			opacity: 1 !important;
		}

		.uni-calendar-item--checked {
			background-color: transparent !important;
			opacity: 1 !important;
		}

		.uni-calendar-item__weeks-box-item {
			.uni-calendar-item--isDay-text {
				color: #333;
			}
		}

		.uni-calendar-item--isDay {
			background-color: transparent !important;
			opacity: 1 !important;

			.uni-calendar-item--isDay-text {
				color: #fff;
			}
		}

		.uni-calendar-item__weeks-box-text.uni-calendar-item--isDay-text.uni-calendar-item--isDay,
		.uni-calendar-item__weeks-box-text.uni-calendar-item--checked {
			min-width: 64rpx;
			box-sizing: border-box;
			text-align: center;
			padding: 2rpx 16rpx !important;
			border-radius: 33rpx !important;
			background-color: #5A7EFF !important;
			opacity: 1 !important;
		}

		.uni-calendar-item--before-checked,
		.uni-calendar-item--multiple {
			background-color: transparent !important;
			opacity: 1 !important;
		}

		.uni-calendar-item__weeks-box-text.uni-calendar-item--before-checked.uni-calendar-item--multiple,
		.uni-calendar-item__weeks-box-text.uni-calendar-item--multiple {
			min-width: 64rpx;
			box-sizing: border-box;
			text-align: center;
			padding: 2rpx 16rpx !important;
			border-radius: 33rpx !important;
			background-color: #5A7EFF !important;
			opacity: 1 !important;
		}
	}
</style>
