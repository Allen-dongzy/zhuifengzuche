<template>
	<view class="advance-detail">
		<image class="bg" :src="`${ossUrl}/common/res-success.png`" mode="aspectFill"></image>
		<view class="list">
			<view class="item">
				<view class="caption">租车押金</view>
				<view class="value">￥60</view>
			</view>
			<view class="item">
				<view class="caption">交易时间</view>
				<view class="value">2021-05-26 11:01</view>
			</view>
			<view class="item">
				<view class="caption">经办人</view>
				<view class="value">王小明</view>
			</view>
		</view>
		<view class="bar"></view>
		<view class="list">
			<view class="item">
				<view class="caption">退款</view>
				<view class="value">￥3000</view>
			</view>
			<view class="item">
				<view class="caption">当前冻结</view>
				<view class="value">￥1000</view>
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

	.advance-detail {
		@include flex-col(flex-start);
		padding-top: 60rpx;

		.bg {
			@include box(400rpx, 252rpx);
		}

		.list {
			@include box-w();
			margin-top: 20rpx;
			padding: 0 32rpx;

			.item {
				@include box(100%, 118rpx);
				@include flex-row(space-between);

				.caption {
					@include font-set(28rpx, #000, 500);
					line-height: 40rpx;
				}

				.value {
					@include font-set(28rpx, #999, 700);
					line-height: 40rpx;
				}

				&~.item {
					border-top: 1px solid #EFF0F3;
				}
			}
		}

		.bar {
			@include box(100%, 20rpx, #EFF0F3);
		}
	}
</style>
