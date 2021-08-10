<template>
	<view class="">
		<view class="titelBlack">选择续租还车时间（续租<text style="color: #5A7EFF;">{{totalDate || 0}}</text>天<text
				style="color: #5A7EFF;">{{totalHour || 0}}</text>小时）</view>
		<view class="flexBox">
			<image class="day" :src="`${ossUrl}/common/daytime.png`" mode="aspectFill"></image>
			<view class="dayTime" @click="openProcessPopup">{{dateShow || '选择日期'}}</view>
			<image class="day" style="margin-left: 20%" :src="`${ossUrl}/common/icon-time.png`" mode="aspectFill">
			</image>
			<view class="dayTime">
				<picker mode="time" @change="timeHandler" :start="startDate" :end="endDate" class="pickerBox">
					<label class="pickerText">{{timeShow || '选择时间'}}</label>
				</picker>
			</view>
		</view>
		<view style="font-size: 24rpx;color:#FFA05B;width: 90%;margin: 20px auto;">* 驾无忧无法继续为您提供保障</view>
		<view style="height: 20rpx;width: 100%;background-color: #EFF0F3;"></view>
		<view class="flexConeten" v-for="(item, index) in priceList" :key="index">
			<view class="blackText">{{item.name}}</view>
			<view class="garyText">¥{{item.price}}</view>
		</view>
		<view class="bottomFlex">
			<view style="font-size: 28rpx;">总计</view>
			<view style="font-size: 36rpx;color: #FC3736;width: 55%;margin-left: 10rpx;"><text
					style="font-size: 16rpx;">¥</text>{{totalPrice}}</view>
			<view class="pay" @click="getCodeByWxCode">立即支付</view>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="popbox">
				<view class="flexBox">
					<view style="width:50%;text-align: left;color: #979797;" @click="closeProcessPopup">取消</view>
					<view style="width:50%;text-align: right;" @click="popupConfirm">确定</view>
				</view>
				<view style="margin: 40rpx 0rpx;">选择续租换车时间</view>
				<view class="flexBox" style="width: 100%;margin-bottom: 10rpx;">
					<view class="flexBox1">
						<view class="colorBox"></view>
						<view class="poptitle">不可续租</view>
					</view>
					<view class="flexBox1" style="justify-content: center;">
						<view class="colorBox" style="background-color: #FFA05B;"></view>
						<view class="poptitle">已租</view>
					</view>
					<view class="flexBox1" style="justify-content: flex-end;">
						<view class="colorBox" style="background-color: #07C160;"></view>
						<view class="poptitle">可续租</view>
					</view>
				</view>
				<view v-for="(item, index) in dateList" style="display: inline-block;" :key="index">
					<view
						:class="['colorDay', {'ac': acDate === index}, {'white': index%7===0 || (index+1)%7===0}, {'orange': item.planStatus===2}, {'green': item.planStatus===0}, {'gray': item.planStatus!==0&&item.planStatus!==2}]"
						@click="selDate(index)">
						<view class="date">{{item.planEndTime | dateFormat}}</view>
						<view class="price">￥{{item.money || 0}}</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		vehicleQuerySelectRentalPlanList
	} from '@/apis/vehicle'
	import {
		rentalOrderRenewCarRentalPriceGet
	} from '@/apis/rentalOrder'
	import {
		paymentPrecreate
	} from '@/apis/payment'
	import {
		getCodeByWxCode
	} from '@/apis/sso'
	import {
		durationToTime,
		throttle,
		transCommonTime
	} from '@/utils/tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				acDate: -1, // 选中的日期
				dateList: [], // 日期列表
				vehicleId: '', // 车辆id
				orderId: '', // 订单id
				dateShow: '', // 日期显示
				date: '', // 日期
				timeShow: '', // 时间显示
				time: '', // 选择的时间
				totalDate: '', // 总日期
				totalHour: '', // 总时间
				totalPrice: '', // 总费用
				lastEndTime: '', // 上一次租车结束时间
				priceList: [], // 费用列表
				reflect: {}, // 付费回调
				mode: '', // 模式
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		filters: {
			// 日期显示
			dateFormat(timeStr) {
				return timeStr.split(' ')[0].split('-')[2]
			}
		},
		watch: {
			// 监听日期
			date() {
				if (!this.timeisSell()) return
				this.rentalOrderRenewCarRentalPriceGet()
			},
			// 监听时间
			time() {
				if (!this.timeisSell()) return
				this.rentalOrderRenewCarRentalPriceGet()
			}
		},
		onLoad(e) {
			if (e && e.orderId) this.orderId = e.orderId
			if (e && e.vehicleId) this.vehicleId = e.vehicleId
			if (e && e.mode) this.mode = e.mode
			this.vehicleQuerySelectRentalPlanList()
		},
		methods: {
			// 获取车辆租赁计划列表
			async vehicleQuerySelectRentalPlanList() {
				const [err, res] = await vehicleQuerySelectRentalPlanList(this.vehicleId)
				if (err) return
				this.dateList = res.data
			},
			// 选择日期
			selDate(index) {
				this.acDate = index
			},
			// 打开流程弹窗
			openProcessPopup() {
				this.$refs.popup.open()
			},
			// 关闭流程弹窗
			closeProcessPopup() {
				this.$refs.popup.close()
			},
			// 确定日期
			popupConfirm() {
				const dataArr = this.dateFilter(this.dateList[this.acDate].planEndTime)
				this.date = `${dataArr[0]}-${dataArr[1]}-${dataArr[2]}`
				this.dateShow = `${dataArr[1]}月${dataArr[2]}日`
				this.closeProcessPopup()
			},
			// 截取日期
			dateFilter(timeStr) {
				return timeStr.split(' ')[0].split('-')
			},
			// 时间处理
			timeHandler: function(e) {
				const timeArr = e.detail.value.split(':')
				this.time = e.detail.value
				this.timeShow = `${timeArr[0]}时${timeArr[1]}分`
			},
			// 日期时间是否都选择
			timeisSell() {
				return !!(this.date && this.time)
			},
			// 获取续租总时间
			getTotalTime() {
				const targetTime = new Date(transCommonTime(`${this.date} ${this.time}:00`)).getTime()
				const currentTime = new Date(transCommonTime(this.lastEndTime)).getTime()
				const diffTime = targetTime - currentTime
				const [date, hour] = durationToTime(diffTime)
				this.totalDate = date
				this.totalHour = hour
			},
			// 获取租车费用
			async rentalOrderRenewCarRentalPriceGet() {
				const params = {
					orderId: this.orderId,
					newRentEndTime: `${this.date} ${this.time}:00`
				}
				const [err, res] = await rentalOrderRenewCarRentalPriceGet(params)
				if (err) return
				this.totalPrice = res.data.info.total
				this.priceList = res.data.info.orderPriceList
				this.reflect = res.data.reflect
				this.lastEndTime = res.data.rentEndTime
				this.getTotalTime()
			},
			// 授权
			getCodeByWxCode: throttle(async function() {
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
			// 发起支付
			async paymentPrecreate(openId) {
				const params = {
					reflect: this.reflect,
					orderId: this.orderId,
					payerUid: openId,
					payway: '3',
					subPayway: '4',
					subject: '续租',
					totalAmount: this.totalPrice
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
				this.$toast('续租成功！')
				if (this.mode === 'order') uni.$emit('orderRefresh')
				if (this.mode === 'orderDetail') uni.$emit('orderDetailRefresh')
				setTimeout(() => {
					this.$close()
				}, 500)
			},
			// 获取当前日期
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
		}
	}
</script>

<style lang="scss">
	.flexBox {
		display: flex;
		align-items: center;
		width: 90%;
		margin: auto;
	}

	.flexBox1 {
		display: flex;
		align-items: center;
		width: 33%;
	}

	.titelBlack {
		color: #000000;
		color: 32rpx;
		width: 90%;
		margin: 40rpx auto;

	}

	.day {
		width: 46rpx;
		height: 46rpx;
	}

	.blackText {
		width: 90%;
	}

	.garyText {
		width: 10%;
		color: #999999;
	}

	.flexConeten {
		display: flex;
		align-items: center;
		padding: 40rpx 0rpx;
		border-bottom: 2rpx solid #EFF0F3;
		width: 90%;
		margin: auto;
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

	.dayTime {
		width: 23%;
		text-align: center;
		color: #5A7EFF;
		border-bottom: 2rpx solid #5A7EFF;
		margin-left: 20rpx;
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

	.popbox {
		border-radius: 20rpx 20rpx 0rpx 0rpx;
		background-color: white;
		width: 90%;
		padding: 50rpx 5%;
	}

	.colorBox {
		background-color: #C4C4C4;
		height: 24rpx;
		width: 24rpx;
		border-radius: 5rpx;
	}

	.colorDay {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 80rpx;
		width: 80rpx;
		background-color: #C4C4C4;
		border-radius: 10rpx;
		text-align: center;
		line-height: 80rpx;
		margin: 20rpx 9rpx;
		box-sizing: border-box;

		.date {
			font-size: 26rpx;
			line-height: 26rpx;
		}

		.price {
			font-size: 16rpx;
			line-height: 16rpx;
			margin-top: 8rpx;
		}

		&.ac {
			border: 2px solid #5A7EFF;
		}

		&.white {
			background-color: #ffffff;
		}

		&.green {
			background-color: #07C160;
		}

		&.orange {
			background-color: #FFA05B;
		}

		&.gray {
			background-color: #C4C4C4;
		}
	}

	.poptitle {
		font-size: 24rpx;
		margin-left: 10rpx;
	}
</style>
