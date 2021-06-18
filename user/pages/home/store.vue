<template>
	<view class="store">
		<view class="address-title">
			<view class="caption">滨江路皇冠大道送车点</view>
			<view class="address">
				<image class="icon-location" :src="`${ossUrl}/home/location-big.png`"></image>
				<text>滨江路皇冠大道送车点</text>
				<view class="arrow"></view>
			</view>
		</view>
		<view class="bg-bar"></view>
		<view class="list">
			<view class="caption">有<text>2</text>个门店入住该地点</view>
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
						<image class="btn" :src="`${ossUrl}/home/location-big.png`"></image>
						<image class="btn" :src="`${ossUrl}/common/phone-big.png`"></image>
					</view>
				</view>
				<view class="info">
					<view class="bar">
						<image class="icon" :src="`${ossUrl}/home/icon-time.png`"></image>
						<text class="description">营业时间：8:00-21:00</text>
					</view>
					<view class="bar">
						<image class="icon" :src="`${ossUrl}/home/icon-phone.png`"></image>
						<text class="description">电话号码：<text>18888888888</text></text>
					</view>
					<view class="bar">
						<image class="icon" :src="`${ossUrl}/home/icon-message.png`"></image>
						<text class="description">评论：123条</text>
						<view class="arrow"></view>
					</view>
					<view class="bar">
						<image class="icon" :src="`${ossUrl}/home/icon-home-black.png`"></image>
						<text class="description">门店地址：<text>郑家院子东路8号</text></text>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-mat"></view>
		<view class="bottom">
			<view class="btn">选择该地点</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
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
