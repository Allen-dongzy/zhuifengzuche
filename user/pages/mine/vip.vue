<template>
	<view class="vip">
		<view class="head-bg">
			<view class="bg">
				<view class="header" :style="{ paddingTop: `${statusBarHeight}px` }">
					<view class="back" @click="back">
						<!-- #ifdef MP-WEIXIN -->
						<view class="arrow"></view>
						<!-- #endif -->
					</view>
					<view class="title">会员说明</view>
					<view class="empty"></view>
				</view>
				<view class="header-mat" :style="{ paddingTop: `${statusBarHeight}px` }"></view>
				<view class="level-box">
					<image :src="grade.bigIcon" mode="aspectFill"></image>
					下一等级
					<image :src="nextGrade.bigIcon" mode="aspectFill"></image>
				</view>
				<view class="level-text">
					<view class="level">{{ grade.name }}</view>
					<view class="level">{{ nextGrade.name }}</view>
				</view>
				<view class="level-num-box">
					<view class="level-bar"><view class="current" :style="{ width: `${percent}%` }"></view></view>
					<view class="current-text">
						<view class="current">
							当前成长值
							<view class="num">{{ currentAmount }}</view>
						</view>
						<view class="next">
							升级
							<view class="num">{{ needNum }}</view>
						</view>
					</view>
					<view class="hint">
						<view class="arrow"></view>
						您还差{{ needNum }}升级，充值￥{{ needNum }}立享{{ nextGrade.discount * 10 }}折优惠
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-menu" :style="{ height: `${bottomMenuHeight}px` }">
			<view class="title">
				<view class="line"></view>
				充值
			</view>
			<input :disabled="true" type="text" v-model="price" @click="openPriceModal" placeholder="请填写充值金额" placeholder-class="placeholder-class" />
			<view class="title">
				<view class="line"></view>
				推荐人手机号
			</view>
			<input type="number" maxlength="11" v-model="phone" placeholder="请填写推荐人手机号（没有可不填）" placeholder-class="placeholder-class" />
			<view class="pay" @click="recharge">立即充值</view>
		</view>
		<newbee-coupon-modal :type="4" ref="newbeeCoupon" />
		<lb-picker ref="picker" v-model="price" :list="priceList" />
	</view>
</template>

