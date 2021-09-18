<template>
	<view class="order-pay">
		<view class="info">
			<view class="caption">实付租金</view>
			<view class="price">
				￥
				<text>{{ price }}</text>
			</view>
		</view>
		<view class="toast">*租车押金￥{{ rentalMoney || 0 }}</view>
		<!-- #ifdef MP-WEIXIN -->
		<view class="btn" @click="getCodeByWxCode">支&#32;付</view>
		<!-- #endif -->
		<!-- #ifdef MP-ALIPAY -->
		<view class="btn" @click="getCodeByWxCode">免押支付</view>
		<!-- #endif -->
	</view>
</template>

<script>
import { getCodeByWxCode } from '@/apis/sso'
import { paymentPrecreate, paymentAliPayFrozenMoney, paymentAliPayCallback, paymentAliPayFrozenCancel, paymentCancelPay } from '@/apis/payment'
import { throttle } from '@/utils/tools'

export default {
	data() {
		return {
			price: '', // 钱
			reflect: {}, // 支付信息
			rentalMoney: '', // 租车押金
			orderSn: '', // 订单编号
			payerUid: '' // 平台
		}
	},
	onLoad(e) {
		if (e && e.price) this.price = e.price
		if (e && e.reflect) this.reflect = JSON.parse(e.reflect)
		if (e && e.rentalMoney) this.rentalMoney = e.rentalMoney
		this.orderSn = this.reflect.orderSn
	},
	methods: {
		/**
		 * 微信：getCodeByWxCode -> paymentPrecreate -> pay
		 * 支付宝：getCodeByWxCode -> paymentAliPayFrozenMoney -> aliTradePay -> paymentAliPayCallback -> paymentPrecreate -> pay
		 */
		// 微信/支付宝-授权
		getCodeByWxCode: throttle(async function() {
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
			this.paymentPrecreate()
			// #endif
			
			// #ifdef MP-ALIPAY
			this.payerUid = res.data.user_id
			this.paymentAliPayFrozenMoney()
			// #endif
		}),
		// 租金-发起支付
		async paymentPrecreate() {
			const params = {
				reflect: this.reflect,
				orderId: this.reflect.orderId,
				payerUid: this.payerUid,
				// #ifdef MP-WEIXIN
				payway: '3',
				// #endif
				// #ifdef MP-ALIPAY
				payway: '2',
				// #endif
				subPayway: '4',
				subject: '租车租金',
				totalAmount: this.price
			}
			const [err, res] = await paymentPrecreate(params)
			if (err) {
				this.paymentCancelPay()
				return
			}
			this.pay(res.data.wapPayRequest)
		},
		// 租金-支付
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
				this.paymentCancelPay()
				return
			}
			this.$toast('租车成功！')
			uni.$emit('orderRefresh')
			setTimeout(() => {
				this.$open('/pages/order/order', 3)
			}, 500)
		},
		// 支付宝-发起免押冻结
		paymentAliPayFrozenMoney: throttle(async function() {
			const params = {
				orderSn: this.orderSn,
				amount: Number(this.rentalMoney)
			}
			const [err, res] = await paymentAliPayFrozenMoney(params)
			if (err || !res.data.orderStr) return
			this.aliTradePay(res.data.orderStr)
		}),
		// 支付宝-免押冻结支付
		aliTradePay(orderStr) {
			my.tradePay({
				orderStr,
				success: res => {
					if (res.resultCode === '6001') {
						this.paymentAliPayFrozenCancel()
						return
					}
					this.paymentAliPayCallback(JSON.parse(res.result))
				},
				fail: err => {
					this.paymentAliPayFrozenCancel()
					console.log(err)
				}
			})
		},
		// 支付宝-免押资金授权撤销
		async paymentAliPayFrozenCancel() {
			const params = {
				orderSn: this.orderSn
			}
			const [err, res] = await paymentAliPayFrozenCancel(params)
			if (err) return
			this.$toast('撤销免押成功！')
		},
		//  支付宝-免押资金解冻
		async paymentCancelPay() {
			const params = {
				orderSn: this.orderSn,
				amount: Number(this.rentalMoney)
			}
			const [err, res] = await paymentCancelPay(params)
			if (err) return
			this.$toast('支付失败！')
		},
		// 支付宝-免押冻结回调
		async paymentAliPayCallback(info) {
			const params = {
				amount: info.alipay_fund_auth_order_app_freeze_response.amount,
				outOrderNo: info.alipay_fund_auth_order_app_freeze_response.out_order_no,
				authNo: info.alipay_fund_auth_order_app_freeze_response.auth_no,
				fundAmount: info.alipay_fund_auth_order_app_freeze_response.fund_amount || info.alipay_fund_auth_order_app_freeze_response.amount,
				outRequestNo: info.alipay_fund_auth_order_app_freeze_response.out_request_no,
				preAuthType: info.alipay_fund_auth_order_app_freeze_response.pre_auth_type || 'CREDIT_AUTH',
				creditAmount: info.alipay_fund_auth_order_app_freeze_response.credit_amount || info.alipay_fund_auth_order_app_freeze_response.amount,
				orderRecordType: 15
			}
			const [err, res] = await paymentAliPayCallback(params)
			if (err) return
			this.$toast('押金免押成功！')
			this.paymentPrecreate()
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
		border-bottom: 1px solid #eff0f3;

		.caption {
			@include font-set(28rpx, #000, 500);
		}

		.price {
			@include font-set(20rpx, #fc3736, 700);

			text {
				@include font-set(36rpx, #fc3736, 700);
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
		@include box(670rpx, 96rpx, #5a7eff);
		@include flex-center;
		@include font-set(32rpx, #fff, 700);
		border-radius: 52rpx;
	}
}
</style>
