<template>
	<view class="wind-store">
		<view class="store-card" v-for="(item, index) in list" :key="index">
			<view class="head">
				<view class="base-info">
					<image class="logo" :src="item.shopImages" mode="aspectFill"></image>
					<view class="title-box">
						<view class="store-caption">{{item.name}}</view>
						<view class="star-box">
							<image class="star" :src="`${ossUrl}/common/icon-star.png`" mode="aspectFill"
								v-for="(item, index) in 4" :key="index"></image>
						</view>
					</view>
				</view>
				<view class="btn-group">
					<image class="btn" :src="`${ossUrl}/common/location-big.png`" mode="aspectFill"
						@click="openMap(item.lat, item.lon, item.name, item.memberAddress)">
					</image>
					<image class="btn" :src="`${ossUrl}/common/phone-big.png`" mode="aspectFill"
						@click="phoneCall(item.memberPhone)">
					</image>
				</view>
			</view>
			<view class="info">
				<view class="bar">
					<image class="icon" :src="`${ossUrl}/common/icon-time.png`" mode="aspectFill"></image>
					<view class="description">营业时间：{{item.beginTime || '暂无'}}-{{item.endTime || '暂无'}}</view>
				</view>
				<view class="bar">
					<image class="icon" :src="`${ossUrl}/home/icon-phone.png`" mode="aspectFill"></image>
					<view class="description">电话号码：<text
							@click="phoneCall(item.memberPhone)">{{item.memberPhone}}</text></view>
				</view>
				<view class="bar">
					<image class="icon" :src="`${ossUrl}/home/icon-message.png`" mode="aspectFill"></image>
					<view class="description" @click="$open('/pages/common/storeComment?id='+item.id)">
						评论：{{item.evaluationNumber}}条</view>
					<view class="arrow" @click="$open('/pages/common/storeComment')"></view>
				</view>
				<view class="bar">
					<image class="icon" :src="`${ossUrl}/common/icon-home-black.png`" mode="aspectFill"></image>
					<view class="description">门店地址：<text
							@click="openMap(item.lat, item.lon, item.name, item.memberAddress)">{{item.memberAddress}}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		memberShopPageQuery
	} from '../../apis/memberShop.js'
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				page: 1,
				size: 10,
				list: []
			}
		},
		onLoad() {
			this.memberShopPageQuery()
		},
		methods: {
			async memberShopPageQuery() {
				let data = {
					page: this.page,
					size: this.size
				}
				const [err, res] = await memberShopPageQuery()
				if (err) return
				if (res.data.list.length == 0) {

				} else {
					for (let i = 0; i < res.data.list.length; i++) {
						this.list.push(res.data.list[i])
					}
				}
			},
			// 打电话
			phoneCall(e) {
				uni.makePhoneCall({
					phoneNumber: e
				})
			},
			// 打开地图
			async openMap(latitude, longitude, name, address) {
				const [err, res] = await uni.openLocation({
					latitude: Number(latitude),
					longitude: Number(longitude),
					name: name || '门店名称',
					address: address || '门店地址',
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.wind-store {
		padding: 40rpx;

		.store-card {
			@include box-w(670rpx, #fff);
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
						@include square(80rpx, #ddd);
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
						max-width: 540rpx;
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
</style>
