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
			<view class="item" v-for="(item, index) in 5" :key="index" @click="$open('/pages/order/orderDetail')">
				<view class="item-header">
					<view class="name-box">
						<view class="name">大众 捷达郑家院子1号店</view>
						<view v-show="status === 0" :class="['label-card', {'orange': status === 0}]">
							<view class="top"></view>
							<view class="line"></view>
							<view class="box">未支付</view>
						</view>
					</view>
					<view class="price">￥<text>188.00</text></view>
				</view>
				<view class="content">
					<view class="status-box">
						<view class="time">05-25至05-30</view>
						<view
							v-show="status === 1 || status === 2 || status === 3 || status === 4 || status === 5 || status === 6"
							:class="['status', {'blue': status!==6}, {'red':status===6}] ">等待送车</view>
					</view>
					<view class="address"><text v-show="false">取</text>恒大中渝广场送车点</view>
					<view v-show="false" class="address"><text>还</text>恒大中渝广场送车点</view>
					<view v-show="false" class="plate">渝A·5231B</view>
					<view v-show="false" class="parameter">大众 捷达丨自动 5座 2.0L</view>
				</view>
				<view class="bottom">
					<view v-show="status < 5" class="contact">
						<image class="phone" :src="`${ossUrl}/common/phone-big.png`"></image>
						联系送车员
					</view>
					<view v-show="status >= 5" class="contact"></view>
					<view class="btn-box">
						<view v-show="status === 3" class="btn white" @click.stop="$open('/pages/order/renewal')">续租用车
						</view>
						<view v-show="status === 0" class="btn blue">立即支付</view>
						<view v-show="status === 2" class="btn blue" @click.stop="$open('/pages/common/goInspect')">查看车况
						</view>
						<view v-show="status === 3" class="btn blue" @click.stop="$open('/pages/order/returnCar')">前往还车
						</view>
						<view v-show="status === 4" class="btn blue"
							@click.stop="$open('/pages/order/changeCarDetail')">换车详情</view>
						<view v-show="status === 5" class="btn blue" @click.stop="$open('/pages/order/evaluate')">评价
						</view>
						<view v-show="status === 5 && false" class="btn blue"
							@click.stop="$open('/pages/common/storeComment')">查看评价</view>
						<view v-show="status === 6" class="btn blue">再次预订</view>
					</view>
				</view>
			</view>
		</view>
		<view class="empty">
			<image class="bg" :src="`${ossUrl}/common/res-empty.png`"></image>
			<view class="text">暂无订单</view>
		</view>
	</view>
</template>

<script>
	import {rentalOrderPageQuery} from'@/apis/rentalOrder'
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				acTab: 0, // 活跃的tab
				status: 0,
				page:1,
				size:10
			}
		},
		computed: {},
		onLoad() {
			this.getorderList(0)
		},
		methods: {
		async	getorderList(e){
				const [err,res] = await rentalOrderPageQuery()
				if(err) return
				console.log(res)
				if(res.data.list.length==0){
					
				}else{
					this.list.push(res.data.list)
				}
			},
			// 切换tab
			taptab(index) {
				this.acTab = index
			this.getorderList(index)
			},
			//下拉刷新
			onPullDownRefresh() {
				this.page = 1
				this.size = 10
				this.list = []
				this.getorderList()
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			// 上拉加载
			onReachBottom(e) {
				this.page = this.page + 1;
				this.getorderList()
			},
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
				padding: 40rpx;
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

						text {
							color: #5A7EFF;
							margin-right: 10rpx;
						}
					}

					.plate {
						@include font-set(28rpx, #000);
						line-height: 40rpx;
						margin-top: 12rpx;
					}

					.parameter {
						@include font-set(24rpx, #999);
						line-height: 34rpx;
						margin-top: 12rpx;
					}
				}

				.bottom {
					@include flex-row(space-between);
					padding-top: 38rpx;

					.contact {
						@include flex-row();
						@include font-set(24rpx, #FFA05B, 500);
						line-height: 36rpx;

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
