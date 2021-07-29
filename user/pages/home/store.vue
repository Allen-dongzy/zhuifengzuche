<template>
	<view class="store">
		<view class="address-title">
			<view class="caption">{{name}}</view>
			<view class="address" @click="openMap(-1)">
				<image class="icon-location" :src="`${ossUrl}/common/location-big.png`"></image>
				<text>{{address}}</text>
				<view class="arrow"></view>
			</view>
		</view>
		<view class="bg-bar"></view>
		<view class="list">
			<view class="caption">有<text>{{list.length}}</text>个门店入住该地点</view>
			<view class="store-card" v-for="(item, index) in list" :key="index">
				<view class="head">
					<view class="base-info">
						<image class="logo" :src="item.shopImages"></image>
						<view class="title-box">
							<view class="store-caption">{{item.name}}</view>
							<view class="star-box">
								<image class="star" :src="`${ossUrl}/common/icon-star.png`"
									v-for="(item, index) in starCode" :key="index"></image>
							</view>
						</view>
					</view>
					<view class="btn-group">
						<image class="btn" :src="`${ossUrl}/common/location-big.png`" @click="openMap(index)"></image>
						<image class="btn" :src="`${ossUrl}/common/phone-big.png`" @click="phoneCall(index)"></image>
					</view>
				</view>
				<view class="info">
					<view class="bar">
						<image class="icon" :src="`${ossUrl}/common/icon-time.png`"></image>
						<view class="description">营业时间：{{item.beginTime || '暂无'}}-{{item.endTime || '暂无'}}
						</view>
					</view>
					<view class="bar">
						<image class="icon" :src="`${ossUrl}/home/icon-phone.png`"></image>
						<view class="description">电话号码：<text @click="phoneCall(index)">{{item.memberPhone}}</text>
						</view>
					</view>
					<view class="bar">
						<image class="icon" :src="`${ossUrl}/home/icon-message.png`"></image>
						<view class="description" @click="$open('/pages/common/storeComment', {id: item.id})">
							评论：{{item.evaluationNumber || 0}}条</view>
						<view class="arrow" @click="$open('/pages/common/storeComment', {id: item.id})"></view>
					</view>
					<view class="bar">
						<image class="icon" :src="`${ossUrl}/common/icon-home-black.png`"></image>
						<view class="description">门店地址：<text @click="openMap(index)">{{item.memberAddress}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="dataStatus" />
		<view class="bottom-mat"></view>
		<view class="bottom">
			<view class="btn" @click="selAddress">选择该地点</view>
		</view>
	</view>
</template>

<script>
	import {
		deliveryFindShop
	} from '@/apis/delivery'
	import {
		listManager
	} from '@/utils/uni-tools'

	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				deliveryId: '',
				name: '',
				address: '',
				lat: '',
				lon: '',
				list: [],
				page: 1,
				size: 10,
				requestKey: true,
				dataStatus: '', // more loading noMore noData
				cacheAddressMode: '',
				cacheAddress: ''
			}
		},
		onLoad(e) {
			if (e && e.deliveryId) this.deliveryId = e.deliveryId
			if (e && e.name) this.name = e.name
			if (e && e.address) this.address = e.address
			if (e && e.lat) this.lat = e.lat
			if (e && e.lon) this.lon = e.lon
			if (e && e.cacheAddressMode) this.cacheAddressMode = e.cacheAddressMode
			if (e && e.cacheAddress) this.cacheAddress = e.cacheAddress
			this.deliveryFindShop()
		},
		onReachBottom() {
			if (!this.requestKey) return
			this.page++
			this.deliveryFindShop()
		},
		methods: {
			// 根据送车点查询门店列表
			async deliveryFindShop() {
				const params = {
					deliveryId: this.deliveryId
				}
				const [err, res] = await deliveryFindShop(params)
				if (err) {
					if (this.page > 1) this.dataStatus = 'noMore'
					else if (this.page === 1) this.dataStatus = 'noData'
					this.requestKey = false
					return
				}
				const {
					requestKey,
					dataStatus,
					isRender
				} = listManager(res.data, this.page, this.size)
				this.requestKey = requestKey
				this.dataStatus = dataStatus
				if (!isRender) return
				this.list = [...this.list, ...res.data]
			},
			// 打电话
			phoneCall(index) {
				uni.makePhoneCall({
					phoneNumber: this.list[index].memberPhone
				})
			},
			// 打开地图
			openMap(index) {
				let latitude = ''
				let longitude = ''
				if (index >= 0) {
					latitude = Number(this.list[index].lat)
					longitude = Number(this.list[index].lon)
				} else {
					latitude = Number(this.lat)
					longitude = Number(this.lon)
				}
				uni.openLocation({
					latitude,
					longitude
				})
			},
			// 选择地点
			selAddress() {
				uni.$emit('checkAddress', {
					addressMode: this.cacheAddressMode,
					address: this.cacheAddress
				})
				this.$close(2)
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.store {
		.address-title {
			@include box(100%, 122rpx, #fff);
			padding: 18rpx 32rpx;

			.caption {
				@include font-set(32rpx, #000, 700);
				line-height: 44rpx;
			}

			.address {
				@include flex-row();
				margin-top: 2rpx;

				.icon-location {
					@include square(28rpx);
				}

				text {
					@include font-set(28rpx, #B2B2B2);
					line-height: 40rpx;
					margin-left: 10rpx;
				}

				.arrow {
					@include square(14rpx);
					border: 1px solid #999;
					transform: rotate(45deg);
					border-bottom: 0;
					border-left: 0;
					margin-left: 6rpx;
				}
			}
		}

		.bg-bar {
			@include box(100%, 20rpx, #EFF0F3);
		}

		.list {
			@include box-w();
			padding: 40rpx 32rpx;

			.caption {
				@include font-set(32rpx, #000, 700);

				text {
					color: #5A7EFF;
					margin: 0 2rpx;
				}

				padding-bottom: 10rpx;
			}

			.store-card {
				@include box(670rpx, 468rpx, #fff);
				border-radius: 20rpx;
				box-shadow: 0 0 8rpx 0 rgba(114, 141, 244, 0.25);
				padding: 44rpx 40rpx 40rpx;
				margin-top: 30rpx;

				.head {
					@include box(100%, 126rpx);
					@include flex-row(space-between, flex-start);
					border-bottom: 1px dashed #B2B2B2;

					.base-info {
						@include flex-row();

						.logo {
							@include square(80rpx);
						}

						.title-box {
							margin-left: 20rpx;

							.store-caption {
								@include font-set(32rpx, #000, 700);
								line-height: 40rpx;
							}

							.star-box {
								margin-top: 8rpx;
								@include flex-row();

								.star {
									@include square(24rpx);

									&~.star {
										margin-left: 8rpx;
									}
								}
							}
						}
					}

					.btn-group {
						@include flex-row();
						margin-top: 22rpx;

						.btn {
							@include circle(44rpx);

							&~.btn {
								margin-left: 30rpx;
							}
						}
					}
				}

				.info {
					padding-top: 38rpx;

					.bar {
						@include flex-row();

						&~.bar {
							margin-top: 20rpx;
						}

						.icon {
							@include square(28rpx);
						}

						.description {
							@include font-set(28rpx, #000);
							line-height: 40rpx;
							margin-left: 20rpx;

							text {
								color: #5A7EFF;
							}
						}

						.arrow {
							@include square(14rpx);
							border: 1px solid #000;
							transform: rotate(45deg);
							border-bottom: 0;
							border-left: 0;
							margin-left: 6rpx;
						}
					}
				}
			}
		}

		.bottom-mat {
			height: 186rpx;
		}

		.bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			@include box-w(100%, #fff);
			padding: 30rpx 0 60rpx;

			.btn {
				@include box(670rpx, 96rpx, #5A7EFF);
				@include flex-center;
				@include font-set(32rpx, #fff, 700);
				border-radius: 52rpx;
				margin: 0 auto;
			}
		}
	}
</style>
