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
		<car-rental-card from="home" class="card" @confirm="carRental" />
		<view v-if="couponNum > 0" class="notice-box" @click="$open('/pages/mine/coupon', { selectType: 'home' })">
			<image class="notice-bg" :src="`${ossUrl}/home/notice.png`" mode="aspectFill"></image>
			<view class="mask">
				<view class="info">立即领取租车优惠券! 租车立省20元!</view>
				<image class="go" :src="`${ossUrl}/home/go.png`" mode="aspectFill"></image>
			</view>
		</view>
		<view v-if="list.length > 0" class="discounts-box">
			<view class="title">
				<view class="label"></view>
				特惠租车
			</view>
			<view class="list">
				<view class="good-card" v-for="(item, index) in list" :key="index" @click="goFlashSale(index)">
					<image class="picture" :src="JSON.parse(item.vehicleModelImg)[0]" mode="aspectFill"></image>
					<view class="caption">{{ item.vehicleModelBrandName }}丨{{ item.vehicleModelName }}丨{{ item.vehicleOutputVolume }}</view>
					<view class="price-box">
						<view class="price">￥{{ item.discountedPrice }}/天</view>
						<view class="origin-price">￥{{ item.originalPrice }}/天</view>
					</view>
				</view>
			</view>
		</view>
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
		<newbee-coupon-modal :type="1" ref="newbeeCoupon" />
	</view>
</template>

<script>
import CarRentalCard from '@/components/car-rental-card/car-rental-card'
import NewbeeCouponModal from '@/components/newbee-coupon-modal/newbee-coupon-modal'
import { customerHomeBannerGetSpread } from '@/apis/customerHomeBanner'
import { limitedTimeOffer } from '@/apis/vehicle'
import { getLocation } from '@/utils/uni-tools'
import { mapState, mapMutations } from 'vuex'

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
			couponList: [], // 新人优惠券列表
			couponNum: 0, // 可使用优惠券数量
			lng: 0, // 经度
			lat: 0, // 纬度
			list: [], // 特惠列表
			firstLocationKey: true
		}
	},
	computed: {
		// app 请求定位开关
		...mapState('app', ['locationKey'])
	},
	components: {
		CarRentalCard,
		NewbeeCouponModal
	},
	onLoad() {
		this.firstLocationKey = false
		setTimeout(() => {
			this.firstLocationKey = true
		}, 3000)
		this.init('refresh')
		this.eventListener()
	},
	async onShow() {
		if (this.lng || this.lat || !this.firstLocationKey) return
		await this.getSettingLocation()
		this.limitedTimeOffer('refresh')
	},
	onPullDownRefresh() {
		this.init()
		setTimeout(() => {
			uni.stopPullDownRefresh()
		}, 500)
	},
	methods: {
		// app 设置请求定位开关
		...mapMutations('app', ['setLocationKey']),
		// 初始化
		init(key) {
			this.customerHomeBannerGetSpread()
			this.limitedTimeOffer(key)
			if (this.$storage.get('token')) this.loginAfterRequest()
		},
		// 获取设置
		async getSettingLocation() {
			const [err, res] = await uni.getSetting()
			if (err) return
			let locationSetting = null
			// #ifdef MP-WEIXIN
			locationSetting = res.authSetting['scope.userLocation']
			// #endif
			// #ifdef MP-ALIPAY
			locationSetting = res.authSetting['location']
			// #endif
			this.setLocationKey(locationSetting)
		},
		// 根据经纬度获取特惠租车
		async limitedTimeOffer(key) {
			let locationErr = 0,
				locationRes = 0
			// 获取位置
			if (key === 'refresh') {
				;[locationErr, locationRes] = await getLocation(this.locationKey)
				if (locationErr) {
					this.setLocationKey(false)
					return
				}
				this.setLocationKey(true)
				this.lng = locationRes.lng
				this.lat = locationRes.lat
			} else {
				locationRes = {
					lng: this.lng,
					lat: this.lat
				}
			}
			const [err, res] = await limitedTimeOffer(locationRes.lng, locationRes.lat)
			if (err) return
			this.list = res.data
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
		// 前往特惠租车详情
		goFlashSale(index) {
			this.$open('/pages/home/flashSale', {
				deliveryId: this.list[index].deliveryId,
				vehicleModelId: this.list[index].vehicleModelId
			})
		},
		// 立即租车
		carRental(params) {
			this.$open('/pages/home/selectCar', {
				takeCarAddress: JSON.stringify(params.takeCarAddress),
				params: JSON.stringify(params.info)
			})
		},
		// 事件监听
		eventListener() {
			// app刷新
			uni.$on('appRefresh', () => {
				this.init('refresh')
			})
			// 立即租车
			uni.$on('confirm', params => {
				this.carRental(params)
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
	}

	.notice-box {
		position: relative;
		@include box-b(670rpx, 160rpx);
		margin: 5rpx auto 0;

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

	.discounts-box {
		@include box-w();
		padding: 40rpx;
		.title {
			@include flex-row();
			@include font-set(32rpx, #000, 700);
			line-height: 44rpx;
			.label {
				@include box(8rpx, 24rpx, #5a7eff);
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}
		.list {
			padding: 0 20rpx;
			@include flex-wrap;
			.good-card {
				@include box-w(300rpx);
				margin-top: 40rpx;
				&:nth-of-type(2n) {
					margin-left: 30rpx;
				}
				.picture {
					@include box(100%, 156rpx);
					border-radius: 6rpx;
					box-shadow: 0 0 4rpx 0 rgba(114, 141, 244, 0.25);
				}
				.caption {
					@include font-set(28rpx, #000, 700);
					@include text-one;
					line-height: 40rpx;
					margin-top: 10rpx;
				}
				.price-box {
					@include flex-row();
					margin-top: 10rpx;
					.price {
						@include font-set(28rpx, #fc3736, 700);
						line-height: 40rpx;
					}
					.origin-price {
						@include font-set(20rpx, #999);
						text-decoration: line-through;
						line-height: 28rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
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
