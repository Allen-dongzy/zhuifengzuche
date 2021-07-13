<template>
	<view class="order-detail">
		<view v-show="info.orderStatus===0 || info.orderStatus===1 || info.orderStatus===2" class="top-panel-1">
			<view v-show="info.orderStatus===1 || info.orderStatus===2" class="statu-bar">
				<view class="status">{{statusShow}}</view>
				<view v-show="info.orderStatus===1" class="refresh" @click="refresh">
					<image :src="`${ossUrl}/order/refresh.png`"></image>刷新
				</view>
			</view>
			<view v-show="info.orderStatus===0 || info.orderStatus===1" class="info">{{info.countdown}}</view>
			<view class="bottom">
				<view class="btn-box">
					<view v-if="info.orderStatus===0 || info.orderStatus===1 || info.orderStatus===2" class="btn white"
						@click="rentalOrderCancelOrderByUserGet">
						取消订单</view>
					<view v-if="info.orderStatus===0" class="btn blue">立即支付</view>
					<view v-if="info.orderStatus===2" class="btn white" @click="$open('/pages/common/goInspect')">查看车况
					</view>
				</view>
				<view v-show="info.orderStatus===0 || info.orderStatus===1" class="contact" @click="contactStore">
					<image class="phone" :src="`${ossUrl}/common/phone-big.png`"></image>
					联系门店
				</view>
				<view v-show="info.orderStatus===2" class="contact" @click="contactSendCarPart">
					<image class="phone" :src="`${ossUrl}/common/phone-big.png`"></image>
					联系送车员
				</view>
			</view>
		</view>
		<view v-show="info.orderStatus===3 || info.orderStatus===4 || info.orderStatus===100 || info.orderStatus===101"
			class="top-panel-2">
			<view class="top">
				<image class="bg" :src="`${ossUrl}/order/order-bg.png`"></image>
				<view class="mask">
					<view class="caption">{{statusShow}}</view>
					<view v-show="info.orderStatus===3" class="toast">{{info.countdown}}</view>
					<view v-show="info.orderStatus===4" class="toast">请前往换车详情页面完成换车</view>
					<view v-show="info.orderStatus===100" class="toast">感谢您对追风租车的信任，期待再次光临</view>
					<view v-show="info.orderStatus===101" class="toast">您的订单已取消，感谢你使用追风租车</view>
				</view>
			</view>
			<view v-show="info.orderStatus===3" class="menu">
				<view class="menu-box">
					<view class="header">
						<image class="icon" :src="`${ossUrl}/order/exclamation.png`"></image>
						<view class="caption">{{info.breakRulesString}}</view>
					</view>
					<view class="btn-box">
						<view class="btn white" @click="contactStore">联系门店</view>
						<view class="btn white" @click="$open('/pages/order/renewal', {id: info.id})">续租用车</view>
						<view class="btn blue" @click="$open('/pages/order/returnCar', {id: info.id})">前往还车</view>
					</view>
				</view>
			</view>
		</view>
		<view class="order-card"
			:class="{'radius': info.orderStatus===4 || info.orderStatus===100 || info.orderStatus===101}">
			<view class="info">
				<image class="picture" :src="info.vehicleModelFiles" mode="aspectFill"></image>
				<view class="description">
					<view class="name">{{info.modelName}}</view>
					<view class="params">{{info.modelTypeName}}</view>
					<view class="type">{{info.model}}</view>
				</view>
			</view>
			<view class="order-caption">租期</view>
			<view class="order-header">
				<view class="left">
					<view class="caption">{{info.takeCarDateShow}}</view>
					<view class="sub-caption"><text>{{info.takeCarDayShow}}</text><text>{{info.takeCarTimeShow}}</text>
					</view>
				</view>
				<view class="title">
					<view class="left-arrow"></view>
					<view class="info">共{{totalDate || 0}}天</view>
					<view class="right-arrow"></view>
				</view>
				<view class="right">
					<view class="caption">{{info.carAlsoDateShow}}</view>
					<view class="sub-caption"><text>{{info.carAlsoDayShow}}</text><text>{{info.carAlsoTimeShow}}</text>
					</view>
				</view>
			</view>
			<view v-show="info.startDeliveryName === info.endDeliveryName" class="address">
				<view class="label">取还</view>
				{{info.startDeliveryName}}
			</view>
			<view v-show="info.startDeliveryName !== info.endDeliveryName">
				<view class="address">
					<view class="label">取</view>
					{{info.endDeliveryName}}
				</view>
				<view class="address">
					<view class="label">还</view>
					{{info.startDeliveryName}}
				</view>
			</view>
			<view class="empty-block"></view>
		</view>

		<view class="info-card-1">
			<view v-show="info.orderStatus===0" class="order-item">
				<view class="left">
					<view class="top">
						驾无忧保障<image class="question" :src="`${ossUrl}/order/question.png`"></image>
						<view class="price">￥{{info.insuranceDayPriceByDay || 0}}/天</view>
					</view>
					<view class="bottom">添加一份无忧保障，添一份安心</view>
				</view>
				<view class="right">￥{{info.insuranceDayPrice || 0}}</view>
			</view>
			<view v-show="info.orderStatus===0" class="order-item">
				<view class="left">优惠券</view>
				<view class="right">{{info.useCouponPrice ? `-￥${info.useCouponPrice.toString().slice(1)}` : '-￥0'}}
				</view>
			</view>
			<view class="order-item">
				<view class="left">
					<view class="cost"
						@click="$open('/pages/order/costDetail', {obj: JSON.stringify(info.orderPriceInfo)})">
						总计
						<text>费用明细</text>
						<view class="arrow"></view>
					</view>
				</view>
				<view class="right">￥{{info.orderDeposit || 0}}</view>
			</view>
		</view>

		<view class="info-card-2">
			<view class="order-item">
				<view class="left">订单号</view>
				<view class="right">{{info.orderSn}}</view>
			</view>
			<view v-if="info.timeList && info.timeList.length>0" class="order-item" @click="openTimePopup">
				<view class="left">{{info.timeList[0].name}}</view>
				<view class="right">{{info.timeList[0].time}}
					<view class="arrow"></view>
				</view>
			</view>
			<view class="order-item">
				<view class="left">租车押金</view>
				<view class="right">￥{{info.rentalMoney}}</view>
			</view>
			<view class="order-item">
				<view class="left">押金免押状态</view>
				<view class="right">{{info.depositType===0 ? '全部免押' : '未免押'}}</view>
			</view>
			<view class="order-item">
				<view class="left">支付方式</view>
				<view class="right">{{info.paymentType}}</view>
			</view>
			<view v-show="info.orderStatus===3" class="order-item"
				@click="$open('/pages/order/depositReceived', {payTheVoucherRentalCarDeposit: info.payTheVoucherRentalCarDeposit, paymentVoucherHandler: info.paymentVoucherHandler, paymentVoucherTransactionTime: info.paymentVoucherTransactionTime})">
				<view class="left">支付凭证</view>
				<view class="right">预收冻结￥{{info.payTheVoucherRentalCarDeposit}}
					<view class="arrow"></view>
				</view>
			</view>
			<view class="order-item">
				<view class="left">
					<view class="top">订单备注</view>
					<view class="bottom margin">{{info.remark}}</view>
				</view>
				<view class="right"></view>
			</view>
		</view>

		<view v-show="info.orderStatus===4 || info.orderStatus===100 || info.orderStatus===101" class="bottom-bar">
			<view class="left">
				<image v-show="info.orderStatus===4" class="icon" :src="`${ossUrl}/order/smile.png`"></image>
				<image v-show="info.orderStatus!==4" class="icon" :src="`${ossUrl}/order/price.png`"></image>
				<text v-show="info.orderStatus===4">追风租车祝您生活愉快</text>
				<text v-show="info.orderStatus===100">违押金未退还</text>
				<text v-show="info.orderStatus===101">半小时内免费取消，金额已原路退回</text>
			</view>
			<view class="right">
				<view v-show="info.orderStatus===100 || info.orderStatus===101" class="contact" @click="contactStore">
					<image class="phone" :src="`${ossUrl}/common/phone-big.png`"></image>
					联系门店
				</view>
				<view v-show="info.orderStatus===4 || info.orderStatus===100" class="btn-box">
					<view v-show="info.orderStatus===4" class="btn white" @click="contactSendCarPart">联系送车员</view>
					<view v-show="info.orderStatus===4" class="btn blue"
						@click="$open('/pages/order/changeCarDetail', {id: info.id})">
						换车详情
					</view>
					<view v-show="info.orderStatus===100" class="btn blue"
						@click="$open('/pages/order/evaluate', {id: info.id})">评价订单
					</view>
				</view>
			</view>
		</view>

		<view class="bottom-mat"></view>

		<!-- 弹窗-时间 -->
		<uni-popup ref="timePopup" type="center">
			<view class="time-modal">
				<view class="m-item" v-for="(item, index) in info.timeList" :key="index">
					<view class="caption">{{item.name}}</view>
					<view class="time">{{item.time}}</view>
				</view>
				<view class="btn" @click="closeTimePopup">关闭</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		rentalOrderOrderInfo,
		rentalOrderCancelOrderByUser,
		rentalOrderCancelOrderByUserGet
	} from '@/apis/rentalOrder'
	import {
		throttle
	} from '@/utils/tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				info: {}, // 订单信息
				week: ['', '周一', '周二', '周三', '周四', '周五', '周六', '周日']
			}
		},
		computed: {
			// 总天数
			totalDate() {
				const startTime = new Date(this.info.rentBeginTime).getTime()
				const endTime = new Date(this.info.rentEndTime).getTime()
				const diff = endTime - startTime
				return parseInt(diff / 1000 / 60 / 60 / 24)
			},
			// 状态显示
			statusShow() {
				let info = ''
				switch (this.info.orderStatus) {
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
					case 100:
						info = '订单已完成'
						break
					case 101:
						info = '订单已取消'
						break
				}
				return info
			}
		},
		onLoad(e) {
			if (e && e.id) this.rentalOrderOrderInfo(e.id)
		},
		methods: {
			// 请求订单详情
			async rentalOrderOrderInfo(orderId) {
				const params = {
					orderId
				}
				const [err, res] = await rentalOrderOrderInfo(params)
				if (err) return
				this.info = res.data
				this.info.orderStatus = 101
				const rentBeginTime = this.timeFormat(this.info.rentBeginTime)
				this.info.takeCarDateShow = rentBeginTime[0]
				this.info.takeCarDayShow = rentBeginTime[1]
				this.info.takeCarTimeShow = rentBeginTime[2]
				const rentEndTime = this.timeFormat(this.info.rentEndTime)
				this.info.carAlsoDateShow = rentEndTime[0]
				this.info.carAlsoDayShow = rentEndTime[1]
				this.info.carAlsoTimeShow = rentEndTime[2]
			},
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
					content: res.data
				})
				if (btnRes !== 0) return
				this.rentalOrderCancelOrderByUser()
			}),
			// 时间转日期时间周几
			timeFormat(timeStr) {
				const timeObj = new Date(timeStr)
				const returnArr = []
				returnArr.push(`${timeObj.getMonth() + 1}月${timeObj.getDate()}日`)
				returnArr.push(this.week[timeObj.getDay()])
				returnArr.push(`${timeObj.getHours()}:${timeObj.getMinutes()}`)
				return returnArr
			},
			// 刷新
			refresh() {
				this.rentalOrderOrderInfo(this.info.id)
			},
			// 联系门店
			contactStore() {
				this.phoneCall(this.info.memberPhone)
			},
			// 联系送车员
			contactSendCarPart() {
				this.phoneCall(this.info.songcheyuan)
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
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.order-detail {
		.top-panel-1 {
			@include box-w(100%, #fff);
			padding: 40rpx;

			.statu-bar {
				@include flex-row(space-between);

				.status {
					@include font-set(28rpx, #5A7EFF, 700);
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

						&~.btn {
							margin-left: 30rpx;
						}

						&.white {
							background-color: #fff;
							border: 1px solid #5A7EFF;
							color: #5A7EFF;
						}

						&.blue {
							background-color: #5A7EFF;
							color: #fff;
						}
					}
				}

				.contact {
					@include flex-row();

					@include font-set(24rpx, #FFA05B, 500);
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

							&~.btn {
								margin-left: 30rpx;
							}

							&.white {
								border: 1px solid #5A7EFF;
								color: #5A7EFF;
							}

							&.blue {
								background-color: #5A7EFF;
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
						background: linear-gradient(270deg, #5a7eff 0%, rgba(196, 196, 196, 0.00));
						border-radius: 162px;
					}

					.info {
						@include font-set(32rpx, #5A7EFF, 500);
						margin: 0 50rpx;
					}

					.right-arrow {
						@include box(80rpx, 4rpx);
						background: linear-gradient(90deg, #5a7eff 0%, rgba(196, 196, 196, 0.00));
						border-radius: 162px;
					}
				}
			}

			.address {
				@include flex-row();
				margin-top: 42rpx;

				.label {
					@include font-set(32rpx, #5A7EFF, 700);
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

				&~.order-item {
					border-top: 1px solid #EFF0F3;
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
					@include font-set(24rpx, #FFA05B, 500);
					line-height: 36rpx;
				}

				.btn-box {
					@include flex-row();

					.btn {
						@include box-h(60rpx);
						@include flex-center;
						border-radius: 12rpx;
						padding: 0 20rpx;
						font-size: 24rpx;
						font-weight: 500;

						&~.btn {
							margin-left: 30rpx;
						}

						&.white {
							border: 1px solid #5A7EFF;
							color: #5A7EFF;
						}

						&.blue {
							background-color: #5A7EFF;
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

				&~.m-item {
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
				@include font-set(32rpx, #5A7EFF, 500);
				border-top: 1px solid #EFF0F3;
				margin-top: 40rpx;
			}
		}
	}
</style>
