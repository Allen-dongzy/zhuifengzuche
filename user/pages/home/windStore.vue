<template>
	<view class="wind-store">
		<view class="store-card" v-for="(item, index) in 5" :key="index">
			<view class="head">
				<view class="base-info">
					<image class="logo" :src="`${ossUrl}/common/cache-logo.png`"></image>
					<view class="title-box">
						<view class="store-caption">郑家院子1号店</view>
						<view class="star-box">
							<image class="star" :src="`${ossUrl}/home/icon-star.png`" v-for="(item, index) in 4"
								:key="index"></image>
						</view>
					</view>
				</view>
				<view class="btn-group">
					<image class="btn" :src="`${ossUrl}/common/location-big.png`" @click="openMap"></image>
					<image class="btn" :src="`${ossUrl}/common/phone-big.png`" @click="phoneCall"></image>
				</view>
			</view>
			<view class="info">
				<view class="bar">
					<image class="icon" :src="`${ossUrl}/common/icon-time.png`"></image>
					<view class="description">营业时间：8:00-21:00</view>
				</view>
				<view class="bar">
					<image class="icon" :src="`${ossUrl}/home/icon-phone.png`"></image>
					<view class="description">电话号码：<text @click="phoneCall">18888888888</text></view>
				</view>
				<view class="bar">
					<image class="icon" :src="`${ossUrl}/home/icon-message.png`"></image>
					<view class="description" @click="$open('/pages/home/storeComment')">评论：123条</view>
					<view class="arrow" @click="$open('/pages/home/storeComment')"></view>
				</view>
				<view class="bar">
					<image class="icon" :src="`${ossUrl}/common/icon-home-black.png`"></image>
					<view class="description">门店地址：<text @click="openMap">郑家院子东路8号</text></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
			}
		},
		methods: {
			// 打电话
			phoneCall() {
				uni.makePhoneCall({
					phoneNumber: '17623178041'
				})
			},
			// 打开地图
			async openMap() {
				// 获取位置
				const [err, res] = await await uni.getLocation({
					type: 'gcj02'
				})
				const latitude = res.latitude
				const longitude = res.longitude
				// 打开位置
				uni.openLocation({
					latitude,
					longitude
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
</style>
