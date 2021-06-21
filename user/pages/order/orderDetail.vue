<template>
	<view class="order-detail">
		<view class="top-panel">
			<view class="statu-bar">
				<view class="status">等待送车</view>
				<view class="refresh">
					<image :src="`${ossUrl}/order/refresh.png`"></image>刷新
				</view>
			</view>
			<view class="info">30分29秒 后订单将自动取消</view>
			<view class="bottom">
				<view class="btn-box">
					<view class="btn white">取消订单</view>
					<view class="btn blue">立即支付</view>
				</view>
				<view class="contact">
					<image class="phone" :src="`${ossUrl}/common/phone-big.png`"></image>
					联系店面
				</view>
			</view>
		</view>
		<view class="order-card">
			<view class="info">
				<image class="picture"
					src="https://youjia-image.cdn.bcebos.com/seriesImage/158738183449412be5bb.png@!w_600_fp"
					mode="aspectFill"></image>
				<view class="description">
					<view class="name">大众迈腾</view>
					<view class="params">自动挡丨5座丨2.0L</view>
					<view class="type">92#汽油</view>
				</view>
			</view>
			<view class="order-caption">租期</view>
			<view class="order-header">
				<view class="left">
					<view class="caption">5月13日</view>
					<view class="sub-caption">周四14:00</view>
				</view>
				<view class="title">
					<view class="left-arrow"></view>
					<view class="info">共8天</view>
					<view class="right-arrow"></view>
				</view>
				<view class="right">
					<view class="caption">5月13日</view>
					<view class="sub-caption">周四14:00</view>
				</view>
			</view>
			<view class="address">
				<view class="label">取还</view>
				郑家院子东路8号
			</view>
		</view>

		<view class="info-card-1">
			<view class="order-item">
				<view class="left">
					<view class="top">
						驾无忧保障<image class="question" :src="`${ossUrl}/order/question.png`"></image>
						<view class="price">￥20/天</view>
					</view>
					<view class="bottom">添加一份无忧保障，添一份安心</view>
				</view>
				<view class="right">￥60</view>
			</view>
			<view class="order-item">
				<view class="left">优惠券</view>
				<view class="right">-￥60</view>
			</view>
			<view class="order-item">
				<view class="left">
					<view class="cost">
						总计
						<text>费用明细</text>
						<view class="arrow"></view>
					</view>
				</view>
				<view class="right">￥60</view>
			</view>
		</view>

		<view class="info-card-2">
			<view class="order-item">
				<view class="left">订单号</view>
				<view class="right">5556986997645634</view>
			</view>
			<view class="order-item" @click="openTimePopup">
				<view class="left">下单时间</view>
				<view class="right">2021-06-08 18:12:30<view class="arrow"></view>
				</view>
			</view>
			<view class="order-item">
				<view class="left">租车押金</view>
				<view class="right">￥800</view>
			</view>
			<view class="order-item">
				<view class="left">押金免押状态</view>
				<view class="right">未免押</view>
			</view>
			<view class="order-item">
				<view class="left">支付方式</view>
				<view class="right">取车时支付</view>
			</view>
			<view class="order-item">
				<view class="left">
					<view class="top">订单备注</view>
					<view class="bottom margin">这里是订单备注</view>
				</view>
				<view class="right"></view>
			</view>
		</view>
		<!-- 弹窗-时间 -->
		<uni-popup ref="timePopup" type="center">
			<view class="time-modal">
				<view class="m-item">
					<view class="caption">订单提交</view>
					<view class="time">12-09 15:23</view>
				</view>
				<view class="m-item">
					<view class="caption">订单时间</view>
					<view class="time">12-09 15:23</view>
				</view>
				<view class="btn" @click="closeTimePopup">关闭</view>
			</view>
		</uni-popup>
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
			// 打开时间模态框
			openTimePopup() {
				this.$refs.timePopup.open()
			},
			// 关闭时间模态框
			closeTimePopup() {
				this.$refs.timePopup.close()
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	page {
		background-color: #EFF0F3;
	}

	.order-detail {
		.top-panel {
			@include box-w(100%, #fff);
			padding: 40rpx;

			.statu-bar {
				@include flex-row(space-between);

				.status {
					@include font-set(28rpx, #5A7EFF, 700);
					line-height: 40rpx;
				}

				.refresh {
					@include flex-row();

					image {
						@include square(40rpx);
					}

					@include font-set(24rpx, #999, 500);
					line-height: 36rpx;
				}

				margin-bottom: 58rpx;
			}

			.info {
				@include font-set(36rpx, #000, 700);
				line-height: 50rpx;
			}

			.bottom {
				@include flex-row(space-between);
				margin-top: 56rpx;

				.btn-box {
					@include flex-row();

					.btn {
						@include box(136rpx, 60rpx);
						@include flex-center;
						border-radius: 12rpx;
						font-size: 24rpx;

						&~.btn {
							margin-left: 30rpx;
						}

						&.white {
							background-color: #fff;
							border: 1px solid #5A7EFF;
							color: #5A7EFF;
						}

						&.blue {
							background-color: #5A7EFF;
							color: #fff;
						}
					}
				}

				.contact {
					@include flex-row();

					@include font-set(24rpx, #FFA05B, 500);
					line-height: 36rpx;

					.phone {
						@include square(32rpx);
						margin-right: 10rpx;
					}
				}
			}
		}

		.order-card {
			@include box-w(100%, #fff);
			padding: 40rpx 32rpx;
			margin-top: 20rpx;

			.info {
				@include flex-row();

				.picture {
					@include box(204rpx, 128rpx);
				}

				.description {
					margin-left: 38rpx;

					.name {
						@include font-set(28rpx, #000, 500);
						line-height: 40rpx;
					}

					.params {
						@include font-set(20rpx, #999);
						line-height: 28rpx;
						margin-top: 12rpx;
					}

					.type {
						@include font-set(20rpx, #999);
						line-height: 28rpx;
						margin-top: 16rpx;
					}
				}
			}

			.order-caption {
				@include font-set(32rpx, #000, 700);
				line-height: 44rpx;
				margin-top: 40rpx;
			}

			.order-header {
				@include flex-row(space-between);
				padding-top: 20rpx;

				.left,
				.right {
					@include flex-col();

					.caption {
						@include font-set(28rpx, #000, 700);
						line-height: 36rpx;
					}

					.sub-caption {
						@include font-set(24rpx, #999);
						line-height: 34rpx;
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

			.address {
				@include flex-row();
				margin-top: 42rpx;

				.label {
					@include font-set(32rpx, #5A7EFF, 700);
					line-height: 44rpx;
					margin-right: 30rpx;
				}

				@include font-set(28rpx, #000);
				line-height: 40rpx;
			}
		}

		.info-card-1,
		.info-card-2 {
			background-color: #fff;
			padding: 0 32rpx;
			margin-top: 20rpx;

			.order-item {
				@include flex-row(space-between);
				padding: 40rpx 0;

				&~.order-item {
					border-top: 1px solid #EFF0F3;
				}

				.left {
					@include font-set(28rpx, #000, 500);
					line-height: 40rpx;

					.cost {
						@include flex-row();

						text {
							@include font-set(24rpx, #999);
							margin-left: 10rpx;
						}

						.arrow {
							@include square(14rpx);
							border: 1px solid #999;
							border-left: 0;
							border-bottom: 0;
							transform: rotate(135deg) translateY(6rpx);
							margin-left: 16rpx;
						}
					}

					.top {
						@include flex-row();

						.question {
							@include square(26rpx);
							margin-left: 16rpx;
						}

						.price {
							@include font-set(24rpx, #999);
							margin-left: 30rpx;
						}
					}

					.bottom {
						@include font-set(24rpx, #999);
						line-height: 34rpx;
						margin-top: 10rpx;

						&.margin {
							margin-top: 20rpx;
						}
					}
				}

				.right {
					@include flex-row();
					@include font-set(28rpx, #999, 700);
					line-height: 40rpx;

					.arrow {
						@include square(14rpx);
						border: 1px solid #999;
						border-left: 0;
						border-bottom: 0;
						transform: rotate(45deg) translateY(-4rpx);
						margin-left: 6rpx;
					}
				}
			}
		}

		.info-card-2 {
			padding-bottom: 40rpx;

			.right {
				font-weight: 400 !important;
			}
		}

		.time-modal {
			@include box-w(608rpx, #fff);
			padding-top: 40rpx;

			.m-item {
				@include flex-row(space-between);
				padding: 0 40rpx;

				&~.m-item {
					margin-top: 30rpx;
				}

				.caption {
					@include font-set(28rpx, #000);
					line-height: 40rpx;
				}

				.time {
					@include font-set(24rpx, #999);
					line-height: 34rpx;
				}
			}

			.btn {
				@include box(100%, 124rpx);
				@include flex-center;
				@include font-set(32rpx, #5A7EFF, 500);
				border-top: 1px solid #EFF0F3;
				margin-top: 40rpx;
			}
		}
	}
</style>
