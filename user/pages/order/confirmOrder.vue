<template>
	<view class="confirm-order">
		<uni-swiper-dot :info="info.clientVehicleVo.vehicleModelFiles" :current="current" field="content" mode="round"
			:dotsStyles="dotsStyles">
			<swiper class="swiper" :autoplay="true" :interval="3000" :circular="true" @change="swiperChange">
				<swiper-item v-for="(item ,index) in info.clientVehicleVo.vehicleModelFiles" :key="index">
					<image class="banner" :src="item" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="info-card">
			<view class="name-box">
				<view class="name">{{info.clientVehicleVo.brandName}}</view>
				<view class="label-box">
					<view v-for="(item,index) in info.clientVehicleVo.labels" :key="index" class="label">{{item}}</view>
				</view>
			</view>
			<view v-if="info.clientVehicleVo" class="params">
				{{info.clientVehicleVo.gears}} / {{info.clientVehicleVo.capacity}}座 /
				{{info.clientVehicleVo.outputVolumeName}} / {{info.clientVehicleVo.model}}
			</view>
		</view>
		<view class="lease">
			<view class="caption">租期</view>
			<view class="time">
				<view class="left">
					<view class="caption">{{takeday}}</view>
					<view class="sub-caption">{{takeweek}} {{taketime}}</view>
				</view>
				<view class="title">
					<view class="left-arrow"></view>
					<view class="info">共{{totalDate}}天</view>
					<view class="right-arrow"></view>
				</view>
				<view class="right">
					<view class="caption">{{backday}}</view>
					<view class="sub-caption">{{backweek}} {{backtime}}</view>
				</view>
			</view>
			<view v-if="!yidiType">
				<view class="caption top">取还</view>
				<view class="take-also">
					<view class="address-box">
						<image class="home" :src="`${ossUrl}/common/icon-home-black.png`" mode="aspectFill"></image>
						<view class="address">门店地址：{{info.pickPlace.address}}</view>
					</view>
					<view class="btn-box">
						<image class="btn" :src="`${ossUrl}/common/location-big.png`" mode="aspectFill"
							@click="openMap(info.pickPlace.lat, info.pickPlace.lon)"></image>
					</view>
				</view>
			</view>
			<view v-if="yidiType">
				<view class="caption top">取车</view>
				<view class="take-also">
					<view class="address-box">
						<image class="home" :src="`${ossUrl}/common/icon-home-black.png`" mode="aspectFill"></image>
						<view class="address">门店地址：{{info.pickPlace.address}}</view>
					</view>
					<view class="btn-box">
						<image class="btn" :src="`${ossUrl}/common/location-big.png`" mode="aspectFill"
							@click="openMap(info.pickPlace.lat, info.pickPlace.lon)"></image>
					</view>
				</view>
				<view class="caption top">还车</view>
				<view class="take-also">
					<view class="address-box">
						<image class="home" :src="`${ossUrl}/common/icon-home-black.png`" mode="aspectFill"></image>
						<view class="address">门店地址：{{info.returnPlace.address}}</view>
					</view>
					<view class="btn-box">
						<image class="btn" :src="`${ossUrl}/common/location-big.png`" mode="aspectFill"
							@click="openMap(info.returnPlace.lat, info.returnPlace.lon)"></image>
					</view>
				</view>
			</view>
			<view class="address-info">* 下单半小时内可免费取消</view>
		</view>
		<view class="sesame-box">
			<view class="toast">
				<image class="sesame" :src="`${ossUrl}/home/sesame.png`" mode="aspectFill"></image>
				芝麻分达<text>550</text>即可享受押金双免租车
			</view>
			<evan-switch v-if="freeAndState" v-model="rentFreeSwitch" active-color="#5A7EFF"></evan-switch>
			<view v-if="!freeAndState" class="deposit-free" @click="openProcessPopup">
				申请免押<view class="arrow"></view>
			</view>
		</view>
		<view class="function-box">
			<view class="item">
				<view class="left" @click="$open('/pages/common/security')">
					<view class="top">驾无忧保障<image class="question" :src="`${ossUrl}/order/question.png`"
							mode="aspectFill"></image>
						<view class="price">￥{{info.clientVehicleVo.insurancePrice || 0}}/天</view>
					</view>
					<view class="bottom-text">添加一份无忧保障，添一份安心</view>
				</view>
				<view class="right" @click="selInsurance">
					<view class="text">￥<text>{{info.orderPriceInfo.insuranceMoney }}</text></view>
					<view :class="['circle', {'ac':isInsurance}]"></view>
				</view>
			</view>
			<view class="item" @click="$open('/pages/mine/coupon', {selectType: 'goods'})">
				<view class="caption">
					优惠券
					<view v-if="couponPrice>0" class="label">已选推荐优惠</view>
				</view>
				<view class="right">
					<view class="text">￥<text>{{couponPrice || 0}}</text></view>
					<view class="arrow"></view>
				</view>
			</view>
			<view class="item vertical">
				<view class="top">备注</view>
				<input type="text" v-model="remark" maxlength="100" placeholder="填写备注信息..." placeholder-class="input">
			</view>
		</view>
		<view class="tab-box">
			<scroll-view class="header" scroll-x="true">
				<view :class="['item', {'ac': acIndex===0}]" @click="tapTab(0)">
					<text>取车凭证</text>
					<view class="line"></view>
				</view>
				<view :class="['item', {'ac': acIndex===1}]" @click="tapTab(1)">
					<text>取消规则</text>
					<view class="line"></view>
				</view>
				<view :class="['item', {'ac': acIndex===2}]" @click="tapTab(2)">
					<text>押金金额</text>
					<view class="line"></view>
				</view>
				<view :class="['item', {'ac': acIndex===3}]" @click="tapTab(3)">
					<text>燃油说明</text>
					<view class="line"></view>
				</view>
				<view :class="['item', {'ac': acIndex===4}]" @click="tapTab(4)">
					<text>限行区域</text>
					<view class="line"></view>
				</view>
				<view :class="['item', {'ac': acIndex===5}]" @click="tapTab(5)">
					<text>发票</text>
					<view class="line"></view>
				</view>
			</scroll-view>
			<view v-if="acIndex < 5" class="box box-voucher">
				<view class="info">{{ bottomInfo }}</view>
				<view class="bottom-info-mat"></view>
				<view class="bottom-info">
					<image class="icon" :src="selStatus ? `${ossUrl}/order/sel-ac.png` : `${ossUrl}/order/sel.png`"
						mode="aspectFill" @click="tapIcon">
					</image>
					已阅读并同意<text @click="$open('/pages/common/carRentalAgreement')">《用户租车协议》</text>
				</view>
			</view>
			<view v-if="acIndex === 5" class="box box-invoice">
				<view class="top">
					<view class="info">还车时取票，不包含押金金额</view>
					<evan-switch v-model="invoiceSwitch" active-color="#5A7EFF"></evan-switch>
				</view>
				<view class="list">
					<view class="item" v-for="(item, index) in invoiceList" :key="index" @click="selectInvoice(index)">
						<view class="name">
							<view class="title">
								{{item.title}}
								<view class="label">普票</view>
							</view>
							<view class="label" v-if="index==invoiceIndex" style="background-color: #FFA05B;">已选择
							</view>
						</view>
						<view class="number">
							{{item.taxNum}}
							<view class="arrow"></view>
							<view class="click-block" @click.stop="goInvoiceInfo(item)">
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-info">
					<image class="icon" :src="selStatus ? `${ossUrl}/order/sel-ac.png` : `${ossUrl}/order/sel.png`"
						mode="aspectFill" @click="tapIcon">
					</image>
					已阅读并同意<text @click="$open('/pages/common/carRentalAgreement')">《用户租车协议》</text>
				</view>
			</view>
		</view>
		<view class="bottom-mat"></view>
		<view class="bottom">
			<view class="price-info">
				总计<view class="price">
					￥<text>{{total ? total.toFixed(2) : 0}}</text>
				</view>
			</view>
			<view class="func-box">
				<view class="detail"
					@click="$open('/pages/order/costDetail', {info: JSON.stringify(info.orderPriceInfo)})">
					费用明细<view class="arrow"></view>
				</view>
				<!-- #ifdef MP-WEIXIN -->
				<view class="btn" @click="sure()">立即租车</view>
				<!-- #endif -->
				<!-- #ifdef MP-ALIPAY -->
				<view class="btn" @click="sure()">免押预定</view>
				<!-- #endif -->
			</view>
		</view>
		<!-- 弹窗-流程 -->
		<uni-popup ref="processPopup" type="center">
			<view class="process-modal">
				<scroll-view class="process-content" :scroll-y="true">
					<view class="title">免押金</view>
					<view class="info">下单预付租金后，取车时间向门店工作人员<text>申请芝麻信用免押金</text>，信用综合评估通过后有机会减免25000元。</view>
					<image class="process" :src="`${ossUrl}/home/process.png`" mode="aspectFill"></image>
					<view class="section">
						<view class="caption">使用芝麻信用免押金</view>
						<view class="text">使用芝麻信用免押金的订单，车辆押金取车前冻结，还车时解冻；违章押金还车冻结。还车后30天若无违章则解冻。</view>
					</view>
					<view class="section">
						<view class="caption">使用在线支付的押金</view>
						<view class="text">车辆押金取车前支付，还车时退还；违章押金还车时支付，还车后30天若无违章退还。</view>
					</view>
					<view class="section">
						<view class="caption">使用信用卡预授权免押金</view>
						<view class="text">使用信用卡免押金的订单，车辆押金取车前冻结，还车时解冻；违章押金还车时冻结，还车后30天若无违章则解冻。</view>
					</view>
				</scroll-view>
				<view class="btn-box">
					<view class="btn" @click="closeProcessPopup">知道了</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import EvanSwitch from '@/components/evan-switch/evan-switch'
	import {
		rentalOrderGenerateOrder,
		rentalOrderCreateOrders
	} from '@/apis/rentalOrder'
	import {
		findIsUseCouponByUser
	} from '@/apis/coupon'
	import {
		invoiceQueryByUser
	} from '@/apis/invoice'
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				swiperInfo: [], // 轮播数据
				total: '',
				dotsStyles: {
					bottom: 10,
					backgroundColor: '#dadada',
					border: 0,
					selectedBackgroundColor: 'rgba(218,218,218,0.40)',
					selectedBorder: 'rgba(218,218,218,0.40)',
				}, // 轮播样式
				current: 0, // 轮播当前索引
				acIndex: 0, // tab
				selStatus: false, // 选择状态
				freeAndState: false, // 免押状态
				rentFreeSwitch: false, // 是否开启免租
				invoiceSwitch: false, // 是否开启发票
				isInsurance: false, // 是否选择保险
				isInsuranceId: 0, //0是否 1是买
				couponPrice: '', //优惠券
				invoiceIndex: 0, //选择发票下标
				invoiceId: null, //发票Id
				invoiceList: [], //发票list
				couponId: '', //优惠券id
				info: '', //获取页面信息
				yidiType: '', //判断是否异地
				takeday: '', //取车日期
				takeweek: '', //取车星期
				taketime: '', //取车时间
				takeId: '', //取车地点id
				backday: '', //还车日期
				backweek: '', //还车星期
				backtime: '', //还车时间
				backId: '', //还车地点id
				totalDate: '', //相差时间
				carId: '', //车型id
				remark: '', //备注
				yudingInfo: '', //时间 地点
			}
		},
		computed: {
			// 底部内容
			bottomInfo() {
				let info = ''
				switch (this.acIndex) {
					case 0:
						info = '身份证+驾照正副本；身份证有效期需1个月以上，驾龄3个月以上'
						break
					case 1:
						info = '下单半小时内免费取消，取车前12小时以上（不包含本数）取消全额退款，取车前12小时内取消订单将收取订单总额20%违约金，超过取车时间取消订单将收取订单总额30%违约金。'
						break
					case 2:
						info = '取车时冻结[租车押金]元作为租车押金，还车时解冻；还车时冻结[违章押金]元违章押金，还车后30天内无违章，退还该笔押金（支持余额支付或信用卡）'
						break
					case 3:
						info = '将按租期里程×每公里油耗计算燃油费用，请保留加油小票或凭证，还车时多退少补'
						break
					case 4:
						info = '车辆不允许进入云南沪沽湖、昌都左贡县、拉萨当雄县、日喀则尼木县、林芝工布江达县、新疆喀纳斯景区，如您有此需求，请选择其他租赁公司，以免造成不便'
						break
				}
				return info
			},
			...mapState('app', ['platform'])
		},
		watch: {
			invoiceSwitch(newVal) {
				if (this.acIndex !== 5 || !newVal || this.invoiceList.length > 0) return
				this.emptyInvoiceModal()
			}
		},
		components: {
			EvanSwitch
		},
		onLoad(e) {
			this.yudingInfo = e
			this.carId = e.carModelId
			this.takeId = e.takeCarAddressId
			this.backId = e.carAlsoAddressId
			this.takeday = e.takeCarDateShow
			this.takeweek = e.takeCarDayShow
			this.taketime = e.takeCarTimeShow
			this.backday = e.carAlsoDateShow
			this.backweek = e.carAlsoDayShow
			this.backtime = e.carAlsoTimeShow
			this.totalDate = e.totalDate
			this.findIsUseCouponByUser()
			this.invoiceQueryByUser()
			this.rentalOrderGenerateOrder(e)
			this.eventListener()
		},
		methods: {
			async rentalOrderGenerateOrder(e) {
				let data = {
					vehicleModelId: this.yudingInfo.carModelId,
					rentEndTime: this.yudingInfo.carAlsoTime,
					rentBeginTime: this.yudingInfo.takeCarTime,
					pickPlace: this.yudingInfo.takeCarAddressId,
					returnPlace: this.yudingInfo.carAlsoAddressId,
					orderSource: 0
				}
				const [err, res] = await rentalOrderGenerateOrder(data)
				if (err) {
					if (!err.message) this.$toast('订单错误！')
					setTimeout(() => {
						this.$close()
					}, 1000)
					return
				}
				this.info = res.data
				this.info.clientVehicleVo.vehicleModelFiles = JSON.parse(this.info.clientVehicleVo.vehicleModelFiles)
				this.info.clientVehicleVo.labels = JSON.parse(this.info.clientVehicleVo.labels)
				this.total = Number(this.info.orderPriceInfo.total.toFixed(2))
				if (this.info.returnPlace.name === this.info.pickPlace.name) {
					this.yidiType = false
				} else {
					this.yidiType = true
				}
				this.$forceUpdate()
			},
			//发票
			async invoiceQueryByUser() {
				const [err, res] = await invoiceQueryByUser()
				if (err) return
				this.invoiceList = res.data
				this.invoiceId = this.invoiceList[0] ? this.invoiceList[0].id : null
			},
			// 空发票弹窗
			async emptyInvoiceModal() {
				const [err, res] = await this.$showModal({
					content: '暂无发票抬头，立即添加？'
				})
				if (res !== 'confirm') {
					this.invoiceSwitch = false
					return
				}
				this.$open('/pages/mine/invoiceInfo', {
					mode: 'add'
				})
			},
			// 前往发票编辑
			goInvoiceInfo(item) {
				this.$open('/pages/mine/invoiceInfo', {
					mode: 'edit',
					info: JSON.stringify(item)
				})
			},
			//选择发票
			selectInvoice(e) {
				this.invoiceIndex = e
				this.invoiceId = this.invoiceList[e].id
			},
			//优惠券
			async findIsUseCouponByUser() {
				const [err, res] = await findIsUseCouponByUser()
				if (err) return
				if (!res.data || res.data.length === 0) return
				this.couponPrice = res.data[0].discountAmount
				this.couponId = res.data[0].id
			},
			// 轮播改变
			swiperChange(e) {
				this.current = e.detail.current;
			},
			// 切换
			tapTab(index) {
				this.acIndex = index
			},
			// 切换icon
			tapIcon() {
				this.selStatus = !this.selStatus
			},
			// 打开流程弹窗
			openProcessPopup() {
				this.$refs.processPopup.open()
			},
			// 关闭流程弹窗
			closeProcessPopup() {
				this.$refs.processPopup.close()
			},
			// 打开地图
			async openMap(latitude, longitude) {
				latitude = Number(latitude)
				longitude = Number(longitude)
				uni.openLocation({
					latitude,
					longitude
				})
			},
			// 选择保险
			selInsurance() {
				this.isInsurance = !this.isInsurance
				if (this.isInsurance == true) {
					this.info.orderPriceInfo.total = this.total += Number(this.info.orderPriceInfo.insuranceMoney)
					this.info.orderPriceInfo.orderPriceList.push({
						id: 99,
						name: '驾无忧保险',
						note: null,
						price: this.info.orderPriceInfo.insuranceMoney
					})
				} else {
					this.info.orderPriceInfo.total = this.total -= Number(this.info.orderPriceInfo.insuranceMoney)
					let current = -1
					this.info.orderPriceInfo.orderPriceList.forEach((item, index) => {
						if (item.name === '驾无忧保险') current = index
					})
					this.info.orderPriceInfo.orderPriceList.splice(current, 1)
				}
			},
			// 租车
			async sure() {
				if (this.selStatus == false) {
					this.$toast("请同意用户协议");
					return false;
				}
				if (!this.info.orderPriceInfo.isRealName) {
					this.$toast('您未实名认证，请先去完善个人信息！')
					setTimeout(() => {
						this.$open('/pages/order/perfectInformation')
					}, 500)
					return
				}
				const params = {
					couponId: this.couponId,
					invoiceId: this.invoiceId,
					isInsurance: this.isInsuranceId ? 1 : 0,
					orderSource: 0,
					pickPlace: this.takeId,
					returnPlace: this.backId,
					remark: this.remark,
					rentBeginTime: this.yudingInfo.takeCarTime,
					rentEndTime: this.yudingInfo.carAlsoTime,
					vehicleModelId: this.carId
				}
				const [err, res] = await rentalOrderCreateOrders(params)
				if (err) return
				this.$open('./orderPay', {
					price: this.total,
					reflect: JSON.stringify(res.data.reflect),
					rentalMoney: this.info.orderPriceInfo.rentalMoney || 0
				}, 1)
			},
			// 监听时间
			eventListener() {
				// 详情刷新
				uni.$on('detailRefresh', () => {
					this.rentalOrderGenerateOrder()
				})
				// 优惠券更新
				uni.$on('couponUpdate', (e) => {
					this.info.orderPriceInfo.total = this.total -= Number(this.couponPrice)
					this.couponPrice = e.price
					this.couponId = e.couponId
					this.info.orderPriceInfo.total = this.total += Number(this.couponPrice)
					this.info.orderPriceInfo.orderPriceList.forEach((item, index) => {
						if (item.name === '优惠券减免') {
							item.id = e.couponId
							item.price = -(e.price)
						}
					})
				})
				// 发票刷新
				uni.$on('invoiceRefresh', () => {
					this.invoiceQueryByUser()
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.confirm-order {

		.uni-swiper__warp {
			box-shadow: 0 3rpx 2rpx 0 #eff0f3;
		}

		.swiper,
		.banner {
			@include box(100%, 392rpx, #ddd);
		}

		.info-card {
			@include box(100%, 168rpx, #fff);
			padding: 40rpx 32rpx;

			.name-box {
				@include flex-row();
				@include font-set(32rpx, #000, 700);
				line-height: 44rpx;

				.label-box {
					@include flex-row();
					margin-left: 32rpx;

					.label {
						@include box-h(34rpx, rgba(90, 126, 255, 0.10));
						padding: 0 10rpx;
						@include flex-center;
						@include font-set(16rpx, #5A7EFF, 700);

						&~.label {
							margin-left: 12rpx;
						}
					}
				}
			}

			.params {
				@include font-set(24rpx, #999);
				line-height: 34rpx;
				margin-top: 14rpx;
			}
		}

		.lease {
			@include box-w(100%, #fff);
			margin-top: 20rpx;
			padding: 40rpx 32rpx;

			.caption {
				@include font-set(32rpx, #000, 700);

				&.top {
					margin-top: 40rpx;
				}
			}

			.time {
				@include flex-row(space-between);
				padding-top: 20rpx;

				.left,
				.right {
					.caption {
						@include font-set(28rpx, #000, 700);
						line-height: 36rpx;
					}

					.sub-caption {
						@include font-set(24rpx, #999);
						line-height: 34rpx;
						margin-top: 6rpx;
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

			.take-also {
				@include flex-row(space-between);
				margin-top: 20rpx;

				.address-box {
					@include flex-row();

					.home {
						@include square(24rpx);
					}

					.address {
						@include font-set(28rpx, #000);
						line-height: 40rpx;
						margin-left: 23rpx;
					}
				}

				.btn-box {
					.btn {
						@include square(44rpx);

						&~.btn {
							margin-left: 30rpx;
						}
					}
				}
			}

			.address-info {
				@include font-set(24rpx, #FFA05B, 700);
				line-height: 34rpx;
				margin-top: 16rpx;
			}
		}

		.sesame-box {
			@include box(100%, 120rpx, #fff);
			@include flex-row(space-between);
			padding: 0 32rpx;
			margin-top: 20rpx;

			.toast {
				.sesame {
					@include box(36rpx, 40rpx);
					margin-right: 10rpx;
				}

				@include flex-center;
				@include font-set(24rpx, #999);

				&>text {
					color: #5A7EFF;
					margin: 0 6rpx;
				}
			}

			.evan-switch {
				transform: scale(0.8);
			}

			.deposit-free {
				@include flex-row();
				@include font-set(24rpx, #5A7EFF, 500);
				line-height: 36rpx;

				.arrow {
					@include square(14rpx);
					border: 1px solid #999;
					border-left: 0;
					border-bottom: 0;
					transform: rotate(45deg);
					margin-left: 10rpx;
				}
			}
		}

		.function-box {
			@include box-w(100%, #fff);
			padding: 0 32rpx;
			margin-top: 20rpx;

			.item {
				@include flex-row(space-between);
				padding: 40rpx 0;

				&~.item {
					border-top: 1px solid #EFF0F3;
				}

				&.vertical {
					flex-direction: column;
					align-items: flex-start;
				}

				.top {
					@include flex-row();
					@include font-set(28rpx, #000, 500);
					line-height: 40rpx;

					.question {
						@include square(22rpx);
						margin-left: 11rpx;
					}

					.price {
						@include font-set(24rpx, #999);
						line-height: 34rpx;
					}
				}

				input {
					@include box(100%, 74rpx, #EFF0F3);
					border-radius: 10rpx;
					@include flex-row();
					padding-left: 20rpx;
					@include font-set(24rpx, #999);
					line-height: 34rpx;
					margin-top: 24rpx;
				}

				.input {
					@include font-set(24rpx, #999);
				}

				.left {
					@include flex-col(center, flex-start);

					.bottom-text {
						@include font-set(22rpx, #999);
						line-height: 34rpx;
						margin-top: 10rpx;
					}
				}

				.caption {
					@include flex-row();
					@include font-set(28rpx, #000, 500);
					line-height: 40rpx;

					.label {
						@include box(124rpx, 34rpx, rgba(90, 126, 255, 0.10));
						border-radius: 4rpx;
						@include flex-center;
						@include font-set(16rpx, #5A7EFF, 700);
						margin-left: 20rpx;
					}
				}

				.right {
					@include flex-row();

					.text {
						@include font-set(20rpx, #999, 700);
						line-height: 50rpx;

						text {
							font-size: 36rpx;
						}
					}

					.circle {
						@include circle(20rpx);
						border: 1px solid #A4A4A4;
						margin-left: 20rpx;

						&.ac {
							background-color: #5A7EFF;
							border: 1px solid #5A7EFF;
						}
					}

					.arrow {
						@include square(14rpx);
						border: 1px solid #999;
						border-left: 0;
						border-bottom: 0;
						transform: rotate(45deg);
						margin-left: 20rpx;
					}
				}
			}
		}

		.tab-box {
			@include box-w();
			margin-top: 20rpx;

			.header {
				@include box(100%, 128rpx, #fff);
				padding: 0 32rpx;
				white-space: nowrap;

				.item {
					display: inline-block;
					padding: 30rpx 0 30rpx;

					&~.item {
						margin-left: 55rpx;
					}

					&.ac {
						.line {
							opacity: 1;
						}

						text {
							color: #5A7EFF;
						}
					}

					text {
						@include font-set(28rpx, #000, 500);
						line-height: 40rpx;
					}

					.line {
						@include box(40rpx, 8rpx, #5A7EFF);
						border-radius: 20rpx;
						margin: 10rpx auto 0;
						opacity: 0;
					}
				}
			}

			.box {
				position: relative;
				@include box-w();
				padding: 40rpx 32rpx 20rpx;

				.bottom-info-mat {
					height: 52rpx;
				}

				.bottom-info {
					position: absolute;
					left: 0;
					bottom: 20rpx;
					@include box-w();
					@include flex-row();
					margin-top: 100rpx;
					padding-left: 32rpx;

					.icon {
						@include square(32rpx);
						margin-right: 20rpx;
					}

					@include font-set(24rpx, #999);

					text {
						color: #597DFD;
					}
				}

				&.box-voucher {
					min-height: 234rpx;

					.info {
						@include font-set(28rpx, #999);
					}
				}

				&.box-invoice {
					min-height: 432rpx;

					.top {
						@include box-w();
						@include flex-row(space-between);
						@include font-set(24rpx, #999);

						.evan-switch {
							transform: scale(0.8);
						}
					}

					.item {
						padding: 25rpx 0;
						border-bottom: 1px solid #ddd;

						&:last-of-type {
							margin-bottom: 60rpx;
						}

						.name {
							@include flex-row(space-between);
							@include font-set(28rpx, #000, 500);
							line-height: 40rpx;

							.title {
								@include flex-row();
							}

							.label {
								@include box(62rpx, 34rpx, #5A7EFF);
								@include flex-center;
								@include font-set(16rpx, #fff, 700);
								border-radius: 4rpx;
								margin-left: 20rpx;
							}
						}

						.number {
							position: relative;
							@include flex-row(space-between);
							@include font-set(24rpx, #999);
							line-height: 34rpx;
							margin-top: 22rpx;

							.arrow {
								@include square(14rpx);
								border: 1px solid #999;
								border-left: 0;
								border-bottom: 0;
								transform: rotate(45deg);
							}

							.click-block {
								position: absolute;
								bottom: -20rpx;
								right: -10rpx;
								@include box(80rpx, 80rpx);
							}
						}
					}
				}
			}
		}

		.bottom-mat {
			height: 188rpx;
		}

		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			z-index: 9;
			@include box-w(100%, #fff);
			padding: 30rpx 32rpx 60rpx;
			@include flex-row(space-between);
			box-shadow: 0 -1rpx 10rpx #ddd;

			.price-info {
				@include flex-row();
				@include font-set(28rpx, #000, 500);
				line-height: 40rpx;

				.price {
					@include font-set(16rpx, #FC3736, 700);
					line-height: 48rpx;
					margin-left: 20rpx;

					text {
						font-size: 36rpx;
					}
				}
			}

			.func-box {
				@include flex-row();

				.detail {
					@include flex-row();
					@include font-set(24rpx, #999);
					line-height: 34rpx;

					.arrow {
						@include square(14rpx);
						border: 1px solid #999;
						border-left: 0;
						border-bottom: 0;
						transform: rotate(135deg);
						margin-left: 12rpx;
					}
				}

				.btn {
					@include box(200rpx, 96rpx, #5A7EFF);
					@include flex-center;
					@include font-set(28rpx, #fff, 500);
					border-radius: 52rpx;
					margin-left: 27rpx;
				}
			}
		}

		.process-modal {
			position: relative;
			@include box-w(608rpx, #fff);
			@include flex-col(flex-start);
			height: 820rpx;
			padding: 40rpx;
			border-radius: 20rpx;

			.process-content {
				max-height: 630rpx;
			}

			.title {
				@include font-set(36rpx, #000, 700);
				line-height: 50rpx;
			}

			.info {
				@include font-set(24rpx, #000);
				@include text-both;
				margin-top: 40rpx;

				text {
					color: #5A7EFF;
				}
			}

			.process {
				@include box(474rpx, 132rpx);
				margin-top: 40rpx;
				margin-bottom: 40rpx;
			}

			.section {

				@include text-both;

				&~.section {
					margin-top: 30rpx;
				}

				.caption {
					@include font-set(24rpx, #000, 700);
					line-height: 34rpx;
				}

				.text {
					@include font-set(24rpx, #000);
					line-height: 34rpx;
					margin-top: 10rpx;
				}
			}

			.btn-box {
				@include bottom();
				@include box-w(100%, #fff);
				padding: 20rpx 0 40rpx;

				.btn {
					@include box(300rpx, 96rpx, #5A7EFF);
					@include flex-center;
					@include font-set(32rpx, #fff, 700);
					border-radius: 52rpx;
					margin: 0 auto;
				}
			}
		}
	}
</style>
