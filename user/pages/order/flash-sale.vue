<template>
	<view class="flash-sale">
		<uni-swiper-dot :info="info.clientVehicleVo.vehicleModelFiles" :current="current" field="content" mode="round" :dotsStyles="dotsStyles">
			<swiper class="swiper" :autoplay="true" :interval="3000" :circular="true" @change="swiperChange">
				<swiper-item v-for="(item, index) in info.clientVehicleVo.vehicleModelFiles" :key="index"><image class="banner" :src="item" mode="aspectFill"></image></swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="info-card">
			<view class="title-box">
				<view class="name-box">
					<text class="name">{{ info.clientVehicleVo.brandName }}</text>
					<text class="price">￥{{ info.clientVehicleVo.price }}/天</text>
					<text class="origin-price">￥{{ info.clientVehicleVo.originPrice }}/天</text>
				</view>
				<view class="label-box">
					<view v-for="(item, index) in info.clientVehicleVo.labels" :key="index" class="label">{{ item }}</view>
				</view>
			</view>
			<view v-if="info.clientVehicleVo" class="params-box">
				<view class="params">{{ info.clientVehicleVo.gears }} | {{ info.clientVehicleVo.capacity }}座 | {{ info.clientVehicleVo.outputVolumeName }}</view>
				<view v-if="true" class="num">仅剩{{ info.clientVehicleVo.num }}辆</view>
				<view v-else class="num">满租</view>
			</view>
			<view class="look-price-candar" @click="goPriceCalendar">
				点击查看价格日历
				<view class="arrow"></view>
			</view>
		</view>
		<view class="bar"></view>
		<view class="cart-card">
			<view class="card">
				<view class="title-bar">
					<view class="caption">
						<view class="circle blue"></view>
						<text>{{ remoteSwitch ? '取车地点' : '取还地点' }}</text>
					</view>
					<text>异地还车</text>
				</view>
				<view class="block">
					<view class="city" @click="$open('/pages/home/selectCity', { cityMode: 'takeCar' })">{{ takeCarCity.shortName || '选择城市' }}</view>
					<image class="dot" :src="`${ossUrl}/home/dot.png`" mode="aspectFill"></image>
					<view class="address" @click="goTakeCarAddress">{{ takeCarAddress.name || '选择地点' }}</view>
					<evan-switch v-model="remoteSwitch" active-color="#5A7EFF"></evan-switch>
				</view>
				<view v-if="remoteSwitch" class="title-bar">
					<view class="caption">
						<view class="circle orange"></view>
						<text>还车地点</text>
					</view>
				</view>
				<view v-if="remoteSwitch" class="block">
					<view class="city text-1" @click="$open('/pages/home/selectCity', { cityMode: 'carAlso' })">{{ carAlsoCity.shortName || '选择城市' }}</view>
					<image class="dot" :src="`${ossUrl}/home/dot.png`" mode="aspectFill"></image>
					<view class="address text-1" @click="goCarAlsoAddress">{{ carAlsoAddress.name || '选择地点' }}</view>
				</view>
				<view class="time-bar" @click="selectTime">
					<view class="time-box start-time">
						<view class="date">{{ takeCarDateShow }}</view>
						<view class="time" v-if="takeCarTimeShow || takeCarDayShow">
							<text v-if="takeCarDayShow">{{ takeCarDayShow }}</text>
							<text v-if="takeCarTimeShow">{{ takeCarTimeShow }}</text>
						</view>
					</view>
					<view class="line-bar">
						<view class="date">{{ totalDate || 0 }}天</view>
						<image class="interval" :src="`${ossUrl}/home/interval.png`" mode="aspectFill"></image>
					</view>
					<view class="time-box end-time">
						<view class="date">{{ carAlsoDateShow }}</view>
						<view class="time" v-if="carAlsoTimeShow || carAlsoDayShow">
							<text v-if="carAlsoDayShow">{{ carAlsoDayShow }}</text>
							<text v-if="carAlsoTimeShow">{{ carAlsoTimeShow }}</text>
						</view>
					</view>
				</view>
				<view v-if="remoteSwitch" class="info">*异地还车调度费3元/公里；22:00-07:00取还车，将收取￥50/次夜间服务费</view>
				<view class="toast" @click="openProcessPopup">
					<image class="sesame" :src="`${ossUrl}/home/sesame.png`" mode="aspectFill"></image>
					芝麻分达
					<text>550</text>
					即可享受押金双免租车 >
				</view>
				<view class="btn" @click="carRental">立即租车</view>
			</view>
		</view>
		<!-- 弹窗-流程 -->
		<uni-popup ref="processPopup" type="center">
			<view class="process-modal">
				<scroll-view class="process-content" :scroll-y="true">
					<view class="title">免押金</view>
					<view class="info">
						下单预付租金后，取车时间向门店工作人员
						<text>申请芝麻信用免押金</text>
						，信用综合评估通过后有机会减免25000元。
					</view>
					<image class="process" :src="`${ossUrl}/home/process.png`" mode="aspectFill"></image>
					<view class="section">
						<view class="caption">使用芝麻信用免押金</view>
						<view class="text">使用芝麻信用免押金的订单，车辆押金取车前冻结，还车时解冻；违章押金还车冻结。还车后30天若无违章则解冻。</view>
					</view>
					<view class="section">
						<view class="caption">使用在线支付的押金</view>
						<view class="text">车辆押金取车前支付，还车时退还；违章押金还车时支付，还车后30天若无违章退还。</view>
					</view>
					<view class="section">
						<view class="caption">使用信用卡预授权免押金</view>
						<view class="text">使用信用卡免押金的订单，车辆押金取车前冻结，还车时解冻；违章押金还车时冻结，还车后30天若无违章则解冻。</view>
					</view>
				</scroll-view>
				<view class="btn-box"><view class="btn" @click="closeProcessPopup">知道了</view></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import EvanSwitch from '@/components/evan-switch/evan-switch'
