<template>
	<view class="order">
		<view class="header">
			<view :class="['item', {ac: acTab===0}]" @click="taptab(0)">全部订单<view
					:class="['underline', {ac: acTab===0}]"></view>
			</view>
			<view :class="['item', {ac: acTab===1}]" @click="taptab(1)">进行中<view
					:class="['underline', {ac: acTab===1}]"></view>
			</view>
			<view :class="['item', {ac: acTab===2}]" @click="taptab(2)">已完成<view
					:class="['underline', {ac: acTab===2}]"></view>
			</view>
			<view :class="['item', {ac: acTab===3}]" @click="taptab(3)">已取消<view
					:class="['underline', {ac: acTab===3}]"></view>
			</view>
		</view>
		<view class="header-mat"></view>
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index"
				@click="$open('/pages/order/orderDetail', {id: item.id})">
				<view class="item-header">
					<view class="name-box">
						<view class="name">
							{{item.orderStatus === 1 || item.orderStatus === 2 ? item.carModelName.split('|')[0] : item.carModelName}}
						</view>
						<view v-if="item.orderStatus === 0"
							:class="['label-card', {'orange': item.orderStatus === 0}]">
							<view class="top"></view>
							<view class="line"></view>
							<view class="box">未支付</view>
						</view>
					</view>
					<view class="price">￥<text>{{item.orderDeposit}}</text></view>
				</view>
				<view class="content">
					<view class="status-box">
						<view class="time">
							{{item.rentBeginTime.slice(0, 16)}}&nbsp;至&nbsp;{{item.rentEndTime.slice(0, 16)}}
						</view>
						<view
							v-if="item.orderStatus === 1 || item.orderStatus === 2 || item.orderStatus === 3 || item.orderStatus === 4 || item.orderStatus === 5 || item.orderStatus === 100 || item.orderStatus === 101"
							:class="['status', {'blue': item.orderStatus!==7}, {'red':item.orderStatus===101}] ">
							{{item.orderStatus | orderStatusShow}}
						</view>
					</view>
					<view class="address">
						<text v-if="item.pickPlace !== item.returnPlace">取车点</text>
						<text v-if="item.pickPlace === item.returnPlace">取/还车点</text>
						{{item.pickPlace}}
					</view>
					<view v-if="item.pickPlace !== item.returnPlace" class="address">
						<text>还车点</text>{{item.returnPlace}}
					</view>
					<view v-if="item.orderStatus === 100" class="info">违章押金未退还</view>
				</view>
				<view class="bottom">
					<view
						v-if="item.orderStatus === 0 || item.orderStatus === 1 || item.orderStatus === 3 || item.orderStatus === 4 || item.orderStatus === 5"
						class="contact" @click.stop="contactStore(index)">
						<image class="phone" :src="`${ossUrl}/common/phone-big.png`" mode="aspectFill"></image>
						<view class="info">联系门店</view>
					</view>
					<view v-if="item.orderStatus === 2" class="contact" @click.stop="contactSendCarPart(index)">
						<image class="phone" :src="`${ossUrl}/common/phone-big.png`" mode="aspectFill"></image>
						<view class="info">联系送车员</view>
					</view>
					<view v-if="item.orderStatus >= 100" class="contact"></view>
					<view class="btn-box">
						<view v-if="item.orderStatus === 0" class="btn blue" @click.stop="getCodeByWxCode(index)">立即支付
						</view>
						<view v-if="item.orderStatus === 2" class="btn blue"
							@click.stop="$open('/pages/order/goInspect', {mode:'edit', from: 'order', orderId: item.id, vehicleId: item.vehicleId})">
							查看车况
						</view>
						<view v-if="item.orderStatus === 3  && !item.isLeaseRenewal" class="btn white"
							@click.stop="rentalOrderRenewCarRentalPriceCheck(index)">
							续租用车
						</view>
						<view v-if="item.orderStatus === 3 || item.orderStatus === 5" class="btn blue"
							@click.stop="returnCar(index)">
							前往还车
						</view>
						<view v-if="item.orderStatus === 4" class="btn blue"
							@click.stop="$open('/pages/order/changeCarDetail')">换车详情</view>
						<view v-if="item.orderStatus === 100 && item.evaluateCount===0" class="btn blue"
							@click.stop="$open('/pages/order/evaluate', {from:'order', orderId: item.id, memberShopId: item.memberShopId})">
							评价
						</view>
						<view v-if="item.orderStatus === 100 && item.evaluateCount>0" class="btn blue"
							@click.stop="$open('/pages/common/storeComment', {orderId: item.id, id: item.memberShopId})">
							查看评价</view>
						<view v-if="item.orderStatus === 101" class="btn blue"
							@click.stop="$open('/pages/home/home', 3)">再次预订</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="dataStatus !== 'noData'">
			<uni-load-more :status="dataStatus" />
		</view>
		<view v-if="dataStatus === 'noData'" class="empty">
			<image class="bg" :src="`${ossUrl}/common/res-empty.png`" mode="aspectFill"></image>
			<view class="text">暂无订单</view>
		</view>
	</view>
