<template>
	<view class="">
		<view class="box">
			<view class="flexBox" style="margin-top: 30rpx;">
				<view style="width:80%">
					<view style="font-size: 36rpx;">{{ info.deliveryVo.memberShopName }}</view>
					<view class="flexBox" style="margin-top: 20rpx;">
						<image style="width: 32rpx;height:34rpx;" :src="`${ossUrl}/common/icon-home-black.png`" mode="aspectFill"></image>
						<view style="width: 480rpx;font-size: 28rpx;color:#000000;margin-left: 20rpx;">门店地址：{{ info.deliveryVo.address }}</view>
					</view>
				</view>
				<view style="width:20%; align-self: flex-start; margin-top: -5rpx;">
					<image style="width: 44rpx;height:44rpx" :src="`${ossUrl}/common/location-big.png`" mode="aspectFill" @click="openMap"></image>
					<image style="width: 44rpx;height:44rpx;margin-left: 30rpx;" :src="`${ossUrl}/common/phone-big.png`" mode="aspectFill" @click="contactStore"></image>
				</view>
			</view>
			<view class="flexBox">
				<view class="look" @click="$open('/pages/order/goInspect', { mode: 'readonly', orderId, vehicleId })">查看车况</view>
				<view class="look" style="margin-left: 20rpx;" @click="$open('/pages/common/contract', { mode: 'readonly', orderId, vehicleId })">查看合同</view>
			</view>
		</view>
		<view class="grayLine"></view>
		<view v-if="!info.isPaymentIllegalDeposit" class="box" style="margin-top: 100rpx;">
			<view class="wait">等待追风小子验车</view>
			<view class="wait">验车后将根据油量、综合车况等补缴或退还金额</view>
		</view>
		<view v-if="info.isPaymentIllegalDeposit" class="box">
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">超时费</view>
				<view class="rightBox">¥{{ info.overtimeFee }}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">提前还车</view>
				<view class="rightBox">¥{{ info.returnTheCarEarly }}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">违约金</view>
				<view class="rightBox">¥{{ info.liquidatedDamages }}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">滞纳金</view>
				<view class="rightBox">¥{{ info.penalty }}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">其他费用</view>
				<view class="rightBox">¥{{ info.otherFee }}</view>
			</view>
		</view>
		<view v-if="info.isPaymentIllegalDeposit && info.preAcceptanceFreeze > 0" class="grayLine"></view>
		<view v-if="info.isPaymentIllegalDeposit && info.preAcceptanceFreeze > 0" class="flexBox" style="width: 90%;margin: auto;margin-top: 30rpx;">
			<view class="leftBox">预收冻结</view>
			<view class="leftBox" style="width: 47%;text-align: right;font-size: 36rpx;">{{ info.preAcceptanceFreeze }}</view>
			<view class="leftBox" style="width: 3%;margin-left: 10rpx;">></view>
		</view>
		<view v-if="info.isPaymentIllegalDeposit" class="bottomFlex">
			<view style="width: 64%;">
				<view style="font-size: 24rpx;color:#999999;">
					逾期不支付将按
					<text style="color:#FFA05B;" @click="$open('/pages/common/violation')">《逾期违章协议》</text>
					处理
				</view>
				<view style="font-size: 36rpx;width: 70%;">
					结算情况
					<text style="color: #FC3736;margin-left: 10rpx;">
						<text style="font-size: 16rpx;margin-left: 10rpx;">¥</text>
						{{ info.totalAmount }}
					</text>
				</view>
			</view>
			<view class="pay" @click="getCodeByWxCode">去结算</view>
		</view>
		<view v-if="!info.isPaymentIllegalDeposit" class="bottomFlex">
			<view style="font-size: 28rpx;">总计</view>
			<view style="font-size: 36rpx;color: #FC3736;width: 55%;margin-left: 10rpx;">
				<text style="font-size: 16rpx;">¥</text>
				{{ info.totalAmount }}
			</view>
			<view class="pay">待结算</view>
		</view>
	</view>
</template>

<script>
import { returnVehicle, returnVehicleReimburse } from '@/apis/return'
import { getCodeByWxCode } from '@/apis/sso'
import { paymentPrecreate } from '@/apis/payment'
import { throttle } from '@/utils/tools'

