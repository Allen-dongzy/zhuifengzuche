<template>
	<view class="order-detail">
		<view v-if="info.orderStatus === 0 || info.orderStatus === 1 || info.orderStatus === 2" class="top-panel-1">
			<view v-if="info.orderStatus === 1 || info.orderStatus === 2" class="statu-bar">
				<view class="status">{{ statusShow }}</view>
				<view v-if="info.orderStatus === 1" class="refresh" @click="refresh">
					<image :src="`${ossUrl}/order/refresh.png`" mode="aspectFill"></image>
					刷新
				</view>
			</view>
			<view v-if="(info.orderStatus === 0 || info.orderStatus === 1) && info.countdown" class="info">{{ info.countdown }}</view>
			<view class="bottom">
				<view class="btn-box">
					<view v-if="info.orderStatus === 0 || info.orderStatus === 1 || info.orderStatus === 2" class="btn white" @click="rentalOrderCancelOrderByUserGet">
						取消订单
					</view>
					<!-- #ifdef MP-WEIXIN -->
					<view v-if="info.orderStatus === 0" class="btn blue" @click="getCodeByWxCode">立即支付</view>
					<!-- #endif -->
					<!-- #ifdef MP-ALIPAY -->
					<view v-if="info.orderStatus === 0" class="btn blue" @click="getCodeByWxCode">免押支付</view>
					<!-- #endif -->
					<view
						v-if="info.orderStatus === 2"
						class="btn white"
						@click="$open('/pages/order/goInspect', { mode: 'edit', from: 'orderDetail', orderId: info.id, vehicleId: info.vehicleId })"
					>
						查看车况
					</view>
				</view>
				<view v-if="info.orderStatus === 0 || info.orderStatus === 1" class="contact" @click="contactStore">
					<image class="phone" :src="`${ossUrl}/common/phone-big.png`" mode="aspectFill"></image>
					联系门店
				</view>
				<view v-if="info.orderStatus === 2" class="contact" @click="contactSendCarPart">
					<image class="phone" :src="`${ossUrl}/common/phone-big.png`" mode="aspectFill"></image>
					联系送车员
				</view>
			</view>
		</view>
		<view v-if="info.orderStatus === 3 || info.orderStatus === 4 || info.orderStatus === 5 || info.orderStatus === 100 || info.orderStatus === 101" class="top-panel-2">
			<view class="top">
				<image class="bg" :src="`${ossUrl}/order/order-bg.png`" mode="aspectFill"></image>
				<view class="mask">
					<view class="caption">{{ statusShow }}</view>
					<view v-if="info.orderStatus === 3" class="toast">{{ info.countdown }}</view>
					<view v-if="info.orderStatus === 4" class="toast">请前往换车详情页面完成换车</view>
					<view v-if="info.orderStatus === 5" class="toast">请到前往还车中查看还车状态</view>
					<view v-if="info.orderStatus === 100" class="toast">感谢您对追风租车的信任，期待再次光临</view>
					<view v-if="info.orderStatus === 101" class="toast">您的订单已取消，感谢你使用追风租车</view>
				</view>
			</view>
			<view v-if="info.orderStatus === 3 || info.orderStatus === 5" class="menu">
				<view class="menu-box">
					<view class="header">
						<image class="icon" :src="`${ossUrl}/order/exclamation.png`" mode="aspectFill"></image>
						<view class="caption">{{ info.breakRulesString }}</view>
					</view>
					<view class="btn-box">
						<view class="btn white" @click="contactStore">联系门店</view>
						<view v-if="info.orderStatus === 3 && !info.isLeaseRenewal" class="btn white" @click="rentalOrderRenewCarRentalPriceCheck">续租用车</view>
						<view v-if="isShowReturnCarBtn" class="btn blue" @click="returnCar">前往还车</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-card" :class="{ radius: info.orderStatus === 4 || info.orderStatus === 100 || info.orderStatus === 101 }">
			<view class="info">
				<image class="picture" :src="info.vehicleModelFiles | jsonFormat" mode="aspectFill"></image>
				<view class="description">
					<view class="name">{{ info.modelName }}</view>
					<view class="params">{{ info.modelTypeName }}</view>
					<view class="type">{{ info.model }}</view>
				</view>
			</view>
			<view class="order-caption">租期</view>
			<view class="order-header">
				<view class="left">
					<view class="caption">{{ info.takeCarDateShow }}</view>
					<view class="sub-caption">
						<text>{{ info.takeCarDayShow }}</text>
						<text>{{ info.takeCarTimeShow }}</text>
					</view>
				</view>
				<view class="title">
					<view class="left-arrow"></view>
					<view class="info">共{{ totalDate || 0 }}天</view>
					<view class="right-arrow"></view>
				</view>
				<view class="right">
					<view class="caption">{{ info.carAlsoDateShow }}</view>
					<view class="sub-caption">
						<text>{{ info.carAlsoDayShow }}</text>
						<text>{{ info.carAlsoTimeShow }}</text>
					</view>
				</view>
			</view>
			<view v-if="info.startDeliveryName === info.endDeliveryName" class="address">
				<view class="label">取还</view>
				{{ info.startDeliveryName }}
			</view>
			<view v-if="info.startDeliveryName !== info.endDeliveryName">
				<view class="address">
					<view class="label">取</view>
					{{ info.endDeliveryName }}
				</view>
				<view class="address">
					<view class="label">还</view>
					{{ info.startDeliveryName }}
				</view>
			</view>
			<view class="empty-block"></view>
		</view>

		<view class="info-card-1">
			<view v-if="info.orderStatus === 0" class="order-item">
				<view class="left">
					<view class="top">
						驾无忧保障
						<image class="question" :src="`${ossUrl}/order/question.png`" mode="aspectFill"></image>
						<view class="price">￥{{ info.insuranceDayPriceByDay || 0 }}/天</view>
					</view>
					<view class="bottom">添加一份无忧保障，添一份安心</view>
				</view>
				<view class="right">￥{{ info.insuranceDayPrice || 0 }}</view>
			</view>
			<view v-if="info.orderStatus === 0" class="order-item">
				<view class="left">优惠券</view>
				<view class="right">{{ info.useCouponPrice ? `-￥${info.useCouponPrice.toString().slice(1)}` : '-￥0' }}</view>
			</view>
			<view class="order-item">
				<view class="left">
					<view class="cost" @click="$open('/pages/order/costDetail', { info: JSON.stringify(info.orderPriceInfo) })">
						总计
						<text>费用明细</text>
						<view class="arrow"></view>
					</view>
				</view>
				<view class="right">￥{{ info.orderDeposit || 0 }}</view>
			</view>
		</view>

		<view class="info-card-2">
			<view class="order-item">
				<view class="left">订单号</view>
				<view class="right">{{ info.orderSn }}</view>
			</view>
			<view v-if="info.timeList && info.timeList.length > 0" class="order-item" @click="openTimePopup">
				<view class="left">{{ info.timeList[0].name }}</view>
				<view class="right">
					{{ info.timeList[0].time }}
					<view class="arrow"></view>
				</view>
			</view>
			<view class="order-item">
				<view class="left">租车押金</view>
				<view class="right">￥{{ info.rentalMoney }}</view>
			</view>
			<view class="order-item">
				<view class="left">押金免押状态</view>
				<view class="right">{{ info.depositType === 0 || info.orderSource === 3 ? '全额免押' : '未免押' }}</view>
			</view>
			<view class="order-item">
				<view class="left">支付方式</view>
				<view class="right">{{ info.paymentType }}</view>
			</view>
			<view
				v-if="info.orderStatus === 3 || info.orderStatus === 5"
				class="order-item"
				@click="
					$open('/pages/order/depositReceived', {
						payTheVoucherRentalCarDeposit: info.payTheVoucherRentalCarDeposit,
						paymentVoucherHandler: info.paymentVoucherHandler,
						paymentVoucherTransactionTime: info.paymentVoucherTransactionTime
					})
				"
			>
				<view class="left">支付凭证</view>
				<view class="right">
					预收冻结￥{{ info.payTheVoucherRentalCarDeposit }}
					<view class="arrow"></view>
				</view>
			</view>
			<view class="order-item">
				<view class="left">
					<view class="top">订单备注</view>
					<view class="bottom margin">{{ info.remark || '' }}</view>
				</view>
				<view class="right"></view>
			</view>
		</view>

		<view v-if="info.orderStatus === 4 || info.orderStatus === 100 || info.orderStatus === 101" class="bottom-bar">
			<view class="left">
				<image v-if="info.orderStatus === 4" class="icon" :src="`${ossUrl}/order/smile.png`" mode="aspectFill"></image>
				<image v-if="info.orderStatus !== 4" class="icon" :src="`${ossUrl}/order/price.png`" mode="aspectFill"></image>
				<text v-if="info.orderStatus === 4">追风租车祝您生活愉快</text>
				<text v-if="info.orderStatus === 100">{{ info.retreatIllegalDepositStatus === 0 ? '违章押金未退还' : '违章押金已退还' }}</text>
				<text v-if="info.orderStatus === 101">半小时内免费取消，金额已原路退回</text>
			</view>
			<view class="right">
				<view v-if="info.orderStatus === 100 || info.orderStatus === 101" class="contact" @click="contactStore">
					<image class="phone" :src="`${ossUrl}/common/phone-big.png`" mode="aspectFill"></image>
					联系门店
				</view>
				<view v-if="info.orderStatus === 4 || info.orderStatus === 100" class="btn-box">
					<view v-if="info.orderStatus === 4" class="btn white" @click="contactSendCarPart">联系送车员</view>
					<view v-if="info.orderStatus === 4" class="btn blue" @click="$open('/pages/order/changeCarDetail', { id: info.id })">换车详情</view>
					<view
						v-if="info.orderStatus === 100 && info.evaluateCount === 0"
						class="btn blue"
						@click="$open('/pages/order/evaluate', { from: 'orderDetail', orderId: info.id, memberShopId: info.memberShopId })"
					>
						评价订单
					</view>
					<view
						v-if="info.orderStatus === 100 && info.evaluateCount > 0"
						class="btn blue"
						@click="$open('/pages/common/storeComment', { orderId: info.id, id: info.memberShopId })"
					>
						查看评价
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-mat"></view>

		<!-- 弹窗-时间 -->
		<uni-popup ref="timePopup" type="center">
			<view class="time-modal">
				<view class="m-item" v-for="(item, index) in info.timeList" :key="index">
					<view class="caption">{{ item.name }}</view>
					<view class="time">{{ item.time }}</view>
				</view>
				<view class="btn" @click="closeTimePopup">关闭</view>
			</view>
		</uni-popup>
		<newbee-coupon-modal :type="type" ref="newbeeCoupon" />
	</view>
