<template>
	<view class="">
		<view class="box">
			<view class="flexBox" style="margin-top: 30rpx;">
				<view style="width:80%">
					<view style="font-size: 36rpx;">{{info.deliveryVo.address}}</view>
					<view class="flexBox" style="margin-top: 20rpx;">
						<image style="width: 32rpx;height:34rpx;" :src="`${ossUrl}/common/icon-home-black.png`"></image>
						<view style="font-size: 28rpx;color:#000000;">门店地址：{{info.deliveryVo.address}}</view>
					</view>
				</view>
				<view style="width:20%">
					<image style="width: 44rpx;height:44rpx;" :src="`${ossUrl}/common/location-big.png`"
						@click="openMap"></image>
					<image style="width: 44rpx;height:44rpx;margin-left: 30rpx;" :src="`${ossUrl}/common/phone-big.png`"
						@click="contactStore"></image>
				</view>
			</view>
			<view class="flexBox">
				<view class="look" @click="$open('/pages/common/goInspect', {mode:'readonly', orderId, vehicleId})">
					查看车况</view>
				<view class="look" style="margin-left: 20rpx;"
					@click="$open('/pages/common/contract', {mode:'readonly', orderId, vehicleId})">查看合同
				</view>
			</view>
		</view>
		<view class="grayLine"></view>
		<view v-show="!info.isPaymentIllegalDeposit" class="box" style="margin-top: 100rpx;">
			<view class="wait">等待追风小子验车</view>
			<view class="wait">验车后将根据油量、综合车况等补缴或退还金额</view>
		</view>
		<view v-show="info.isPaymentIllegalDeposit" class="box">
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">超时费</view>
				<view class="rightBox">¥{{info.overtimeFee}}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">提前还车</view>
				<view class="rightBox">¥{{info.returnTheCarEarly}}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">违约金</view>
				<view class="rightBox">¥{{info.liquidatedDamages}}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">滞纳金</view>
				<view class="rightBox">¥{{info.penalty}}</view>
			</view>
			<view class="flexBox" style="border-bottom: 2rpx solid #EFF0F3;padding: 30rpx 0rpx;">
				<view class="leftBox">其他费用</view>
				<view class="rightBox">¥{{info.otherFee}}</view>
			</view>
		</view>
		<view v-show="info.isPaymentIllegalDeposit" class="grayLine"></view>
		<view v-show="info.isPaymentIllegalDeposit" class="flexBox" style="width: 90%;margin: auto;margin-top: 30rpx;">
			<view class="leftBox">预收冻结</view>
			<view class="leftBox" style="width: 47%;text-align: right;font-size: 36rpx;">{{info.preAcceptanceFreeze}}
			</view>
			<view class="leftBox" style="width: 3%;margin-left: 10rpx;"> ></view>
		</view>
		<view v-show="info.isPaymentIllegalDeposit" class="bottomFlex">
			<view style="width: 64%;">
				<view style="font-size: 24rpx;color:#999999;"> 逾期不支付将按 <text style="color:#FFA05B;">《逾期违章协议》</text>处理
				</view>
				<view style="font-size: 36rpx;width: 70%;">
					结算情况
					<text style="color: #FC3736;margin-left: 10rpx;">
						<text style="font-size: 16rpx;margin-left: 10rpx;">¥</text>{{info.totalAmount}}
					</text>
				</view>
			</view>
			<view class="pay" @click="getCodeByWxCode">去结算</view>
		</view>
		<view v-show="!info.isPaymentIllegalDeposit" class="bottomFlex">
			<view style="font-size: 28rpx;">总计</view>
			<view style="font-size: 36rpx;color: #FC3736;width: 55%;margin-left: 10rpx;"><text
					style="font-size: 16rpx;">¥</text>{{info.totalAmount}}</view>
			<view class="pay">待结算</view>
		</view>
	</view>
</template>

<script>
	import {
		returnVehicle,
		returnVehicleReimburse
	} from '@/apis/return'
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
				ossUrl: this.$ossUrl, // oss
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
			if (e && e.from) this.from = e.from
			if (e && e.orderStatus) this.orderStatus = Number(e.orderStatus)
			this.returnVehicle()
		},
		methods: {
			// 检验收车
			async returnVehicle() {
				const [err, res] = await returnVehicle(this.orderId)
				if (err) return
				this.info = res.data
				if (this.orderStatus !== 3) return
				setTimeout(() => {
					uni.$emit(`${this.from}Refresh`)
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
					longitude
				})
			},
			// 授权
			getCodeByWxCode: throttle(async function() {
				if (this.info.totalAmount <= 0) {
					this.returnVehicleReimburse()
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
				this.paymentPrecreate(res.data.openid)
			}),
			// 发起退款
			async returnVehicleReimburse() {
				const [err, res] = await returnVehicleReimburse(this.info.orderId)
				if (err) return
				this.$toast('结算成功！')
				uni.$emit(`${this.from}Refresh`)
				setTimeout(() => {
					this.$close()
				}, 500)
			},
			// 发起支付
			async paymentPrecreate(openId) {
				const params = {
					reflect: this.info.reflect,
					orderId: this.info.orderId,
					payerUid: openId,
					payway: '3',
					subPayway: '4',
					subject: '租车定金',
					// totalAmount: this.info.totalAmount
					totalAmount: 0.01
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
				this.$toast('结算成功！')
				uni.$emit(`${this.from}Refresh`)
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
			},
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
		border: 2rpx solid #5A7EFF;
		color: #5A7EFF;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
		font-size: 24rpx;
		margin-top: 40rpx;
	}

	.grayLine {
		height: 20rpx;
		background-color: #EFF0F3;
		width: 100%;
		margin-top: 40rpx;
	}

	.wait {
		font-size: 24rpx;
		color: #999999;
		width: 90%;
		text-align: center;
	}

	.bottomnav {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		box-shadow: 0rpx 0rpx 0rpx 0rpx #728DF4;
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
