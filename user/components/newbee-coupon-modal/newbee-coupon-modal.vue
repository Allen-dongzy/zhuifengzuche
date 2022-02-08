<template>
	<view>
		<!-- 弹窗-领券 -->
		<uni-popup ref="couponPopup" type="center" :maskClick="false">
			<view class="coupon-modal">
				<image class="bg" :src="`${ossUrl}/home/coupon-bg.png`" mode="aspectFill"></image>
				<view class="box">
					<image class="caption" :src="`${ossUrl}/home/coupon-title.png`" mode="aspectFill"></image>
					<view class="title">恭喜您，获得{{ couponList.length }}张优惠券</view>
					<scroll-view class="coupon-content" :scroll-y="true">
						<view class="coupon-box" v-for="(item, index) in couponList" :key="index">
							<view class="coupon">
								<image class="bg" :src="`${ossUrl}/home/is-get-bg.png`" mode="aspectFill"></image>
								<view class="mask">
									<view class="info is-get">
										<view class="price">
											￥
											<text>{{ item.discountAmount }}</text>
										</view>
										<view class="description">
											<view class="text">{{ item.couponTitle }}</view>
											<view class="time">到期时间：{{ item.closeTime ? item.closeTime.split(' ')[0] : '' }}</view>
										</view>
									</view>
									<view class="btn">
										<image class="btn-bg" :src="`${ossUrl}/home/is-get-btn.png`" mode="aspectFill"></image>
										<view class="text">领取</view>
									</view>
								</view>
							</view>
						</view>
					</scroll-view>
					<view class="coupon-btn" @click="oneClickReceiveNewCoupons">一键领取</view>
					<image class="coupon-close" :src="`${ossUrl}/home/coupon-close.png`" mode="aspectFill" @click="closeCouponPopup"></image>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { findNewCoupon, oneClickReceiveNewCoupons } from '@/apis/coupon'
import { throttle } from '@/utils/tools'

export default {
	name: 'newbee-coupon-modal',
	data() {
		return {
			ossUrl: this.$ossUrl, // oss
			couponList: []
		}
	},
	props: {
		// 类型
		type: {
			type: Number,
			default: 1
		},
		// 金额
		price: {
			type: Number,
			default: null
		}
	},
	methods: {
		// 获取新人优惠券
		async findNewCoupon() {
			const params = {
				type: this.type
			}
			if (this.price) params.price = this.price
			const [err, res] = await findNewCoupon(params)
			if (err) return
			this.couponList = res.data.list
			if (res.data.count > 0) this.openCouponPopup()
		},
		// 一键领取新人券
		oneClickReceiveNewCoupons: throttle(async function() {
			const [err, res] = await oneClickReceiveNewCoupons()
			if (err) return
			this.$toast('领取成功')
			this.closeCouponPopup()
		}),
		// 打开领券弹窗
		openCouponPopup() {
			this.$refs.couponPopup.open()
		},
		// 关闭领券弹窗
		closeCouponPopup() {
			this.$refs.couponPopup.close()
		}
	}
}
</script>

<style lang="scss">
@import '@/static/scss/_mixin.scss';

.coupon-modal {
	position: relative;
	@include box(556rpx, 750rpx);
	border-radius: 30rpx;
	transform: translateY(50rpx);

	.bg {
		@include square();
		display: block;
	}

	.box {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		@include square();
		padding: 33rpx 55rpx;
		@include flex-col(flex-start);

		.caption {
			@include top(-214rpx);
			@include box-b(316rpx, 216rpx);
		}

		.title {
			font-size: 40rpx;
			font-weight: 500;
			@include font-gradient(180deg, #ffee38, #ffffff);
		}

		.coupon-content {
			@include box(100%, 430rpx);
			@include flex-col(flex-start);
			margin-top: 64rpx;

			.coupon-box {
				@include box(442rpx, 130rpx);

				& ~ .coupon-box {
					margin-top: 20rpx;
				}

				.coupon {
					position: relative;
					@include box(668rpx, 196rpx);
					transform: scale(0.67);
					transform-origin: top left;

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
						box-sizing: border-box;
						padding-left: 30rpx;
						padding-right: 80rpx;

						.info {
							@include box(460rpx, 100%);
							@include flex-row(space-between);

							&.is-get {
								color: #fecf65;
							}

							&.no-get {
								color: #dedede;
							}

							.price {
								@include font-set(32rpx, #fff, 500);

								text {
									@include font-set(74rpx, #fff);
									line-height: 128rpx;
								}
							}
						}

						.description {
							margin-left: 15rpx;

							.text {
								font-size: 44rpx;
								line-height: 62rpx;
								font-weight: 700;
							}

							.time {
								font-size: 24rpx;
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
				}
			}
		}

		.coupon-btn {
			@include bottom(40rpx);
			@include box(420rpx, 88rpx, linear-gradient(180deg, #fdf083 0%, #febc02 100%));
			border-radius: 10rpx;
			@include flex-center;
			@include font-set(28rpx, #fd1f30, 700);
		}

		.coupon-close {
			@include bottom(-100rpx);
			@include circle(65rpx);
		}
	}
}
</style>
