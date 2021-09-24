<template>
	<view class="home">
		<uni-swiper-dot :info="swiperInfo" :current="current" field="content" mode="round" :dotsStyles="dotsStyles">
			<swiper v-if="swiperInfo.length > 0" class="swiper" :autoplay="true" :interval="3000" :circular="true" @change="swiperChange">
				<swiper-item v-for="(item, index) in swiperInfo" :key="index">
					<image class="banner" :src="item.content" mode="aspectFill" @click="$open('/pages/home/newbie')"></image>
				</swiper-item>
			</swiper>
			<view v-else class="banner-empty"></view>
		</uni-swiper-dot>
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
		<!-- go.png -->
		<view v-if="couponNum > 0" class="notice-box" @click="$open('/pages/mine/coupon', { selectType: 'home' })">
			<image class="notice-bg" :src="`${ossUrl}/home/notice.png`" mode="aspectFill"></image>
			<view class="mask">
				<view class="info">立即领取租车优惠券! 租车立省20元!</view>
				<image class="go" :src="`${ossUrl}/home/go.png`" mode="aspectFill"></image>
			</view>
		</view>
		<view v-if="false" class="bottom-mat"></view>
		<view class="bottom">
			<view class="item" @click="$open('/pages/common/joinInvestment')">
				<image class="icon" :src="`${ossUrl}/home/join.png`" mode="aspectFill"></image>
				<text>招商加盟</text>
			</view>
			<view class="line"></view>
			<view class="item" @click="$open('/pages/home/windStore')">
				<image class="icon icon-2" :src="`${ossUrl}/home/shop.png`" mode="aspectFill"></image>
				<text>追风门店</text>
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
		<newbee-coupon-modal ref='newbeeCoupon' />
	</view>
</template>

<script>
import EvanSwitch from '@/components/evan-switch/evan-switch'
import NewbeeCouponModal from '@/components/newbee-coupon-modal/newbee-coupon-modal'
import { customerHomeBannerGetSpread } from '@/apis/customerHomeBanner'
import { toDate } from '@/utils/tools'
import validator from 'crazy-validator'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			swiperInfo: [], // 轮播数据
			weekShow: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
			dotsStyles: {
				bottom: 40,
				backgroundColor: '#dadada',
				border: 0,
				selectedBackgroundColor: 'rgba(218,218,218,0.40)',
				selectedBorder: 'rgba(218,218,218,0.40)'
			}, // 轮播样式
			isRequestNewbeeCoupon: false, // 是否请求新人优惠券
			current: 0, // 轮播当前索引
			remoteSwitch: false, // 是否开启异地还车
			couponList: [], // 新人优惠券列表
			couponNum: 0, // 可使用优惠券数量
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
		EvanSwitch,
		NewbeeCouponModal
	},
	watch: {
		// 监听异地取车开关
		remoteSwitch(newVal) {
			this.carAlsoCity = this.takeCarCity
			this.carAlsoAddress = this.takeCarAddress
		}
	},
	onLoad() {
		this.customerHomeBannerGetSpread()
		this.showTime()
		if (this.$storage.get('token')) this.loginAfterRequest()
		this.eventListener()
	},
	onPullDownRefresh() {
		this.init()
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 500)
	},
	methods: {
		// 初始化
		init() {
			this.customerHomeBannerGetSpread()
			if (this.$storage.get('token')) this.loginAfterRequest()
		},
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
		// 登录之后的请求
		loginAfterRequest() {
			// #ifdef MP-WEIXIN
			this.$refs.newbeeCoupon.findNewCoupon()
			// #endif
		},
		// 查询轮播
		async customerHomeBannerGetSpread() {
			const [err, res] = await customerHomeBannerGetSpread()
			if (err) return
			this.swiperInfo = res.data
		},
		// 轮播改变
		swiperChange(e) {
			this.current = e.detail.current
		},
		// 立即租车
		carRental() {
			const checkList = [
				{
					value: this.takeCarAddress,
					rules: [
						{
							type: 'required',
							msg: '请选择取车点'
						}
					]
				},
				{
					value: this.carAlsoAddress,
					rules: [
						{
							type: 'required',
							msg: '请选择还车点'
						}
					]
				},
				{
					value: this.totalDate,
					rules: [
						{
							type: 'required',
							msg: '请选择租车日期与时间'
						}
					]
				}
			]
			const checkRes = validator(checkList, this.$toast)
			if (checkRes.status !== 1000) return
			const currentTimeStamp = Date.now()
			const takeCarTimeStamp = new Date(this.takeCarTime).getTime()
			if (takeCarTimeStamp < currentTimeStamp) {
				this.$toast('送车时间小于当前时间！')
				return
			}
			if (!this.$storage.get('token')) {
				this.$toast('请前往登录！')
				setTimeout(() => {
					this.$open('/pages/common/login')
				}, 500)
				return
			}
			const params = {
				takeCarDateShow: this.takeCarDateShow,
				takeCarDayShow: this.takeCarDayShow,
				takeCarTimeShow: this.takeCarTimeShow,
				takeCarTime: this.takeCarTime,
				carAlsoDateShow: this.carAlsoDateShow,
				carAlsoDayShow: this.carAlsoDayShow,
				carAlsoTimeShow: this.carAlsoTimeShow,
				carAlsoTime: this.carAlsoTime,
				totalDate: this.totalDate,
				takeCarAddressId: this.takeCarAddress.id,
				carAlsoAddressId: this.carAlsoAddress.id
			}
			this.$open('/pages/home/selectCar', {
				takeCarAddress: JSON.stringify(this.takeCarAddress),
				params: JSON.stringify(params)
			})
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
			// app刷新
			uni.$on('appRefresh', () => {
				this.customerHomeBannerGetSpread()
				if (this.$storage.get('token')) this.loginAfterRequest()
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

.home {
	.uni-swiper__dots-box {
		padding-right: 40rpx;
		justify-content: flex-end !important;
	}

	.swiper,
	.banner {
		@include box(100%, 320rpx);
	}

	.banner-empty {
		@include box(100%, 320rpx, #ddd);
	}

	.card {
		position: relative;
		top: -35rpx;
		z-index: 9;
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

	.notice-box {
		position: relative;
		@include box-b(670rpx, 160rpx);
		margin: 5rpx auto 40rpx;

		.notice-bg {
			@include square();
		}

		.mask {
			@include cross();
			@include square();
			@include flex-center;
			padding: 6rpx 190rpx 0 200rpx;

			.info {
				@include font-set(28rpx, #fff, 500);
				line-height: 38rpx;
				letter-spacing: 1rpx;
			}

			.go {
				@include right(28rpx);
				@include square(70rpx);
			}
		}
	}

	.bottom-mat {
		height: 106rpx;
	}

	.bottom {
		@include box-w();
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		@include flex-center;

		&.ac {
			position: fixed;
			bottom: 0;
			left: 50%;
			z-index: 9;
			transform: translateX(-50%);
		}

		.item {
			@include flex-center;
			padding: 0 72rpx;

			.icon {
				width: 40rpx;
				height: 26rpx;

				&.icon-2 {
					width: 30rpx;
					height: 26rpx;
				}
			}

			text {
				@include font-set(28rpx, #5a7eff);
				margin-left: 10rpx;
			}
		}

		.line {
			@include box(4rpx, 24rpx, #5a7eff);
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