import { toDate } from '@/utils/tools'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			info: {
				clientVehicleVo: {
					vehicleModelFiles: [
						'https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/res-success.png',
						'https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/res-success.png',
						'https://zdkj-oss-bucket.oss-cn-hangzhou.aliyuncs.com/car-rental-user/common/res-success.png'
					],
					brandName: '奔驰',
					price: 60,
					originPrice: 78,
					labels: [],
					gears: '自动',
					capacity: 5,
					outputVolumeName: '3.0L以上',
					num: 1
				}
			},
			dotsStyles: {
				bottom: 40,
				backgroundColor: '#dadada',
				border: 0,
				selectedBackgroundColor: 'rgba(218,218,218,0.40)',
				selectedBorder: 'rgba(218,218,218,0.40)'
			}, // 轮播样式
			current: 0, // 轮播当前索引
			weekShow: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			remoteSwitch: false, // 是否开启异地还车
			takeCarCity: {}, // 取车城市
			takeCarAddress: {}, // 取车地址
			carAlsoCity: {}, // 还车城市
			carAlsoAddress: {}, // 还车地址
			takeCarDateShow: '', // 取车日期显示
			takeCarDayShow: '', // 取车日是周几显示
			takeCarTimeShow: '', // 取车时间显示
			takeCarTime: '', // 取车时间
			carAlsoDateShow: '', // 还车日期显示
			carAlsoDayShow: '', // 还车日是周几显示
			carAlsoTimeShow: '', // 还车时间显示
			carAlsoTime: '', // 还车时间
			totalDate: '' // 总天数
		}
	},
	components: {
		EvanSwitch
	},
	watch: {
		// 监听异地取车开关
		remoteSwitch(newVal) {
			this.carAlsoCity = this.takeCarCity
			this.carAlsoAddress = this.takeCarAddress
		}
	},
	onLoad(e) {
		this.showTime()
		this.eventListener()
	},
	methods: {
		// 显示默认时间
		showTime() {
			const startTimestamp = Date.now() + 86400000
			const startTimeArr = toDate(startTimestamp)
			const endTimestamp = startTimestamp + 4 * 86400000
			const endTimeArr = toDate(endTimestamp)
			this.takeCarDateShow = `${startTimeArr[1]}月${startTimeArr[2]}日`
			this.takeCarDayShow = this.weekShow[new Date(startTimestamp).getDay()]
			this.takeCarTimeShow = '10:00'
			this.takeCarTime = `${startTimeArr[0]}-${startTimeArr[1]}-${startTimeArr[2]} 10:00:00`
			this.carAlsoDateShow = `${endTimeArr[1]}月${endTimeArr[2]}日`
			this.carAlsoDayShow = this.weekShow[new Date(endTimestamp).getDay()]
			this.carAlsoTimeShow = '10:00'
			this.carAlsoTime = `${endTimeArr[0]}-${endTimeArr[1]}-${endTimeArr[2]} 10:00:00`
			this.totalDate = 4
		},
		// 前往价格日历
		goPriceCalendar() {
			this.$open('/pages/home/priceCalendar', {
				info: JSON.stringify(this.info),
				takeCarTime: this.takeCarTime,
				carAlsoTime: this.carAlsoTime
			})
		},
		// 轮播改变
		swiperChange(e) {
			this.current = e.detail.current
		},
		// 选取取车地点
		goTakeCarAddress() {
			if (!this.takeCarCity || Object.keys(this.takeCarCity).length === 0) {
				this.$toast('请先选择取车城市')
				return
			}
			this.$open('/pages/home/selectAddress', {
				city: JSON.stringify(this.takeCarCity),
				addressMode: 'takeCar'
			})
		},
		// 选取还车地点
		goCarAlsoAddress() {
			if (!this.carAlsoCity || Object.keys(this.carAlsoCity).length === 0) {
				this.$toast('请先选择还车城市')
				return
			}
			this.$open('/pages/home/selectAddress', {
				city: JSON.stringify(this.carAlsoCity),
				addressMode: 'carAlso'
			})
		},
		// 选择时间
		selectTime() {
			this.$open('/pages/home/selectTime', {
				takeCarDayShow: this.takeCarDayShow,
				takeCarTimeShow: this.takeCarTimeShow,
				takeCarTime: this.takeCarTime,
				carAlsoDayShow: this.carAlsoDayShow,
				carAlsoTimeShow: this.carAlsoTimeShow,
				carAlsoTime: this.carAlsoTime,
				totalDate: this.totalDate
			})
		},
		// 打开流程弹窗
		openProcessPopup() {
			this.$refs.processPopup.open()
		},
		// 关闭流程弹窗
		closeProcessPopup() {
			this.$refs.processPopup.close()
		},
		// 立即租车
		carRental() {},
		// 事件监听
		eventListener() {
			// 选择城市
			uni.$on('checkCity', e => {
				switch (e.cityMode) {
					case 'takeCar':
						this.takeCarCity = JSON.parse(e.city)
						this.takeCarAddress = ''
						break
					case 'carAlso':
						this.carAlsoCity = JSON.parse(e.city)
						this.carAlsoAddress = ''
						break
				}
				if (!this.remoteSwitch) this.carAlsoCity = this.takeCarCity
			})
			// 选择地点
			uni.$on('checkAddress', e => {
				switch (e.addressMode) {
					case 'takeCar':
						this.takeCarAddress = JSON.parse(e.address)
						break
					case 'carAlso':
						this.carAlsoAddress = JSON.parse(e.address)
						break
				}
				if (!this.remoteSwitch) this.carAlsoAddress = this.takeCarAddress
			})
			// 选择时间
			uni.$on('checkTime', e => {
				this.takeCarDateShow = e.takeCarDateShow
				this.takeCarDayShow = e.takeCarDayShow
				this.takeCarTimeShow = e.takeCarTimeShow
				this.takeCarTime = e.takeCarTime
				this.carAlsoDateShow = e.carAlsoDateShow
				this.carAlsoDayShow = e.carAlsoDayShow
				this.carAlsoTimeShow = e.carAlsoTimeShow
				this.carAlsoTime = e.carAlsoTime
				this.totalDate = e.totalDate
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

page {
	background-color: #fff;
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

		.card {
			@include box-w(670rpx, #fff);
			border-radius: 20rpx;
			box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);
			margin: 0 auto;
			padding: 30rpx;

			.title-bar {
				@include flex-row(space-between);

				text {
					@include font-set(24rpx, #999, 700);
				}

				.caption {
					@include flex-row();

					.circle {
						@include circle(16rpx);
						margin-right: 10rpx;

						&.blue {
							background-color: #5a7eff;
						}

						&.orange {
							background-color: #ffa05b;
						}
					}
				}
			}

			.block {
				@include flex-row(flex-start, flex-start);
				margin-top: 40rpx;
				margin-bottom: 40rpx;

				.city,
				.address {
					@include text-hide();
					@include font-set(32rpx, #000, 700);

					&.text-1 {
						@include text-one;
					}
				}

				.city {
					@include box-w(130rpx);
				}

				.dot {
					@include square(24rpx);
					margin: 10rpx 25rpx 0;
				}

				.address {
					@include box-w(286rpx);

					&.text-1 {
						width: 395rpx;
					}
				}

				.evan-switch {
					transform: scaleX(0.8) scaleY(0.8) translateX(15rpx) translateY(-15rpx);
				}
			}

			.time-bar {
				@include flex-row(space-between);

				.time-box {
					@include flex-col() .date {
						@include font-set(36rpx, #000, 700);
						line-height: 48rpx;
					}

					.time {
						@include box-w();
						padding: 6rpx 0;
						@include flex-row();
						@include font-set(24rpx, #999);
						line-height: 34rpx;
						margin-top: 6rpx;

						text ~ text {
							margin-left: 12rpx;
						}
					}

					&.start-time {
						.time {
							@include flex-row(flex-start);
						}
					}

					&.end-time {
						.time {
							@include flex-row(flex-end);
						}
					}
				}

				.line-bar {
					@include flex-col();

					.date {
						@include font-set(36rpx, #5a7eff, 500);
						line-height: 52rpx;
					}

					.interval {
						@include box-b(200rpx, 16rpx);
					}
				}
			}

			.info {
				@include font-set(24rpx, #999);
				line-height: 34rpx;
				margin-top: 40rpx;
			}

			.toast {
				.sesame {
					@include box(36rpx, 40rpx);
					margin-right: 10rpx;
				}

				@include flex-center;
				@include font-set(24rpx, #999);
				margin-top: 64rpx;

				& > text {
					color: #5a7eff;
				}
			}

			.btn {
				@include box(560rpx, 100rpx, #5a7eff);
				@include flex-center;
				@include font-set(28rpx, #fff, 700);
				border-radius: 52rpx;
				box-shadow: 0 2rpx 8rpx 0 rgba(36, 44, 74, 0.25);
				margin: 22rpx auto 10rpx;
			}
		}
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
