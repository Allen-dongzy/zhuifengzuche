<template>
	<view class="store-comment">
		<view class="title">评价(<text>123</text>条)</view>
		<view class="list">
			<view class="item" v-for="(item, index) in 10" :key="index">
				<view class="info">
					<image class="pic"
						src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn.duitang.com%2Fuploads%2Fitem%2F201307%2F03%2F20130703071814_c2Jwj.jpeg&refer=http%3A%2F%2Fcdn.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1626835660&t=ddb718654293d40cf17d7ba2c12682ed"
						mode="aspectFill"></image>
					<view class="description">
						<view class="caption">隔壁老*</view>
						<view class="star-box">
							<image class="star" :src="`${ossUrl}/home/icon-star.png`" v-for="(inner, sub) in 3"
								:key="sub"></image>
						</view>
					</view>
					<view class="time">2021-05-18</view>
				</view>
				<view class="commit">服务特别好，牛逼plus!</view>
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
				& ~ .item {
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
