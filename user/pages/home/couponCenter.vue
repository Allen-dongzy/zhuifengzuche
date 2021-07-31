<template>
	<view class="coupon-center">
		<view class="list">
			<view class="coupon" v-for="(item, index) in 10" :key="index">
				<image class="bg" v-if="index%2===0" :src="`${ossUrl}/home/is-get-bg.png`" mode="aspectFill"></image>
				<image class="bg" v-if="index%2!==0" :src="`${ossUrl}/home/no-get-bg.png`" mode="aspectFill"></image>
				<view class="mask">
					<view :class="['info', {'is-get': index%2===0}, {'no-get': index%2!==0}]">
						<view class="price">￥<text>50</text></view>
						<view class="description">
							<view class="text">新用户专享</view>
							<view class="time">到期时间：2021/05/27</view>
						</view>
					</view>
					<view class="btn">
						<image class="btn-bg" v-if="index%2===0" :src="`${ossUrl}/home/is-get-btn.png`" mode="aspectFill"></image>
						<image class="btn-bg" v-if="index%2!==0" :src="`${ossUrl}/home/no-get-btn.png`" mode="aspectFill"></image>
						<view class="text">{{ index%2===0 ? '领取' : '已领取' }}</view>
					</view>
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
		}
	}
</script>

<style lang="scss">
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