export default {
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			orderSn: '', // 订单编号
			orderId: '', // 订单id
			vehicleId: '', // 车辆id
			from: '', // 从哪里来 order orderDetail
			orderStatus: '', // 订单状态
			info: {}
		}
	},
	onLoad(e) {
		if (e && e.orderId) this.orderId = Number(e.orderId)
		if (e && e.vehicleId) this.vehicleId = Number(e.vehicleId)
		if (e && e.orderStatus) this.orderStatus = Number(e.orderStatus)
		if (e && e.orderSn) this.orderSn = e.orderSn
		if (e && e.from) this.from = e.from
		this.returnVehicle()
	},
	methods: {
		go() {
			uni.$emit('orderRefresh')
			uni.$emit('orderDetailRefresh')
			setTimeout(() => {
				this.$close()
			}, 500)
		},
		// 检验收车
		async returnVehicle() {
			const [err, res] = await returnVehicle(this.orderId)
			if (err) return
			this.info = res.data
			if (this.orderStatus !== 3) return
			setTimeout(() => {
				uni.$emit('orderRefresh')
				uni.$emit('orderDetailRefresh')
			}, 500)
		},
		// 打开地图
		async openMap() {
			if (Object.keys(this.info).length === 0 || Object.keys(this.info.deliveryVo).length === 0) return
			const latitude = Number(this.info.deliveryVo.lat)
			const longitude = Number(this.info.deliveryVo.lon)
			// 打开位置
			uni.openLocation({
				latitude,
				longitude,
				name: this.info.deliveryVo.name,
				address: this.info.deliveryVo.address
			})
		},
		// 授权
		getCodeByWxCode: throttle(async function() {
			if (this.info.totalAmount <= 0) {
				this.returnVehicleReimburse()
				return
			}
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
			this.paymentPrecreate(res.data.openid)
			// #endif
			// #ifdef MP-ALIPAY
			this.paymentPrecreate(res.data.user_id)
			// #endif
		}),
		// 发起退款
		async returnVehicleReimburse() {
			const [err, res] = await returnVehicleReimburse(this.info.orderId)
			if (err) return
			this.$toast('结算成功！')
			uni.$emit('orderRefresh')
			uni.$emit('orderDetailRefresh')
			setTimeout(() => {
				this.$close()
			}, 500)
		},
		// 发起支付
		async paymentPrecreate(payerUid) {
			const params = {
				reflect: this.info.reflect,
				orderId: this.info.orderId,
				payerUid,
				// #ifdef MP-WEIXIN
				payway: '3',
				// #endif
				// #ifdef MP-ALIPAY
				payway: '2',
				// #endif
				subPayway: '4',
				subject: '租车结算',
				totalAmount: this.info.totalAmount
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
			this.$toast('结算成功！')
			uni.$emit('orderRefresh')
			uni.$emit('orderDetailRefresh')
			setTimeout(() => {
				this.$close()
			}, 500)
		},
		// 联系门店
		contactStore() {
			if (Object.keys(this.info).length === 0 || Object.keys(this.info.deliveryVo).length === 0) return
			this.phoneCall(this.info.deliveryVo.memberPhone)
		},
		// 打电话
		phoneCall(phoneNumber) {
			uni.makePhoneCall({
				phoneNumber
			})
		}
	}
}
</script>

<style>
.box {
	width: 90%;
	margin: auto;
}

.flexBox {
	display: flex;
	align-items: center;
}

.look {
	border: 2rpx solid #5a7eff;
	color: #5a7eff;
	padding: 10rpx 20rpx;
	border-radius: 10rpx;
	font-size: 24rpx;
	margin-top: 40rpx;
}

.grayLine {
	height: 20rpx;
	background-color: #eff0f3;
	width: 100%;
	margin-top: 40rpx;
}

.wait {
	font-size: 24rpx;
	color: #999999;
	text-align: center;
}

.bottomnav {
	border-radius: 20rpx 20rpx 0rpx 0rpx;
	box-shadow: 0rpx 0rpx 0rpx 0rpx #728df4;
	height: 180rpx;
	width: 100%;
	position: fixed;
}

.bottomFlex {
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	bottom: 0rpx;
	left: 0rpx;
	width: 100%;
	height: 180rpx;
	border-radius: 40rpx 40rpx 0rpx 0rpx;
	box-shadow: 0rpx 0rpx 0rpx 5rpx rgba(114, 141, 244, 0.25);
}

.pay {
	width: 200rpx;
	height: 96rpx;
	opacity: 1;
	background: #5a7eff;
	border-radius: 26px;
	color: white;
	line-height: 96rpx;
	text-align: center;
}

.leftBox {
	font-size: 28rpx;
	color: #000000;
	width: 50%;
	text-align: left;
}

.rightBox {
	font-size: 28rpx;
	color: #999999;
	width: 50%;
	text-align: right;
}
</style>
