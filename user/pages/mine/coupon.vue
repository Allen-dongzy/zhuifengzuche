<template>
	<view class="">
		<view class="flexBox">
			<view v-for="(item,index) in tabList" :key="index" @click="taptab(index)" class="box">
				<view class="acSelect" v-if="selectIndex==index">
					{{item.name}}
					<view class="blueLine"></view>
				</view>
				<view class="Select" v-else>{{item.name}}</view>
			</view>
		</view>
		<view class="coupon-center">
			<view class="list">
				<view class="coupon" v-for="(item, index) in couponList" :key="index">
					<image class="bg" v-if="type==0" :src="`${ossUrl}/home/is-get-bg.png`" mode="aspectFill"></image>
					<image class="bg" v-if="type!=0" :src="`${ossUrl}/home/no-get-bg.png`" mode="aspectFill"></image>
					<view class="mask">
						<view :class="['info', {'is-get': type===0}, {'no-get': type!==0}]">
							<view class="price">￥<text>{{item.discountAmount}}</text></view>
							<view class="description">
								<view class="text">{{item.couponTitle}}</view>
								<view class="time">到期时间：{{item.closeTime ? item.closeTime.split(' ')[0] : ''}}</view>
							</view>
						</view>
						<view class="btn" @click="couponHandler(index)">
							<image class="btn-bg" v-if="type===0" :src="`${ossUrl}/home/is-get-btn.png`" mode="aspectFill"></image>
							<image class="btn-bg" v-if="type!==0" :src="`${ossUrl}/home/no-get-btn.png`" mode="aspectFill"></image>
							<view class="text" v-if="type==0">可使用</view>
							<view class="text" v-if="type==1">已使用</view>
							<view class="text" v-if="type==2">已过期</view>
						</view>
					</view>
				</view>
			</view>
			<uni-load-more :status="dataStatus" />
		</view>
	</view>
	</view>
</template>

<script>
	import {
		couponQueryPage
	} from '@/apis/coupon'
	import {
		throttle
	} from '@/utils/tools'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				selectIndex: 0,
				tabList: [{
					name: '可使用',
					status: 0
				}, {
					name: '已使用',
					status: 1
				}, {
					name: '已过期',
					status: 2
				}],
				type: 0, // 筛选条件
				couponList: [], // 优惠券列表
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: '', // more loading noMore noData
				selectType: '', // home:首页跳转进来 goods:订单跳转进来
			}
		},
		onLoad(e) {
			if (e && e.selectType) this.selectType = e.selectType
			this.couponQueryPage()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.couponQueryPage()
		},
		methods: {
			// 切换
			taptab(index) {
				this.selectIndex = index
				this.type = this.tabList[index].status
				this.init()
				this.couponQueryPage()
			},
			// 初始化
			init() {
				this.page = 1
				this.requestKey = true
				this.couponList = []
			},
			// 获取优惠券列表
			async couponQueryPage() {
				this.dataStatus = 'loading'
				const params = {
					page: this.page,
					size: this.size,
					status: this.type
				}
				const [err, res] = await couponQueryPage(params)
				if (err) return
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.requestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.couponList = [...this.couponList, ...res.data.list]
			},
			// 点击领取
			couponHandler(index) {
				if (this.selectType === 'goods') this.selCouponById(index)
			},
			// 选择优惠券
			selCouponById(index) {
				uni.$emit('couponUpdate', {
					couponId: this.couponList[index].id,
					price: this.couponList[index].discountAmount
				})
				this.$close()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #EFF0F3;
	}

	.box {
		width: 33%;
		text-align: center;
		padding: 30rpx 0rpx;
	}

	.acSelect {
		color: #5A7EFF;

		font-size: 28rpx;
	}

	.Select {
		color: #999999;
		font-size: 28rpx;
	}

	.blueLine {
		height: 8rpx;
		width: 40rpx;
		background-color: #5A7EFF;
		margin: auto;
	}

	.flexBox {
		display: flex;
		align-items: center;
		justify-content: center;
	}


	@import '@/static/scss/_mixin.scss';

	.coupon-center {
		.list {
			padding: 40rpx;

			.coupon {
				position: relative;
				@include box(668rpx, 196rpx);

				.bg {
					@include square();
				}

				.mask {
					position: absolute;
					left: 0;
					top: 0;
					z-index: 1;
					@include square();
					@include flex-row();
					padding-left: 50rpx;

					.info {
						@include box(537rpx, 100%);
						@include flex-row();

						&.is-get {
							color: #FECF65;
						}

						&.no-get {
							color: #DEDEDE;
						}

						.price {
							font-size: 32rpx;
							font-weight: 500;

							text {
								font-size: 92rpx;
								line-height: 128rpx;
							}
						}
					}

					.description {
						margin-left: 30rpx;

						.text {
							font-size: 44rpx;
							line-height: 62rpx;
							font-weight: 700;
						}

						.time {
							font-size: 20rpx;
							font-weight: 700;
							line-height: 28rpx;
							margin-top: 6rpx;
						}
					}

					.btn {
						position: absolute;
						right: 32rpx;
						top: 50%;
						transform: translateY(-50%);
						@include box(72rpx, 132rpx);

						.btn-bg {
							@include square();
						}

						.text {
							position: absolute;
							left: 50%;
							top: 50%;
							transform: translateX(-50%) translateY(-50%) scaleY(0.9);
							z-index: 1;
							@include box-w(24rpx);
							@include font-set(24rpx, #fff, 500);
						}
					}
				}

				&~.coupon {
					margin-top: 40rpx;
				}
			}
		}
	}
</style>
