<template>
	<view class="order-pay">
		<view class="info">
			<view class="caption">实付租金</view>
			<view class="price">￥<text>{{price}}</text></view>
		</view>
		<view class="toast">*取车时支付租车押金￥{{rentalMoney || 0}}，可以取车时申请免押</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="btn" @click="getCodeByWxCode">支&#32;付</view>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<view class="btn" @click="getCodeByWxCode">免押支付</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import {
		getCodeByWxCode
	} from '@/apis/sso'
	import {
		paymentPrecreate,
		paymentAliPayFrozenMoney,
		paymentAliPayCallback
	} from '@/apis/payment'
	import {
		throttle
	} from '@/utils/tools'

	export default {
		data() {
			return {
				price: '', // 钱
				reflect: {}, // 支付信息
				rentalMoney: '' // 租车押金
			}
		},
		onLoad(e) {
			if (e && e.price) this.price = e.price
			if (e && e.reflect) this.reflect = JSON.parse(e.reflect)
			if (e && e.rentalMoney) this.rentalMoney = e.rentalMoney
		},
		methods: {
			// 微信-授权
			getCodeByWxCode: throttle(async function(index) {
				if (!this.price) {
					this.$toast('金额错误！')
					return
				}
				const [loginErr, loginRes] = await uni.login({
					provider: 'weixin'
				})
				if (loginErr) return
				const params = {
					code: loginRes.code,
					loginType: 1
				}
				const [err, res] = await getCodeByWxCode(params)
				if (err) return
				this.paymentPrecreate(res.data.openid, index)
			}),
			// 微信-发起支付
			async paymentPrecreate(openId, index) {
				const params = {
					reflect: this.reflect,
					orderId: this.reflect.orderId,
					payerUid: openId,
					payway: '3',
					subPayway: '4',
					subject: '租车定金',
					totalAmount: this.price
				}
				const [err, res] = await paymentPrecreate(params)
				if (err) return
				this.pay(res.data.wapPayRequest)
			},
			// 微信-支付
			async pay(wapPayRequest) {
				const [err, res] = await uni.requestPayment({
					provider: 'wxpay',
					...wapPayRequest
				})
				if (err) return
				this.$toast('租车成功！')
				uni.$emit('orderRefresh')
				setTimeout(() => {
					this.$open('/pages/order/order', 3)
				}, 500)
			},
			// 支付宝-发起冻结
			paymentAliPayFrozenMoney: throttle(async function() {
				const params = {
					orderSn: this.reflect.orderId,
					amount: this.price
				}
				const [err, res] = await paymentAliPayFrozenMoney(params)
				if (err || !res.data.orderStr) return
				this.aliTradePay(res.data.orderStr)
			}),
			// 支付宝-冻结支付
			aliTradePay(orderStr) {
				my.tradePay({
					orderStr,
					success: (res) => {
						this.paymentAliPayCallback(JSON.parse(res.result))
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			// 支付宝-冻结回调
			async paymentAliPayCallback(info) {
				const params = {
					amount: info.alipay_fund_auth_order_app_freeze_response.amount,
					outOrderNo: info.alipay_fund_auth_order_app_freeze_response.out_order_no,
					authNo: info.alipay_fund_auth_order_app_freeze_response.auth_no,
					fundAmount: info.alipay_fund_auth_order_app_freeze_response.fund_amount,
					outRequestNo: info.alipay_fund_auth_order_app_freeze_response.out_request_no,
					preAuthType: info.alipay_fund_auth_order_app_freeze_response.pre_auth_type,
					creditAmount: info.alipay_fund_auth_order_app_freeze_response.credit_amount,
					orderRecordType: 15
				}
				const [err, res] = await paymentAliPayCallback(params)
				if (err) return
				this.$toast('租车成功！')
				uni.$emit('orderRefresh')
				setTimeout(() => {
					this.$open('/pages/order/order', 3)
				}, 500)
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
