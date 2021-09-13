<template>
	<view class="home">
		<view class="flex-center tabList">
			<swiper class="swiperIcon" :indicator-dots="false" :indicator-color="indicatorColor"
				:indicator-active-color="indicatorActiveColor">
				<swiper-item class="flex flex-wrap swiperItem">
					<view v-for="(item,index) in swiperIcon" :key="index" class="flex-center flex-direction iconPanel"
						@click="toHomeLevel(item.url)">
						<image mode="aspectFill" style="height: 100rpx;width: 100rpx;" :src="$util.fileUrl(item.path)"
							lazy-load></image>
						<p>{{ item.text }}</p>
					</view>
				</swiper-item>
				<!-- 				<swiper-item class="flex flex-wrap swiperItem">
					<view v-for="(item,index) in swiperIcon" :key="index" class="flex-center flex-direction iconPanel">
						<image mode="aspectFill" :src="$util.fileUrl(item.path)" lazy-load></image>
						<p>{{ item.text }}</p>
					</view>
				</swiper-item> -->
			</swiper>
		</view>
		<view class="orderTitle">
			<view class="flex title">
				<i></i>
				<p>订单管理</p>
			</view>
		</view>
		<view class="orderTab">
			<scroll-view class="content" scroll-x>
				<view class="flex">
					<view class="flex main">
						<view v-for="(item, index) in tabList" :key="index" class="flex flex-direction tab"
							@click="tabClick(index)">
							<p v-if="item.statusCount!=''" :style="{color: (item.check?'#5A7EFF':'#999999')}">
								{{ item.orderStatus }}{{item.statusCount}}
							</p>
							<p v-else :style="{color: (item.check?'#5A7EFF':'#999999')}">{{ item.orderStatus }}</p>
							<i v-if="item.check"></i>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="flex-center flex-wrap panelList">
			<view class="panel" v-for="(item,index) in orderList" :key="index" @click="lookinfo(index)">
				<view class="header">
					<view class="flex titlePanel">
						<p class="title">{{item.vehicleNumber}}</p>
						<view class="flex-center status" v-if="tabCheck==0 || tabCheck==3">
							<image mode="aspectFill" :src="$util.fileUrl('/paid_label@2x.png')"></image>
							<p>已支付</p>
						</view>
					</view>
					<p class="name">{{item.memberRealName}}</p>
					<view class="flex price">
						<p class="icon">¥</p>
						<p class="text">{{item.orderDeposit}}</p>
					</view>
				</view>
				<view class="flex-center line">
					<i></i>
				</view>
				<view class="content">
					<view class="flex titlePanel">
						<p class="name">{{item.carModel}}</p>
						<view class="flex radioCheck">
							<p>异地还车</p>
							<switch disabled="true" @change.stop="radioChange" class="switch"
								:class="(radio?'checked':'')" :checked="(radio?true:false)"></switch>
						</view>
					</view>
					<view class="flex timeText">
						<text class="cuIcon-countdown"></text>
						<p>{{item.rentBeginTime}} 至 {{item.rentEndTime}}</p>
					</view>
					<view class="flex location" v-if="radio==true">
						<i></i>
						<p class="type">取</p>
						<p class="text">{{item.pickPlace}}</p>
					</view>
					<view class="flex location" v-if="radio==true">
						<i></i>
						<p class="type">还</p>
						<p class="text">{{item.returnPlace}}</p>
					</view>
					<view class="flex location" v-if="radio==false">
						<i></i>
						<p class="type">取还</p>
						<p class="text">{{item.pickPlace}}</p>
					</view>
					<p class="dateText" v-if="tabCheck<2">{{item.countdown}}</p>
					<p class="dateText" v-if="tabCheck==2">{{item.breakRulesString}}</p>
					<view class="flex submit">
						<view class="flex phone" @click.stop="call(item.memberPhone)">
							<image mode="aspectFill" :src="$util.fileUrl('/phone@2x.png')"></image>
							<p>联系客户</p>
						</view>
						<view class="flex">
							<button :disabled="item.isCarTest==false" type="default" v-if="tabCheck==0"
								class="flex-center btn"
								@tap.stop="toHomeLevel1('/pages/home/goInspect?obj=',item)">出车检验</button>
							<button type="default" :disabled="item.isVehicleCertificates==true" v-if="tabCheck==0"
								class="flex-center btn" style="margin-left: 20rpx;"
								@tap.stop="toHomeLevel1('/pages/home/deliverCar?type=1&obj=',item)">交付车辆</button>
							<button type="default" v-if="tabCheck==1" class="flex-center btn"
								@tap.stop="toHomeLevel1('/pages/home/deliverCar?type=2&obj=',item)">交车情况</button>
							<button type="default" v-if="tabCheck==1" class="flex-center btn"
								style="margin-left: 20rpx;"
								@tap.stop="toHomeLevel1('/pages/home/inspectionCollect?obj=',item)"
								:disabled="item.isPaymentIllegalDeposit==1">检验收车</button>
							<button type="default" v-if="tabCheck==2" class="flex-center btn"
								@tap.stop="toHomeLevel1('/pages/home/inspectionCollectInfo?obj=',item)">收车详情</button>
							<button type="default" v-if="tabCheck==2" class="flex-center btn bg-btn"
								@click.stop="backMoney(item.id)">退还押金</button>
						</view>
					</view>
				</view>
			</view>
			<view class="loadmore">
				<tui-loadmore v-if="orderSize" :index="2"></tui-loadmore>
				<tui-nomore v-else text="没有更多了"></tui-nomore>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getOrderStatus,
		getOrderPageList
	} from '@/apis/rentalOrder';
	import {
		refundOfIllegalDeposit
	} from '@/apis/pay'

	export default {
		data() {
			return {
				indicatorColor: '#cccccc',
				indicatorActiveColor: '#5A7EFF',
				swiperIcon: [{
					path: '/vehicle_management@2x.png',
					text: '车辆管理',
					url: '../fleetManage/fleetManage'
				}, {
					path: '/model_set@2x.png',
					text: '车型设置',
					url: '../vehicleManage/manage'
				}, {
					path: '/delivery_point_management@2x.png',
					text: '送车点管理',
					url: '../Delivery/carPoint'
				}, {
					path: '/store_management@2x.png',
					text: '门店管理',
					url: '../Store/store'
				}, {
					path: '/collection_payment_management@2x.png',
					text: '收付款管理',
					url: '../collectPay/collectPay'
				}, {
					path: '/marketing_management@2x.png',
					text: '营销管理',
					url: '../Marketing/Marketing'
				}, {
					path: '/customer_records@2x.png',
					text: '客户记录',
					url: '../customerRecords/customerRecords'
				}, {
					path: '/risk_control_query@2x.png',
					text: '风控查询',
					url: '../risk/risk'
				}],
				tabCheck: 0,
				tabList: [],
				radio: false,
				orderSize: false,
				page: 1,
				size: 10,
				orderList: [],
				status: 1, //0=未支付,1=等待送车,2=送车中,3=租用中,4=换车中,5=待收车,100=已完成,101=已取消,6=审核中
			};
		},
		onLoad() {
			
			this.getlist()
		},
		onShow() {


			this.orderList=[]

			this.getOrderList()
			
		},
		methods: {
		//下拉刷新
			onPullDownRefresh() {
				console.log('ppp')
				this.page = 1

				this.size = 10
				this.status = 1
				this.tabCheck=0
				this.orderList = [] 
				this.getlist()

				this.getOrderList()
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);

			}, 

			async getlist() {
				console.log('pp')
				const [err, res] = await getOrderStatus()
				if (err) return
				console.log(res)
				for (let i = 0; i < res.data.length; i++) {
					res.data[i].check = false

					if (i > 1) {
						res.data[i].statusCount = ''
					} else {
						res.data[i].statusCount = "(" + res.data[i].statusCount + ")"
					}
				}
				res.data[0].check = true
				this.tabList = res.data
			},
			async getOrderList() {
				let data = {
					page: this.page,
					size: this.size,
					status: this.status
				}
				const [err, res] = await getOrderPageList(data)
				if (err) return
				console.log(res.data.list.length)
				if (res.data.list.length == 0) {

				} else {
					for (let i = 0; i < res.data.list.length; i++) {
						this.orderList.push(res.data.list[i])
						if (res.data.list[i].pickPlace == res.data.list[i].returnPlace) {
							this.radio = false
						} else {
							this.radio = true
						}
						this.$forceUpdate()
					}
				}
			},

			async backMoney(e) {
				const [err, res] = await refundOfIllegalDeposit(e)
				if (err) return
				this.$toast('退还成功')
			},

			/**
			 * 状态切换
			 */
			tabClick(index) {
				for (let i = 0; i < this.tabList.length; i++) {
					this.tabList[i].check = false;
				}
				this.tabList[index].check = true;
				this.tabCheck = index;
				this.status = this.tabList[index].id
				this.orderList = []
				this.getOrderList()
			},
			/**
			 * 开关选择
			 * @param {Object} e
			 */
			radioChange(e) {
				this.radio = e.detail.value
			},
			toHomeLevel(e, q) {
				console.log(e)
				uni.navigateTo({
					url: e,
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			toHomeLevel1(e, q) {
				console.log(JSON.stringify(q))
				console.log(e)
				let data = {
					order: q.id,
					carnum: q.vehicleNumber,
					vehicleId: q.vehicleId
				}
				console.log(data)
				uni.navigateTo({
					url: e + JSON.stringify(data),
					animationType: 'pop-in',
					animationDuration: 200
				})
			},
			lookinfo(e) {
				uni.navigateTo({
					url: './orderInfo?id=' + this.orderList[e].id + '&type=' + this.status,
					animationDuration: 200,
					animationType: 'pop-in'
				})
			},
			call(e) {
				uni.makePhoneCall({
					phoneNumber: e
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.bg {
		background-color: black !important;
	}

	.home {
		position: relative;

		/**
		 * 更改swiper提示点样式
		 */
		/deep/ .wx-swiper-dot {
			width: 8rpx;
			height: 8rpx;
		}

		/**
		 * 更改swiper提示点选中样式
		 */
		/deep/ .wx-swiper-dot-active {
			width: 22rpx;
			height: 8rpx;
			border-radius: 6rpx;
		}

		/**
		 * 更改swiper提示点位置,通过swiper-item的padding-bottom指定位置
		 */
		/deep/ .swiperIconPanel .wx-swiper-dots {
			bottom: 0;
		}

		/**
		 * 去掉开关选择器图标
		 */
		/deep/ switch::after,
		switch::before {
			content: ''
		}

		/**
		 * 开关选择器高度
		 */
		/deep/ switch .wx-switch-input,
		switch .uni-switch-input {
			height: 36rpx !important;
		}

		/**
		 * 开关选择器未选中按钮样式
		 */
		/deep/ switch .wx-switch-input::after,
		switch .uni-switch-input::after {
			left: -4rpx;
			box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, .6);
		}

		/**
		 * 开关选择器选中按钮样式
		 */
		/deep/ switch .wx-switch-input.wx-switch-input-checked::after,
		switch .uni-switch-input.uni-switch-input-checked::after {
			left: 48rpx;
			box-shadow: 0rpx 0rpx 10rpx rgba(0, 0, 0, .6);
		}

		/**
		 * 开关选择器选中颜色
		 */
		/deep/ switch[checked] .wx-switch-input {
			background-color: #5A7EFF !important;
		}

		.tabList {
			position: relative;
			width: 100%;
			margin-top: 20rpx;

			.swiperIcon {
				width: 100%;
				height: 340rpx !important;

				.swiperItem {
					padding-bottom: 50rpx;
					box-sizing: border-box;

					.iconPanel {
						width: calc(100% / 4);
						height: 50%;
						overflow: hidden;

						image {
							width: 100rpx;
							height: 100rpx;
						}

						p {
							width: 100%;
							font-size: 24rpx;
							font-weight: 400;
							text-align: center;
							color: #999999;
						}
					}
				}
			}
		}

		.orderTitle {
			position: relative;
			width: 100%;
			height: 40rpx;
			margin-top: 20rpx;

			.title {
				padding-left: 40rpx;
				padding-right: 40rpx;

				i {
					width: 8rpx;
					height: 24rpx;
					background: #5a7eff;
					border-radius: 20rpx;
				}

				p {
					font-size: 28rpx;
					font-weight: 500;
					color: #000000;
					letter-spacing: 0rpx;
					padding-left: 20rpx;
				}
			}
		}

		.orderTab {
			position: relative;
			width: 100%;
			margin-top: 40rpx;

			.content {
				position: relative;
				width: 100%;
				padding-left: 40rpx;
				padding-right: 40rpx;

				.main {
					overflow: visible;

					.tab {
						position: relative;
						padding-left: 60rpx;
						height: 58rpx;

						p {
							font-size: 28rpx;
							font-weight: 700;
							color: #5a7eff;
							letter-spacing: 0rpx;
						}

						i {
							position: absolute;
							bottom: 0rpx;
							width: 40rpx;
							height: 8rpx;
							background: #5a7eff;
							border-radius: 20rpx;
						}
					}

					.tab:first-child {
						padding-left: 0;
					}
				}
			}
		}

		.panelList {
			position: relative;
			margin-top: 40rpx;

			.panel {
				position: relative;
				width: 670rpx;
				min-height: 500rpx;
				background: #ffffff;
				border-radius: 20rpx;
				box-shadow: 0rpx 0rpx 8rpx 2rpx rgba(114, 141, 244, 0.4);
				margin-bottom: 40rpx;
				padding-bottom: 40rpx;

				.header {
					padding-top: 40rpx;
					padding-left: 40rpx;
					padding-right: 40rpx;

					.titlePanel {
						height: 44rpx;

						.title {
							font-size: 32rpx;
							font-weight: 700;
							text-align: LEFT;
							color: #000000;
							letter-spacing: 0rpx;
						}

						.status {
							margin-left: 30rpx;
							width: 80rpx;
							height: 40rpx;
							position: relative;

							image {
								width: 100%;
								height: 100%;
							}

							p {
								font-size: 16rpx;
								font-weight: 700;
								color: #ffffff;
								letter-spacing: 0rpx;
								position: absolute;
								bottom: 6rpx;
								left: 14rpx;
							}
						}
					}

					.name {
						font-size: 28rpx;
						font-weight: 400;
						color: #5a7eff;
					}

					.price {
						position: absolute;
						right: 40rpx;
						top: 60rpx;

						.icon {
							font-size: 18rpx;
							font-weight: 700;
							color: #fc3736;
							letter-spacing: 0rpx;
							margin-top: 10rpx;
						}

						.text {
							font-size: 32rpx;
							font-weight: 700;
							color: #fc3736;
							letter-spacing: 0rpx;
							margin-left: 6rpx;
						}
					}

				}

				.line {
					width: 100%;
					margin-top: 40rpx;

					i {
						width: 590rpx;
						border-bottom: 1rpx dashed #999999;
					}
				}

				.content {
					padding-top: 40rpx;
					padding-left: 40rpx;
					padding-right: 40rpx;

					.titlePanel {
						position: relative;
						justify-content: space-between;

						.name {
							font-size: 28rpx;
							font-weight: 400;
							color: #000000;
						}

						.radioCheck {

							p {
								font-size: 24rpx;
								font-weight: 500;
								color: #999999;
							}

							.switch {
								margin-left: 16rpx;
							}
						}
					}

					.timeText {
						margin-top: 40rpx;

						.cuIcon-countdown {
							font-size: 28rpx;
							padding-top: 2rpx;
						}

						p {
							margin-left: 10rpx;
							font-size: 24rpx;
							font-weight: 400;
							color: #000000;
							letter-spacing: 0rpx;
						}
					}

					.location {
						margin-top: 30rpx;
						position: relative;
						left: -22rpx;


						i {
							width: 8rpx;
							height: 24rpx;
							background: #5a7eff;
							border-radius: 20rpx;
							margin-top: 4rpx;
						}

						.type {
							margin-left: 16rpx;
							font-size: 28rpx;
							font-weight: 700;
							color: #5a7eff;
							letter-spacing: 0rpx;
						}

						.text {
							margin-left: 10rpx;
							font-size: 28rpx;
							font-weight: 700;
							color: #000000;
							letter-spacing: 0rpx;
						}
					}

					.location:last-child {
						margin-top: 20rpx;
					}

					.dateText {
						margin-top: 40rpx;
						font-size: 28rpx;
						font-weight: 400;
						color: #5a7eff;
					}

					.submit {
						margin-top: 40rpx;
						justify-content: space-between;

						.phone {

							image {
								width: 28rpx;
								height: 28rpx;
							}

							p {
								font-size: 24rpx;
								font-weight: 500;
								color: #ffa05b;
								margin-left: 10rpx;
							}
						}

						.btn {
							width: 136rpx;
							height: 60rpx;
							border: 2rpx solid #5a7eff;
							border-radius: 12rpx;
							font-size: 24rpx;
							font-weight: 500;
							color: #5a7eff;
							background: none;
						}

						.btn:last-child {
							margin-left: 30rpx;
						}

						.bg-btn {
							border: 0;
							background: #5a7eff;
							color: #FFFFFF;
						}
					}
				}
			}
		}

		.panelList:first-child {
			margin-top: 0;
		}
	}
</style>
