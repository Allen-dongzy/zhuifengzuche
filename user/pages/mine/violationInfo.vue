<template>
	<view class="">
		<view class="box">
			<view class="flexBox">
				<view class="bigblackText" style="width: 28%;">{{info.carNumber}}</view>
				<view class="blackText" style="width:72%;color: #999999;"
					@click="$open('/pages/order/orderDetail', {id: info.orderId})">查看订单 <view class="arrow"></view>
				</view>
			</view>
			<view class="flexBox">
				<view class="grayText">{{info.brandName}}</view>
			</view>
			<view class="flexBox">
				<view class="grayText">违法：</view>
				<view class="blackText">{{info.rulesName}}</view>
			</view>
			<view class="flexBox">
				<view class="grayText">地点：</view>
				<view class="blackText">{{info.rulesAddress}}</view>
			</view>
			<view class="flexBox">
				<view class="grayText">时间：</view>
				<view class="blackText">{{info.rulesTime}}</view>
			</view>
			<view class="flexBox" style="padding-bottom: 40rpx;border-bottom: 2rpx dashed #999999;">
				<view class="grayText">采集机关：</view>
				<view class="blackText">{{info.gatherOffice}}</view>
			</view>
			<view class="flexBox" style="margin-top:30rpx;">
				<view class="block">
					<view class="bigblackText">罚款：</view>
					<view class="bigblackText" style="color:#FC3736;">¥{{info.rulesMoney}}</view>
					<view class="bigblackText" style="margin-left: 40rpx;">记分：</view>
					<view class="bigblackText" style="color:#FC3736;">{{info.rulesScore}}</view>
				</view>
				<view v-if="info.payStatus" class="block">
					<image style="width:80rpx;height:40rpx;" :src="`${ossUrl}/mine/yizhifu.png`" mode="aspectFill">
					</image>
				</view>
			</view>
		</view>
		<view class="grayLine"></view>
		<view v-if="info.payStatus" class="box">
			<view class="item">
				<view class="title">单据单号</view>
				<view class="grayText" style="width: 80%;text-align: right;">{{info.rulesNo}}</view>
			</view>
			<view v-if="info.rulesUrls" class="item">
				<view class="title">单据照片</view>
				<view class="grayText" style="width: 80%;text-align: right;">
					<image style="width:200rpx;height:120rpx;background-color: #eee;" :src="info.rulesUrls"
						mode="aspectFill" @click="previewPics([info.rulesUrls])"></image>
				</view>
			</view>
			<view class="item col">
				<view class="title">备注消息</view>
				<view class="flexBox" style="color: #999999;font-size: 24rpx;">{{info.remarks}}</view>
			</view>
		</view>
		<view class="btn-mat" v-if="!info.payStatus"></view>
		<view class="btn-mask" v-if="!info.payStatus">
			<view class="btn" @click="getCodeByWxCode">去支付</view>
		</view>
	</view>
</template>

<script>
	import {
		breakRulesFindOneById
	} from '@/apis/breakRules'
	import {
		getCodeByWxCode
	} from '@/apis/sso'
	import {
		paymentPrecreate
	} from '@/apis/payment'
	import {
		previewImgs
	} from '@/utils/uni-tools'
	import {
		throttle
	} from '@/utils/tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				id: '',
				info: {}
			}
		},
		onLoad(e) {
			if (e && e.id) this.id = e.id
			this.breakRulesFindOneById()
		},
		methods: {
			// 获取违章详情
			async breakRulesFindOneById() {
				const [err, res] = await breakRulesFindOneById(this.id)
				if (err) return
				this.info = res.data
			},
			// 预览图片
			previewPics(urls, index = 0) {
				previewImgs(urls, index = 0)
			},
			// 授权
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
				this.paymentPrecreate(res.data.openid)
				// #endif
				// #ifdef MP-ALIPAY
				this.paymentPrecreate(res.data.user_id)
				// #endif
			}),
			// 发起支付
			async paymentPrecreate(payerUid) {
				const params = {
					reflect: this.info.reflect,
					orderId: this.info.reflect.orderId,
					payerUid,
					// #ifdef MP-WEIXIN
					payway: '3',
					// #endif
					// #ifdef MP-ALIPAY
					payway: '2',
					// #endif
					subPayway: '4',
					subject: '违章罚款',
					totalAmount: this.info.rulesMoney
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
				if (err) return
				this.$toast('支付成功！')
				this.breakRulesFindOneById()
			}
		}
	}
</script>

<style lang="scss">
	.box {
		width: 90%;
		margin: auto;
		margin-top: 30rpx;
	}

	.arrow {
		width: 14rpx;
		height: 14rpx;
		border: 1px solid #999999;
		border-left: 0;
		border-bottom: 0;
		transform: rotate(45deg);
		margin-top: 8rpx;
		margin-left: 8rpx;
	}

	.flexBox {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 20rpx 0rpx;

		.block {
			display: flex;
		}
	}

	.title {
		font-size: 28rpx;
		color: #000;
		line-height: 40rpx;
		font-weight: 700;
	}

	.grayText {
		color: #999999;
		font-size: 28rpx;
		width: 25%;
	}

	.blackText {
		display: flex;
		justify-content: flex-end;
		width: 75%;
		text-align: right;
		color: #000000;
		font-size: 24rpx;
	}

	.bigblackText {
		font-size: 28rpx;
		color: #000000;
	}

	.grayLine {
		height: 20rpx;
		width: 100%;
		background-color: #EFF0F3;
		margin-top: 30rpx;
	}

	.item {
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;

		&~.item {
			border-top: 1px solid #eee;
		}

		&.col {
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
		}
	}

	.btn-mat {
		height: 200rpx;
	}

	.btn-mask {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 9;
		width: 100%;
		height: 200rpx;
		background-color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.btn {
		color: white;
		width: 90%;
		background-color: #5A7EFF;
		border-radius: 50px;
		font-size: 32rpx;
		height: 96rpx;
		line-height: 96rpx;
		text-align: center;
	}
</style>