</template>

<script>
import NewbeeCouponModal from '@/components/newbee-coupon-modal/newbee-coupon-modal'
import { rentalOrderOrderInfo, rentalOrderCancelOrderByUser, rentalOrderCancelOrderByUserGet, rentalOrderRenewCarRentalPriceCheck } from '@/apis/rentalOrder'
import { getCodeByWxCode } from '@/apis/sso'
import { paymentPrecreate, paymentAliPayFrozenMoney, paymentAliPayCallback, paymentAliPayFrozenCancel, paymentCancelPay } from '@/apis/payment'
import { throttle, transCommonTime } from '@/utils/tools'
import { showModal } from '@/utils/uni-tools'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			id: '',
			info: {}, // 订单信息 info.orderSource 0=支付宝小程序 1=微信小程序 2=凹凸 3=飞猪
			week: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			payerUid: '', // 平台openid
			type: null // 优惠券类型
		}
	},
	components: {
		NewbeeCouponModal
	},
	computed: {
		// 总天数
		totalDate() {
			const startTime = new Date(transCommonTime(this.info.rentBeginTime)).getTime()
			const endTime = new Date(transCommonTime(this.info.rentEndTime)).getTime()
			const diff = endTime - startTime
			return diff % 86400000 === 0 ? diff / 86400000 : parseInt(diff / 86400000) + 1
		},
		// 状态显示
		statusShow() {
			let info = ''
			switch (Number(this.info.orderStatus)) {
				case 1:
					info = '等待送车'
					break
				case 2:
					info = '正在送车'
					break
				case 3:
					info = '租用中'
					break
				case 4:
					info = '换车中'
					break
				case 5:
					info = '租用中'
					break
				case 100:
					info = '订单已完成'
					break
				case 101:
					info = '订单已取消'
					break
			}
			return info
		},
		// 是否显示还车按钮
		isShowReturnCarBtn() {
			let res = true
			if (this.info.orderSource === 3 && Date.now() < new Date(transCommonTime(this.info.rentEndTime)).getTime()) res = false
			return res
		}
	},
	filters: {
		jsonFormat(str) {
			return str ? JSON.parse(str)[0] : ''
		}
	},
	onLoad(e) {
		if (e && e.id) this.id = e.id
		this.eventListener()
	},
	onShow() {
		if (this.id) this.rentalOrderOrderInfo()
	},
	onPullDownRefresh() {
		this.rentalOrderOrderInfo('refresh')
	},
	methods: {
		// 请求订单详情
		async rentalOrderOrderInfo(key) {
			const params = {
				orderId: this.id
			}
			const [err, res] = await rentalOrderOrderInfo(params)
			if (key === 'refresh') uni.stopPullDownRefresh()
			if (err) return
			this.info = res.data
			const rentBeginTime = this.timeFormat(this.info.rentBeginTime)
			this.info.takeCarDateShow = rentBeginTime[0]
			this.info.takeCarDayShow = rentBeginTime[1]
			this.info.takeCarTimeShow = rentBeginTime[2]
			const rentEndTime = this.timeFormat(this.info.rentEndTime)
			this.info.carAlsoDateShow = rentEndTime[0]
			this.info.carAlsoDayShow = rentEndTime[1]
			this.info.carAlsoTimeShow = rentEndTime[2]
		},
		// 续租用车
		rentalOrderRenewCarRentalPriceCheck: throttle(async function(index) {
			const params = {
				orderId: this.info.id
			}
			const [err, res] = await rentalOrderRenewCarRentalPriceCheck(params)
			if (err) return
			this.$open('/pages/order/renewal', {
				orderId: this.info.id,
				vehicleId: this.info.vehicleId,
				mode: 'orderDetail'
			})
		}),
		// 取消订单
		rentalOrderCancelOrderByUser: throttle(async function() {
			const params = {
				orderId: this.info.id
			}
			const [err, res] = await rentalOrderCancelOrderByUser(params)
			if (err) return
			this.$toast('订单取消成功')
			uni.$emit('orderRefresh')
			setTimeout(() => {
				this.$close()
			}, 500)
		}),
		// 取消订单弹出信息
		rentalOrderCancelOrderByUserGet: throttle(async function() {
			const params = {
				orderId: this.info.id
			}
			const [err, res] = await rentalOrderCancelOrderByUserGet(params)
			if (err) return
			const [btnErr, btnRes] = await this.$showModal({
				content: res.message
			})
			if (btnRes !== 'confirm') return
			this.rentalOrderCancelOrderByUser()
		}),
		/**
		 * 微信：getCodeByWxCode -> paymentPrecreate -> pay
		 * 支付宝：getCodeByWxCode -> paymentAliPayFrozenMoney -> aliTradePay -> paymentAliPayCallback -> paymentPrecreate -> pay
		 */
		// 微信/支付宝-授权
		getCodeByWxCode: throttle(async function() {
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
				reflect: this.info.reflect,
				orderId: this.info.id,
				payerUid: this.payerUid,
				// #ifdef MP-WEIXIN
				payway: '3',
				// #endif
				// #ifdef MP-ALIPAY
				payway: '2',
				// #endif
				subPayway: '4',
				subject: '租车定金',
				totalAmount: this.info.orderDeposit
			}
			const [err, res] = await paymentPrecreate(params)
			if (err) {
				// #ifdef MP-ALIPAY
				this.paymentCancelPay()
				// #endif
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
				// #ifdef MP-ALIPAY
				this.paymentCancelPay()
				// #endif
				return
			}
			this.$toast('租车成功！')
			this.rentalOrderOrderInfo()
			uni.$emit('orderRefresh')
		},
		// 支付宝-发起免押冻结
		paymentAliPayFrozenMoney: throttle(async function() {
			const params = {
				orderSn: this.info.orderSn,
				amount: Number(this.info.rentalMoney)
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
				orderSn: this.info.orderSn
			}
			const [err, res] = await paymentAliPayFrozenCancel(params)
			if (err) return
			this.$toast('撤销免押成功！')
		},
		//  支付宝-免押资金解冻
		async paymentCancelPay() {
			const params = {
				orderSn: this.info.orderSn,
				amount: Number(this.info.rentalMoney)
			}
			const [err, res] = await paymentCancelPay(params)
			if (err) return
			this.$toast('支付失败！')
		},
		// 支付宝-冻结回调
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
		},
		// 时间转日期时间周几
		timeFormat(timeStr) {
			timeStr = transCommonTime(timeStr)
			const timeObj = new Date(timeStr)
			const returnArr = []
			returnArr.push(`${timeObj.getMonth() + 1}月${timeObj.getDate()}日`)
			returnArr.push(this.week[timeObj.getDay()])
			returnArr.push(`${this.add0(timeObj.getHours())}:${this.add0(timeObj.getMinutes())}`)
			return returnArr
		},
		// 补0
		add0(num) {
			return num !== 0 ? num : '00'
		},
		// 刷新
		refresh: throttle(function() {
			this.rentalOrderOrderInfo()
		}),
		// 联系门店
		contactStore() {
			this.phoneCall(this.info.memberPhone)
		},
		// 联系送车员
		contactSendCarPart() {
			this.phoneCall(this.info.startUserPhone)
		},
		// 打电话
		phoneCall(phoneNumber) {
			uni.makePhoneCall({
				phoneNumber
			})
		},
		// 打开时间模态框
		openTimePopup() {
			this.$refs.timePopup.open()
		},
		// 关闭时间模态框
		closeTimePopup() {
			this.$refs.timePopup.close()
		},
		// 还车
		async returnCar() {
			if (this.info.orderStatus === 3) {
				const [err, res] = await showModal({
					content: '是否确定还车？'
				})
				if (res !== 'confirm') return
			}
			this.$open('/pages/order/returnCar', {
				from: 'orderDetail',
				orderSn: this.info.orderSn,
				orderStatus: this.info.orderStatus,
				orderId: this.info.id,
				vehicleId: this.info.vehicleId
			})
		},
		// 监听函数
		eventListener() {
			uni.$on('orderDetailRefresh', e => {
				if (e.mode === 'modal') {
					this.type = e.type
					this.$refs.newbeeCoupon.findNewCoupon()
				}
				uni.$emit('orderRefresh')
			})
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

page {
	background-color: #eff0f3 !important;
}

.order-detail {
	.top-panel-1 {
		@include box-w(100%, #fff);
		padding: 40rpx;

		.statu-bar {
			@include flex-row(space-between);

			.status {
				@include font-set(28rpx, #5a7eff, 700);
				line-height: 40rpx;
			}

			.refresh {
				@include flex-row();

				image {
					@include square(40rpx);
					margin-right: 10rpx;
				}

				@include font-set(24rpx, #999, 500);
				line-height: 36rpx;
			}
		}

		.text-box {
			.text {
				@include font-set(24rpx, #999);
				line-height: 34rpx;
				margin-top: 20rpx;
			}
		}

		.info {
			@include font-set(36rpx, #000, 700);
			line-height: 50rpx;
			margin-top: 58rpx;
		}

		.bottom {
			@include flex-row(space-between);
			margin-top: 56rpx;

			.btn-box {
				@include flex-row();

				.btn {
					@include box(136rpx, 60rpx);
					@include flex-center;
					border-radius: 12rpx;
					font-size: 24rpx;

					& ~ .btn {
						margin-left: 30rpx;
					}

					&.white {
						background-color: #fff;
						border: 1px solid #5a7eff;
						color: #5a7eff;
					}

					&.blue {
						background-color: #5a7eff;
						color: #fff;
					}
				}
			}

			.contact {
				@include box-h(60rpx);
				@include flex-row();
				@include font-set(24rpx, #ffa05b, 500);
				line-height: 36rpx;

				.phone {
					@include square(32rpx);
					margin-right: 10rpx;
				}
			}
		}
	}

	.top-panel-2 {
		.top {
			position: relative;
			@include box(100%, 192rpx);

			.bg {
				@include square();
			}

			.mask {
				position: absolute;
				left: 0;
				top: 0;
				@include square();
				padding: 40rpx;

				.caption {
					@include font-set(32rpx, #fff, 700);
					line-height: 44rpx;
				}

				.toast {
					@include font-set(24rpx, #fff);
					line-height: 34rpx;
					margin-top: 14rpx;

					text {
						@include font-set(32rpx, #fff, 700);
						line-height: 44rpx;
						margin: 0 12rpx;
					}
				}
			}
		}

		.menu {
			height: 230rpx;

			.menu-box {
				@include box(100%, 242rpx, #fff);
				transform: translateY(-12rpx);
				border-radius: 20rpx 20rpx 0 0;
				padding: 34rpx 40rpx 40rpx;

				.header {
					@include flex-row(flex-start, flex-start);

					.icon {
						@include square(24rpx);
						margin-top: 5rpx;
					}

					.caption {
						@include font-set(24rpx, #999);
						line-height: 34rpx;
						margin-left: 12rpx;
					}
				}

				.btn-box {
					@include flex-row();
					margin-top: 40rpx;

					.btn {
						@include box(136rpx, 60rpx);
						@include flex-center;
						border-radius: 12rpx;
						font-size: 24rpx;

						& ~ .btn {
							margin-left: 30rpx;
						}

						&.white {
							border: 1px solid #5a7eff;
							color: #5a7eff;
						}

						&.blue {
							background-color: #5a7eff;
							color: #fff;
						}
					}
				}
			}
		}
	}

	.order-card {
		position: relative;
		@include box-w(100%, #fff);
		padding: 40rpx 32rpx;
		margin-top: 20rpx;

		&.radius {
			border-radius: 20rpx 20rpx 0 0;
			margin-top: 0;
			transform: translateY(-12rpx);
		}

		.info {
			@include flex-row();

			.picture {
				@include box(204rpx, 128rpx, #eee);
				border-radius: 2px;
			}

			.description {
				margin-left: 38rpx;

				.name {
					@include font-set(28rpx, #000, 500);
					line-height: 40rpx;
				}

				.params {
					@include font-set(20rpx, #999);
					line-height: 28rpx;
					margin-top: 12rpx;
				}

				.type {
					@include font-set(20rpx, #999);
					line-height: 28rpx;
					margin-top: 16rpx;
				}
			}
		}

		.order-caption {
			@include font-set(32rpx, #000, 700);
			line-height: 44rpx;
			margin-top: 40rpx;
		}

		.order-header {
			@include flex-row(space-between);
			padding-top: 20rpx;

			.left,
			.right {
				@include flex-col();

				.caption {
					@include font-set(28rpx, #000, 700);
					line-height: 36rpx;
				}

				.sub-caption {
					@include box-w();
					@include flex-row(space-between);
					@include font-set(24rpx, #999);
					line-height: 34rpx;
				}
			}

			.title {
				@include flex-center;

				.left-arrow {
					@include box(80rpx, 4rpx);
					background: linear-gradient(270deg, #5a7eff 0%, rgba(196, 196, 196, 0));
					border-radius: 162px;
				}

				.info {
					@include font-set(32rpx, #5a7eff, 500);
					margin: 0 50rpx;
				}

				.right-arrow {
					@include box(80rpx, 4rpx);
					background: linear-gradient(90deg, #5a7eff 0%, rgba(196, 196, 196, 0));
					border-radius: 162px;
				}
			}
		}

		.address {
			@include flex-row();
			margin-top: 42rpx;

			.label {
				@include font-set(32rpx, #5a7eff, 700);
				line-height: 44rpx;
				margin-right: 30rpx;
			}

			@include font-set(28rpx, #000);
			line-height: 40rpx;
		}

		.empty-block {
			position: absolute;
			left: 0;
			bottom: -14rpx;
			@include box(100%, 14rpx, #fff);
		}
	}

	.info-card-1,
	.info-card-2 {
		background-color: #fff;
		padding: 0 32rpx;
		margin-top: 20rpx;

		.order-item {
			@include flex-row(space-between);
			padding: 40rpx 0;

			& ~ .order-item {
				border-top: 1px solid #eff0f3;
			}

			.left {
				@include font-set(28rpx, #000, 700);
				line-height: 40rpx;

				.cost {
					@include flex-row();

					text {
						@include font-set(24rpx, #999);
						margin-left: 10rpx;
					}

					.arrow {
						@include square(14rpx);
						border: 1px solid #999;
						border-left: 0;
						border-bottom: 0;
						transform: rotate(135deg) translateY(6rpx);
						margin-left: 16rpx;
					}
				}

				.top {
					@include flex-row();

					.question {
						@include square(26rpx);
						margin-left: 16rpx;
					}

					.price {
						@include font-set(24rpx, #999);
						margin-left: 30rpx;
					}
				}

				.bottom {
					@include font-set(24rpx, #999);
					line-height: 34rpx;
					margin-top: 10rpx;

					&.margin {
						margin-top: 20rpx;
					}
				}
			}

			.right {
				@include flex-row();
				@include font-set(28rpx, #999, 700);
				line-height: 40rpx;

				.arrow {
					@include square(14rpx);
					border: 1px solid #999;
					border-left: 0;
					border-bottom: 0;
					transform: rotate(45deg) translateY(-4rpx);
					margin-left: 6rpx;
				}
			}
		}
	}

	.info-card-2 {
		.right {
			font-weight: 400 !important;
		}
	}

	.bottom-bar {
		@include box-w(100%, #fff);
		padding: 0 32rpx 40rpx;
		@include flex-row(space-between);

		.left {
			@include flex-row();

			.icon {
				@include square(36rpx);
				margin-right: 10rpx;
			}

			@include font-set(24rpx, #999);
			line-height: 34rpx;
		}

		.right {
			@include flex-row();

			.contact {
				.phone {
					@include square(32rpx);
					margin-right: 10rpx;
				}

				@include flex-row();
				@include font-set(24rpx, #ffa05b, 500);
				line-height: 36rpx;
			}

			.btn-box {
				@include flex-row();
				margin-left: 20rpx;

				.btn {
					@include box-h(60rpx);
					@include flex-center;
					border-radius: 12rpx;
					padding: 0 20rpx;
					font-size: 24rpx;
					font-weight: 500;

					& ~ .btn {
						margin-left: 30rpx;
					}

					&.white {
						border: 1px solid #5a7eff;
						color: #5a7eff;
					}

					&.blue {
						background-color: #5a7eff;
						color: #fff;
					}
				}
			}
		}
	}

	.bottom-mat {
		@include box(100%, 20rpx, #fff);
	}

	.time-modal {
		@include box-w(608rpx, #fff);
		padding-top: 40rpx;

		.m-item {
			@include flex-row(space-between);
			padding: 0 40rpx;

			& ~ .m-item {
				margin-top: 30rpx;
			}

			.caption {
				@include font-set(28rpx, #000);
				line-height: 40rpx;
			}

			.time {
				@include font-set(24rpx, #999);
				line-height: 34rpx;
			}
		}

		.btn {
			@include box(100%, 124rpx);
			@include flex-center;
			@include font-set(32rpx, #5a7eff, 500);
			border-top: 1px solid #eff0f3;
			margin-top: 40rpx;
		}
	}
}
</style>