</template>

<script>
	import {
		rentalOrderPageQuery,
		rentalOrderRenewCarRentalPriceCheck
	} from '@/apis/rentalOrder'
	import {
		listManager,
		showModal
	} from '@/utils/uni-tools'
	import {
		throttle
	} from '@/utils/tools'
	import {
		getCodeByWxCode
	} from '@/apis/sso'
	import {
		paymentPrecreate
	} from '@/apis/payment'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				acTab: 0, // 活跃的tab
				page: 1,
				size: 10,
				dataStatus: '', // more laoding noMore noData
				reqeuestKey: true,
				list: []
			}
		},
		filters: {
			// 车状态显示
			orderStatusShow(status) {
				let info = ''
				switch (status) {
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
						info = '已完成'
						break
					case 101:
						info = '已取消'
						break
				}
				return info
			}
		},
		onLoad() {
			this.getorderList()
			this.eventListener()
		},
		onPullDownRefresh() {
			this.init()
			this.getorderList('refresh')
		},
		onReachBottom() {
			if (!this.reqeuestKey) return
			this.page++
			this.getorderList()
		},
		methods: {
			// 初始化
			init() {
				this.reqeuestKey = true
				this.page = 1
				this.list = []
			},
			// 获取订单列表
			async getorderList(refresh) {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					status: this.acTab
				}
				const [err, res] = await rentalOrderPageQuery(params)
				if (refresh === 'refresh') uni.stopPullDownRefresh()
				if (err) {
					if (this.page > 1) this.dataStatus = 'noMore'
					else this.dataStatus = 'noData'
					this.reqeuestKey = false
					return
				}
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.reqeuestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.list = [...this.list, ...res.data.list]
			},
			// 切换tab
			taptab(index) {
				if (this.acTab === index) return
				this.acTab = index
				this.init()
				this.getorderList()
			},
			// 续租用车
			rentalOrderRenewCarRentalPriceCheck: throttle(async function(index) {
				const params = {
					orderId: this.list[index].id
				}
				const [err, res] = await rentalOrderRenewCarRentalPriceCheck(params)
				if (err) return
				this.$open('/pages/order/renewal', {
					orderId: this.list[index].id,
					vehicleId: this.list[index].vehicleId,
					mode: 'order'
				})
			}),
			// 授权
			getCodeByWxCode: throttle(async function(index) {
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
					reflect: this.list[index].reflect,
					orderId: this.list[index].id,
					payerUid: openId,
					payway: '3',
					subPayway: '4',
					subject: '租车定金',
					totalAmount: this.list[index].orderDeposit
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
				this.init()
				this.getorderList()
			},
			// 联系门店
			contactStore(index) {
				this.phoneCall(this.list[index].memberPhone)
			},
			// 联系送车员
			contactSendCarPart(index) {
				this.phoneCall(this.list[index].startUserPhone)
			},
			// 打电话
			phoneCall(phoneNumber) {
				uni.makePhoneCall({
					phoneNumber
				})
			},
			// 还车
			async returnCar(index) {
				if (this.list[index].orderStatus === 3) {
					const [err, res] = await showModal({
						content: '是否确定还车？'
					})
					if (res !== 'confirm') return
				}
				this.$open('/pages/order/returnCar', {
					from: "order",
					orderStatus: this.list[index].orderStatus,
					orderId: this.list[index].id,
					vehicleId: this.list[index].vehicleId
				})
			},
			// 监听事件
			eventListener() {
				uni.$on('orderRefresh', () => {
					this.init()
					this.getorderList()
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.order {
		.header {
			position: fixed;
			@include box(100%, 118rpx, #fff);
			@include flex-row();

			.item {
				@include box(25%, 100%);
				@include flex-col();
				@include font-set(28rpx, #999);
				line-height: 40rpx;

				.underline {
					@include box(40rpx, 8rpx, #5A7EFF);
					border-radius: 20rpx;
					margin-top: 10rpx;
					opacity: 0;

					&.ac {
						opacity: 1;
					}
				}

				&.ac {
					color: #5A7EFF;
				}
			}
		}

		.header-mat {
			height: 118rpx;
		}

		.list {
			padding: 0 40rpx 40rpx;
			margin-top: 10rpx;

			.item {
				@include box-w(670rpx);
				padding: 40rpx 40rpx 0;
				border-radius: 20rpx;
				box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);

				&~.item {
					margin-top: 40rpx;
				}

				.item-header {
					@include box(100%, 48rpx);
					@include flex-row(space-between);

					.name-box {
						@include flex-row();

						.name {
							max-width: 330rpx;
							@include font-set(32rpx, #000, 700);
							@include text-one;
							line-height: 44rpx;
						}

						.label-card {
							@include box(80rpx, 40rpx);
							margin-left: 20rpx;

							&.orange {

								.top,
								.box {
									background-color: #FFA05B;
								}
							}

							.top {
								@include box(100%, 5rpx);
								border-top-left-radius: 6rpx;
								border-top-right-radius: 6rpx;
							}

							.line {
								@include box(100%, 3rpx);
							}

							.box {
								@include box(100%, 31rpx);
								@include flex-center;
								@include font-set(16rpx, #fff, 700);
								border-radius: 4rpx;
							}
						}
					}

					.price {
						@include font-set(16rpx, #FC3736, 700);

						text {
							@include font-set(36rpx, #FC3736, 700) line-height: 48rpx;
						}
					}
				}

				.content {
					padding-bottom: 40rpx;
					border-bottom: 1px dashed #999;

					.status-box {
						@include flex-row(space-between);
						margin-top: 26rpx;

						.time {
							@include font-set(24rpx, #000);
							line-height: 34rpx;
						}

						.status {
							@include font-set(28rpx);
							line-height: 40rpx;

							&.blue {
								color: #5A7EFF;
							}

							&.red {
								color: #FC3736;
							}
						}
					}

					.address {
						@include font-set(28rpx, #000);
						line-height: 28rpx;
						margin-top: 6rpx;

						&~.address {
							margin-top: 10rpx;
						}

						text {
							color: #5A7EFF;
							margin-right: 10rpx;
						}
					}

					.info {
						@include font-set(28rpx, #000);
						line-height: 40rpx;
						margin-top: 12rpx;
					}
				}

				.bottom {
					@include box-h(138rpx);
					@include flex-row(space-between);

					.contact {
						@include box-h(90rpx);
						@include flex-row();
						@include font-set(24rpx, #FFA05B, 500);
						line-height: 90rpx;

						.phone {
							@include square(32rpx);
							margin-right: 10rpx;
						}
					}

					.btn-box {
						@include flex-row();

						.btn {
							@include box(136rpx, 60rpx);
							@include flex-center;
							font-size: 24rpx;
							border-radius: 12rpx;

							&~.btn {
								margin-left: 30rpx;
							}

							&.white {
								border: 1px solid #5A7EFF;
								background-color: #fff;
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

		.empty {
			@include flex-col();
			margin-top: 200rpx;

			.bg {
				@include box(400rpx, 252rpx);
			}

			.text {
				@include font-set(28rpx, #999);
				line-height: 40rpx;
				margin-top: 20rpx;
			}
		}
	}
</style>
