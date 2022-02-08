<template>
	<view class="store-comment">
		<view class="title">评价(<text>{{total}}</text>条)</view>
		<view class="list">
			<view class="item" v-for="(item, index) in list" :key="index">
				<view class="info">
					<image class="pic"
						src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201307%2F03%2F20130703071814_c2Jwj.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626835660&t=ddb718654293d40cf17d7ba2c12682ed"
						mode="aspectFill"></image>
					<view class="description">
						<view class="caption">{{item.customInfoName}}</view>
						<view class="star-box">
							<image v-for="(inner, sub) in item.starCode" :key="sub" class="star"
								:src="`${ossUrl}/common/icon-star.png`" mode="aspectFill"></image>
						</view>
					</view>
					<view class="time">{{item.createTime ? item.createTime.split(' ')[0] : ''}}</view>
				</view>
				<view class="commit">{{item.evaluationDetails}}</view>
			</view>
		</view>
		<uni-load-more :status="dataStatus" />
	</view>
</template>

<script>
	import {
		shopEvaluatePageQueryById,
		shopEvaluatePageQuery
	} from '../../apis/shop'
	import {
		listManager
	} from '@/utils/uni-tools'
	import {
		mapState
	} from 'vuex'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				page: 1,
				size: 10,
				list: [],
				requestKey: true,
				total: 0,
				dataStatus: '', // more loading noMore noData
				id: ''
			}
		},
		computed: {
			// app 平台
			...mapState('app', ['platform'])
		},
		onLoad(e) {
			if (e && e.id) this.id = e.id
			if (e && e.orderId) this.orderId = e.orderId
			if (this.orderId) this.shopEvaluatePageQuery()
			else this.shopEvaluatePageQueryById()
		},
		//下拉刷新
		onPullDownRefresh() {
			this.init()
			if (this.orderId) this.shopEvaluatePageQuery('refresh')
			else this.shopEvaluatePageQueryById('refresh')
		},
		onReachBottom(e) {
			if (!this.requestKey) return
			this.page++
			if (this.orderId) this.shopEvaluatePageQuery()
			else this.shopEvaluatePageQueryById()
		},
		methods: {
			// 初始化
			init() {
				this.page = 1
				this.requestKey = true
				this.list = []
			},
			// 请求列表
			async shopEvaluatePageQueryById(refresh) {
				this.dataStatus = 'loading'
				let data = {
					memberShopId: this.id,
					page: this.page,
					size: this.size
				}
				const [err, res] = await shopEvaluatePageQueryById(data)
				if (refresh === 'refresh') uni.stopPullDownRefresh()
				if (err) return
				this.total = res.data.total
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.requestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.list = [...this.list, ...res.data.list]
			},
			// 订单id请求列表
			async shopEvaluatePageQuery(refresh) {
				this.dataStatus = 'loading'
				let data = {
					memberShopId: this.id,
					orderId: this.orderId,
					page: this.page,
					size: this.size
				}
				const [err, res] = await shopEvaluatePageQuery(data)
				if (refresh === 'refresh') uni.stopPullDownRefresh()
				if (err) return
				this.total = res.data.total
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data.list, this.page, this.size)
				this.requestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.list = [...this.list, ...res.data.list]
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.store-comment {
		padding: 18rpx 32rpx;

		.title {
			@include font-set(32rpx, #000, 700);
			line-height: 44rpx;
		}

		.list {
			.item {
				@include box-w();
				@include flex-col();
				padding-top: 48rpx;
				padding-bottom: 48rpx;

				&~.item {
					border-top: 1px solid #EFF0F3;
				}

				.info {
					@include box-w();
					@include flex-row(flex-start, flex-start);

					.pic {
						@include square(64rpx);
						margin-top: 6rpx;
					}

					.description {
						@include box-w(440rpx);
						margin-left: 20rpx;

						.caption {
							@include font-set(28rpx, #000, 700);
							@include text-one;
							line-height: 40rpx;
							padding-right: 20rpx;
						}

						.star-box {
							@include flex-row();
							margin-top: 8rpx;

							.star {
								@include square(25rpx);

								&~.star {
									margin-left: 7rpx;
								}
							}
						}
					}

					.time {
						@include font-set(24rpx, #B2B2B2, 700);
						flex-grow: 1;
						text-align: right;
						line-height: 34rpx;
						margin-top: 4rpx;
					}
				}

				.commit {
					align-self: flex-end;
					margin-top: 34rpx;
					@include box-w(600rpx);
					@include font-set(28rpx, #000, 700);
					@include text-both;
					line-height: 40rpx;
				}
			}
		}
	}
</style>