<script>
import NewbeeCouponModal from '@/components/newbee-coupon-modal/newbee-coupon-modal'
import LbPicker from '@/components/lb-picker'
import validator from 'crazy-validator'
import { mapState, mapActions } from 'vuex'
import { throttle } from '@/utils/tools'
import { recharge, getCodeByWxCode } from '@/apis/sso'
import { paymentPrecreate } from '@/apis/payment'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			headBgHeight: 0, // 头部背景高度
			payerUid: null, // 平台openid
			phone: '', // 手机号码
			price: null, // 金额
			priceList: [{
				label: '299',
				value: 299
			},{
				label: '899',
				value: 899
			},{
				label: '1699',
				value: 1699
			},{
				label: '3899',
				value: 3899
			},{
				label: '7899',
				value: 7899
			}]
		}
	},
	components: {
		NewbeeCouponModal,
		LbPicker
	},
	computed: {
		// app 页面高度, 屏幕高度, 手机状态高度, 页面导航栏高度
		...mapState('app', ['windowHeight', 'screenHeight', 'statusBarHeight', 'titleBarHeight']),
		// user 当前会员等级信息, 下一级会员等级信息, 当前成长值
		...mapState('user', ['grade', 'nextGrade', 'currentAmount']),
		// 升级所需成长值
		needNum() {
			return this.nextGrade.price - this.currentAmount
		},
		// 进度条百分比
		percent() {
			// 当前成长值-当前等级初始值 / 下一等级初始值-当前等级初始值
			return Number((this.currentAmount - this.grade.price) / (this.nextGrade.price - this.grade.price)) * 100
		},
		// 底部面板高度
		bottomMenuHeight() {
			return this.windowHeight - this.headBgHeight
		}
	},
	onLoad() {
		this.setSystemInfo()
	},
	mounted() {
		this.getHeadBgHeight()
	},
	methods: {
		// app 获取并设置系统信息
		...mapActions('app', ['setSystemInfo']),
		// 返回
		back() {
			this.$close()
		},
		openPriceModal() {
			this.$refs.picker.show()
		},
		// 获取头部背景高度
		getHeadBgHeight() {
			const query = uni.createSelectorQuery()
			query
				.select('.head-bg')
				.boundingClientRect(data => {
					this.headBgHeight = data.height
				})
				.exec()
		},
		// 充值
		recharge: throttle(async function() {
			const checkList = [{
				value: this.price,
				rules: [{
					type: 'required',
					msg: '请输入充值金额'
				}]
			}]
			if (this.phone) {
				checkList.push({
					value: this.phone,
					rules: [{
						type: 'phone',
						msg: '请输入正确的手机号'
					}]
				})
			}
			const checkRes = validator(checkList, this.$toast)
			if (checkRes.status !== 1000) return
			const params = {
				phone: this.phone,
				price: this.price
			}
			const [err, res] = await recharge(params)
			if (err) return
			this.getCodeByWxCode(res.data)
		}, 1000),
		// 微信/支付宝-授权
		async getCodeByWxCode(reflect) {
			this.$showLoading('支付中')
			// #ifdef MP-WEIXIN
			const provider = 'weixin'
			// #endif

			// #ifdef MP-ALIPAY
			const provider = 'alipay'
			// #endif

			const [loginErr, loginRes] = await uni.login({
				provider
			})
			if (loginErr) return
			const params = {
				code: loginRes.code,
				// #ifdef MP-WEIXIN
				loginType: 1
				// #endif
				// #ifdef MP-ALIPAY
				loginType: 2
				// #endif
			}
			const [err, res] = await getCodeByWxCode(params)
			if (err) return
			// #ifdef MP-WEIXIN
			this.payerUid = res.data.openid
			// #endif
			// #ifdef MP-ALIPAY
			this.payerUid = res.data.user_id
			// #endif
			this.paymentPrecreate(reflect)
		},
		// 发起支付
		async paymentPrecreate(reflect) {
			const params = {
				reflect,
				payerUid: this.payerUid,
				// #ifdef MP-WEIXIN
				payway: '3',
				// #endif
				// #ifdef MP-ALIPAY
				payway: '2',
				// #endif
				subPayway: '4',
				subject: '充值',
				totalAmount: this.price
			}
			const [err, res] = await paymentPrecreate(params)
			if (err) return
			this.pay(res.data.wapPayRequest)
		},
		// 支付
		async pay(wapPayRequest) {
			const params = {
				// #ifdef MP-WEIXIN
				provider: 'wxpay',
				// #endif
				// #ifdef MP-ALIPAY
				provider: 'alipay',
				// #endif
				...wapPayRequest
			}
			const [err, res] = await uni.requestPayment(params)
			if (err || (res && res.resultCode === '6001')) {
				this.$toast('用户取消支付')
				return
			}
			this.$toast('充值成功！')
			this.price = null
			this.$refs.newbeeCoupon.findNewCoupon()
		},
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

page {
	background-color: #5a7eff !important;
}

.vip {
	.head-bg {
		@include box-w(100%, #fff);

		.bg {
			@include square(100%, linear-gradient(180deg, rgba(90, 126, 255, 0.63), #5a7eff 100%));
			padding-bottom: 38rpx;

			.header {
				position: fixed;
				left: 0;
				top: 0;
				z-index: 9;
				@include box(100%, 82rpx);
				box-sizing: content-box;
				@include flex-row(space-between);
				.back,
				.empty {
					@include square(82rpx);
					@include flex-center;
					.arrow {
						@include square(28rpx);
						border: 2px solid #fff;
						border-bottom: 0;
						border-right: 0;
						transform: rotate(-45deg);
					}
				}
				.title {
					@include box(340rpx, 100%);
					@include font-set(36rpx, #fff, 700);
					@include flex-center;
				}
			}

			.header-mat {
				@include box(100%, 82rpx);
				box-sizing: content-box;
			}

			.level-box {
				@include box-w();
				margin-top: 60rpx;
				padding: 0 40rpx;
				@include flex-row(space-between);
				& > image {
					@include square(240rpx);
					display: block;
				}
				@include font-set(28rpx, #fff, 700);
			}

			.level-text {
				@include box-w();
				padding: 0 40rpx;
				@include flex-row(space-between);
				@include font-set(48rpx, #fff, 700);
				line-height: 68rpx;

				.level {
					@include box-w(240rpx);
					@include flex-center;
				}
			}

			.level-num-box {
				@include box-w(608rpx);
				margin: 30rpx auto 0;
				.level-bar {
					@include box(100%, 24rpx, rgba(0, 0, 0, 0.14));
					border-radius: 42rpx;
					.current {
						width: 0;
						height: 100%;
						background-color: #fff;
						border-radius: 42rpx;
						transition: all 1s;
					}
				}
				.current-text {
					@include box-w();
					@include flex-row(space-between);
					@include font-set(28rpx, #fff);
					line-height: 62rpx;
					margin-top: 6rpx;

					& > view {
						@include flex-row(flex-start, baseline);
						.num {
							@include font-set(48rpx, #fff);
							line-height: 62rpx;
							margin-left: 8rpx;
						}
					}
				}

				.hint {
					position: relative;
					@include box-h(72rpx, #ffffff);
					border-radius: 16rpx;
					margin-top: 30rpx;
					padding: 0 30rpx;
					@include flex-row();
					@include font-set(28rpx, #ffa05b);
					line-height: 40rpx;

					.arrow {
						position: absolute;
						right: 24rpx;
						top: -30rpx;
						width: 0;
						height: 0;
						border-bottom: 40rpx solid #fff;
						border-left: 20rpx solid transparent;
						border-right: 20rpx solid transparent;
					}
				}
			}
		}
	}

	.bottom-menu {
		position: fixed;
		bottom: 0;
		left: 0;
		z-index: 9;
		@include box-w(100%, #fff);
		border-radius: 40rpx 40rpx 0 0;
		padding: 0 70rpx;
		.title {
			@include flex-row();
			@include font-set(32rpx, #000, 700);
			line-height: 44rpx;
			margin-top: 40rpx;
			margin-bottom: 30rpx;

			.line {
				@include box(8rpx, 24rpx, #5a7eff);
				border-radius: 20rpx;
				margin-right: 20rpx;
			}
		}
		input {
			@include box(608rpx, 74rpx, #eff0f3);
			padding: 0 20rpx;
			border-radius: 10rpx;
			@include font-set(24rpx, #333);
		}
		.placeholder-class {
			@include box(100%, 74rpx, #eff0f3);
			border-radius: 10rpx;
			@include font-set(24rpx, #999);
		}
		.pay {
			position: absolute;
			left: 50%;
			bottom: 60rpx;
			transform: translateX(-50%);
			@include box(670rpx, 96rpx, #5a7eff);
			@include flex-center;
			border-radius: 50rpx;
			@include font-set(32rpx, #fff, 700);
		}
	}
}
</style>
