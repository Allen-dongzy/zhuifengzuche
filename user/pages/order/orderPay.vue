<template>
	<view class="order-pay">
		<view class="info">
			<view class="caption">实付租金</view>
			<view class="price">￥<text>{{price}}</text></view>
		</view>
		<view class="toast">*取车时支付租车押金￥5000，可以取车时申请免押</view>
		<view class="btn" @click="getCodeByWxCode">支&#32;付</view>
	</view>
</template>

<script>
	import {
		getCodeByWxCode
	} from '@/apis/sso'
	import {
		paymentPrecreate
	} from '@/apis/payment'
	import {
		throttle
	} from '@/utils/tools'

	export default {
		data() {
			return {
				price: '',
				reflect: {}, // 支付信息
			}
		},
		onLoad(e) {
			if (e && e.price) this.price = e.price
			if (e && e.reflect) this.reflect = JSON.parse(e.reflect)
		},
		methods: {
			// 微信平台是否有登录能力
			async isLoginFunc() {
				let returnRes = ''
				const [err, res] = await uni.getProvider({
					service: 'oauth'
				})
				if (res && ~res.provider.indexOf('weixin')) returnRes = 'weixin'
				return returnRes
			},
			// 授权
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
			// 发起支付
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
			// 支付
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
