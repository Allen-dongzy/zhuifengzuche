<template>
	<view class="select-car">
		<view class="header">
			<view :class="['item', {'ac': acTab === 0}]" @click="taptab(0)">默认</view>
			<view :class="['item', {'ac': acTab === 1}]" @click="taptab(1)">
				品牌<image class="arrow" :src="`${ossUrl}/home/${acTab === 1?'arrow-up':'arrow-down'}.png`"></image>
			</view>
			<view :class="['item', {'ac': acTab === 2}]" @click="taptab(2)">
				排档<image class="arrow" :src="`${ossUrl}/home/${acTab === 2?'arrow-up':'arrow-down'}.png`"></image>
			</view>
			<view :class="['item', {'ac': acTab === 3}]" @click="taptab(3)">
				座位数<image class="arrow" :src="`${ossUrl}/home/${acTab === 3?'arrow-up':'arrow-down'}.png`"></image>
			</view>
		</view>
		<view class="header-mat"></view>
		<view v-show="!searchKey" class="classify" :style="{height: `${windowHeight - searchHeight - 14}px`}">
			<scroll-view class="class" :scroll-y="true">
				<view class="item" v-for="(item, index) in carClassList" :key="index" @click="tapClass(index)">
					<view :class="['title', {'ac': index === acClass}]">{{item.name}}</view>
					<view class="price">{{ item.price ? `￥${item.price}` : ''}}</view>
				</view>
			</scroll-view>
			<scroll-view class="list" :scroll-y="true" @scrolltolower="scrollToBottom">
				<view class="item" v-for="(item, index) in 10" :key="index" @click="$open('/pages/order/confirmOrder')">
					<view class="card">
						<image class="pic"
							src="https://youjia-image.cdn.bcebos.com/seriesImage/158738183449412be5bb.png@!w_600_fp"
							mode="aspectFill"></image>
						<view class="parameter-box">
							<view class="title-bar">
								<view class="caption">大众迈腾</view>
								<view class="status">已租满</view>
							</view>
							<view class="parameter">大众 捷达丨自动 5座 2.0L</view>
							<view class="label-box">
								<view class="label">时尚</view>
								<view class="label">省油</view>
								<view class="label">舒适</view>
							</view>
						</view>
					</view>
					<view class="price-bar">
						<view class="calendar" @click.stop="$open('/pages/home/priceCalendar')">
							<image class="icon-calendar" :src="`${ossUrl}/home/icon-calendar.png`"></image>
							<text>价格日历</text>
							<view class="arrow"></view>
						</view>
						<view class="price">￥<text>188/天</text></view>
					</view>
					<view class="address-bar">
						<image class="icon-home" :src="`${ossUrl}/home/icon-home.png`"></image>
						<view class="address" @click.stop="$open('/pages/home/store')">门店地址：<text>郑家院子东路8号</text></view>
					</view>
				</view>
				<uni-load-more :status="dataStatus" />
			</scroll-view>
		</view>
		<!-- 弹窗-品牌 -->
		<uni-popup ref="brandPopup" type="top">
			<view class="mask" :style="{height: `${windowHeight}px`}" @click="closeBrandModal">
				<view class="brand-modal" @click.stop>
					<view class="box">
						<scroll-view class="brand-tab-list" :scroll-y="true">
							<view :class="['item', {'ac': acBranch === index}]" v-for="(item, index) in 20" :key="index"
								@click="tapBranch(index)">阿尔法罗密欧</view>
						</scroll-view>
						<scroll-view class="brand-list" :scroll-y="true">
							<view :class="['item', {'ac': acModel === index}]" v-for="(item, index) in 20" :key="index"
								@click="tapModel(index)">
								<text>不限车型</text>
								<image v-show="acModel === index" class="hook" :src="`${ossUrl}/home/hook.png`"></image>
							</view>
						</scroll-view>
					</view>
					<view class="bottom-mat"></view>
					<view class="bottom">
						<view class="btn clear">清空</view>
						<view class="btn confirm">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 弹窗-排档 -->
		<uni-popup ref="gearPopup" type="top">
			<view class="mask" :style="{height: `${windowHeight}px`}" @click="closeGearModal">
				<view class="gear-modal" @click.stop>
					<view class="box">
						<view class="caption">排档</view>
						<view class="label-box">
							<view :class="['label', {'ac': acGear === 0}]" @click="tapGear(0)">自动挡</view>
							<view :class="['label', {'ac': acGear === 1}]" @click="tapGear(1)">手动挡</view>
						</view>
					</view>
					<view class="bottom-mat"></view>
					<view class="bottom">
						<view class="btn clear">清空</view>
						<view class="btn confirm">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
		<!-- 弹窗-座位 -->
		<uni-popup ref="seatPopup" type="top">
			<view class="mask" :style="{height: `${windowHeight}px`}" @click="closeSeatModal">
				<view class="seat-modal" @click.stop>
					<view class="box">
						<view class="caption">车辆配置</view>
						<view class="label-box">
							<view :class="['label', {'ac': acSeat === 0}]" @click="tapSeat(0)">2</view>
							<view :class="['label', {'ac': acSeat === 1}]" @click="tapSeat(1)">5</view>
							<view :class="['label', {'ac': acSeat === 2}]" @click="tapSeat(2)">6</view>
							<view :class="['label', {'ac': acSeat === 3}]" @click="tapSeat(3)">7</view>
							<view :class="['label', {'ac': acSeat === 4}]" @click="tapSeat(4)">9</view>
						</view>
					</view>
					<view class="bottom-mat"></view>
					<view class="bottom">
						<view class="btn clear">清空</view>
						<view class="btn confirm">确定</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	import {
		vehicleQueryVehicleCategorys,
		vehiclePageQuery
	} from '@/apis/vehicle'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				acTab: 0, // 活动tab
				acClass: 0, // 活动分类
				searchHeight: 0, // 搜索框高度
				brandStatus: false, // 品牌状态
				acBranch: 0, // 活动品牌
				acModel: -1, // 选中的型号
				gearStatus: false, // 排档状态
				acGear: -1, // 选中的排档
				seatStatus: false, // 座位状态
				acSeat: -1, // 选中的座位
				takeCarAddress: {}, // 取车点信息
				carClassList: [], // 租车类别列表 
				carList: [], // 车辆列表
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: '', // more loading noMore noData
			}
		},
		computed: {
			// 窗口高度
			...mapState('app', ['windowHeight'])
		},
		onLoad(e) {
			if (e && e.takeCarAddress) this.takeCarAddress = JSON.parse(e.takeCarAddress)
			if (e && e.id) this.takeCarAddress = {
				id: e.id
			}
			this.vehicleQueryVehicleCategorys()
		},
		mounted() {
			this.getSearchHeight()
		},
		methods: {
			// 获取车辆类别
			async vehicleQueryVehicleCategorys() {
				const [err, res] = await vehicleQueryVehicleCategorys(this.takeCarAddress.id)
				if (err) return
				this.carClassList = res.data
				this.vehiclePageQuery()
			},
			// 触底加载
			scrollToBottom() {
				if (!this.requestKey) return
				this.page++
				this.vehiclePageQuery()
			},
			// 初始化
			init() {
				this.requestKey = true
				this.page = 1
				this.carList = []
			},
			// 获取车辆列表
			async vehiclePageQuery() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					categoryId: this.carClassList[this.acClass].id,
					deliveryId: this.takeCarAddress.id
				}
				const [err, res] = await vehiclePageQuery(params)
				if (err) {
					this.requestKey = false
					this.dataStatus = 'noData'
					return
				}
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.requestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.carList = [...this.carList, ...res.data.list]
			},
			// 获取搜索框高度
			getSearchHeight() {
				const query = uni.createSelectorQuery().in(this)
				query.select('.header').boundingClientRect(data => {
					this.searchHeight = data.height
				}).exec();
			},
			// 切换tab
			taptab(index) {
				// 如果切换按钮不一致则判断老的弹窗是否关闭，若为关闭则关闭
				if (this.acTab !== index) {
					switch (this.acTab) {
						case 1:
							this.brandStatus && this.closeBrandModal()
							break
						case 2:
							this.gearStatus && this.closeGearModal()
							break
						case 3:
							this.seatStatus && this.closeSeatModal()
							break
					}
				}
				// 切换状态
				this.acTab = index
				// 若未打开指定弹窗则打开弹窗，打开则关闭弹窗
				switch (index) {
					case 1:
						this.brandStatus ? this.closeBrandModal() : this.openBrandModal()
						break
					case 2:
						this.gearStatus ? this.closeGearModal() : this.openGearModal()
						break
					case 3:
						this.seatStatus ? this.closeSeatModal() : this.openSeatModal()
						break
				}

			},
			// 切换分类
			tapClass(index) {
				this.acClass = index
				this.init()
				this.vehiclePageQuery()
			},
			// 打开品牌模态框
			openBrandModal() {
				this.$refs.brandPopup.open()
				this.brandStatus = true
			},
			// 关闭品牌模态框
			closeBrandModal() {
				this.acTab = 0
				this.$refs.brandPopup.close()
				this.brandStatus = false
			},
			// 切换品牌
			tapBranch(index) {
				this.acBranch = index
			},
			// 切换型号
			tapModel(index) {
				this.acModel = index
			},
			// 打开排档模态框
			openGearModal() {
				this.$refs.gearPopup.open()
				this.gearStatus = true
			},
			// 关闭排档模态框
			closeGearModal() {
				this.acTab = 0
				this.$refs.gearPopup.close()
				this.gearStatus = false
			},
			// 切换排档
			tapGear(index) {
				this.acGear = index
			},
			// 打开座位模态框
			openSeatModal() {
				this.$refs.seatPopup.open()
				this.seatStatus = true
			},
			// 关闭座位模态框
			closeSeatModal() {
				this.acTab = 0
				this.$refs.seatPopup.close()
				this.seatStatus = false
			},
			// 切换座位
			tapSeat(index) {
				this.acSeat = index
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.select-car {

		// 滚动条轨道样式
		scroll-view ::-webkit-scrollbar {
			width: 0;
			height: 0;
			background-color: transparent;
		}

		.header {
			position: fixed;
			left: 0;
			top: 0;
			z-index: 100;
			@include box(100%, 100rpx, #fff);
			@include flex-row();
			border: 1px solid #EFF0F3;

			.item {
				@include box(25%, 100%);
				@include flex-center;
				@include font-set(28rpx, #000, 700);

				&.ac {
					color: #5A7EFF;
				}

				.arrow {
					@include box(12rpx, 10rpx);
					margin-left: 10rpx;
				}
			}
		}

		.header-mat {
			height: 100rpx;
		}

		.classify {
			@include box-w();
			@include flex-row(space-between, flex-start);
			margin-top: 28rpx;
			padding: 0 32rpx;

			.class {
				@include box(162rpx, 100%);
				border-right: 1px solid #EFF0F3;

				.item {
					margin-bottom: 22rpx;

					.title {
						@include font-set(28rpx, #000, 700);
						line-height: 40rpx;

						&.ac {
							border-right: 8rpx solid #5A7EFF;
						}
					}

					.price {
						@include font-set(20rpx, #B2B2B2);
						line-height: 28rpx;
						height: 28rpx;
					}
				}
			}

			.list {
				@include box(522rpx, 100%);
				padding-bottom: 50rpx;

				.item {
					@include box(100%, 310rpx);
					padding: 30rpx 0 26rpx 20rpx;

					&~.item {
						border-top: 1px solid #EFF0F3;
					}

					.card {
						@include flex-row();

						.pic {
							@include box(244rpx, 128rpx);
						}

						.parameter-box {
							margin-left: 10rpx;

							.title-bar {
								@include flex-row();

								.caption {
									@include font-set(28rpx, #000, 500);
									line-height: 40rpx;
								}

								.status {
									@include font-set(20rpx, #FC3736, 500);
									line-height: 30rpx;
									margin-left: 22rpx;
								}
							}

							.parameter {
								@include font-set(20rpx, #000);
								margin-top: 2rpx;
							}

							.label-box {
								@include box-h(34rpx);
								@include flex-row();
								margin-top: 24rpx;

								.label {
									@include box(62rpx, 34rpx, rgba(90, 126, 255, 0.10));
									@include flex-center;
									@include font-set(16rpx, #5A7EFF, 700);
									border-radius: 4rpx;

									&~.label {
										margin-left: 8rpx;
									}
								}
							}
						}
					}

					.price-bar {
						@include flex-row();
						margin-top: 28rpx;

						.calendar {
							@include box-w(244rpx);
							@include flex-row();

							.icon-calendar {
								@include box(24rpx, 26rpx);
							}

							text {
								@include font-set(24rpx, #999);
								line-height: 34rpx;
								margin-left: 10rpx;
							}

							.arrow {
								@include square(14rpx);
								border: 1px solid #999;
								transform: rotate(45deg);
								border-bottom: 0;
								border-left: 0;
								margin-left: 10rpx;
							}
						}

						.price {
							@include font-set(16rpx, #FC3736, 700);

							text {
								@include font-set(32rpx, #FC3736, 700);
							}
						}
					}

					.address-bar {
						@include flex-row();
						margin-top: 30rpx;

						.icon-home {
							@include square(24rpx);
						}

						.address {
							@include font-set(24rpx, #999);
							margin-left: 10rpx;

							text {
								@include font-set(24rpx, #5A7EFF);
							}
						}
					}
				}
			}
		}

		.mask {
			@include square();

			.bottom-mat {
				height: 136rpx;
			}

			.bottom {
				position: absolute;
				bottom: 0;
				left: 0;
				@include box(100%, 136rpx, #fff);
				@include flex-row(space-between);
				box-shadow: 0 -2rpx 0 0 #eff0f3;
				padding: 0 32rpx;

				.btn {
					@include box(300rpx, 96rpx);
					@include flex-center;
					font-size: 32rpx;
					font-weight: 700;
					border-radius: 52rpx;

					&.clear {
						color: #B2B2B2;
						border: 1px solid #B2B2B2;
					}

					&.confirm {
						color: #fff;
						background-color: #5A7EFF;
					}
				}
			}

			.brand-modal,
			.gear-modal,
			.seat-modal {
				position: relative;
				border-radius: 0 0 32rpx 32rpx;
				box-shadow: 0 -2rpx 0 0 #eff0f3;
				padding-top: 100rpx;
				overflow: hidden;
			}

			.brand-modal {
				@include box(100%, 70%, #fff);

				.box {
					@include box(100%, calc(100% - 136rpx));
					@include flex-row(space-between, flex-start);

					.brand-tab-list {
						@include box(254rpx, 100%, #EFF0F3);

						.item {
							@include box(100%, 84rpx);
							@include flex-center;
							@include font-set(26rpx, #000);

							&.ac {
								color: #5A7EFF;
								background-color: #fff;
							}
						}
					}

					.brand-list {
						@include box(496rpx, 100%, #fff);

						.item {
							@include box(100%, 84rpx);
							@include flex-row(space-between);
							padding-left: 20rpx;
							padding-right: 40rpx;
							@include font-set(28rpx, #000);

							&.ac {
								color: #5A7EFF;
							}

							.hook {
								@include square(40rpx);
							}
						}
					}
				}
			}

			.gear-modal,
			.seat-modal {
				.box {
					@include box(100%, 228rpx, #fff);
					padding: 30rpx 40rpx;

					.caption {
						@include font-set(32rpx, #000, 700);
					}

					.label-box {
						@include box(100%, 64rpx);
						@include flex-row();
						margin-top: 30rpx;

						.label {
							@include flex-center;
							@include font-set(28rpx, #B2B2B2);

							&.ac {
								background-color: #5A7EFF;
								color: #fff;
							}
						}
					}
				}
			}

			.gear-modal .box .label-box .label {
				@include box(140rpx, 64rpx, #EFF0F3);


				border-radius: 128rpx;

				&~.label {
					margin-left: 20rpx;
				}
			}

			.seat-modal .box .label-box .label {
				@include circle(64rpx, #EFF0F3);
				border-radius: 50%;

				&~.label {
					margin-left: 30rpx;
				}
			}
		}

	}
</style>
