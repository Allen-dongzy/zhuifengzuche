<template>
	<view class="depositReceived">
		<image class="bg" :src="`${ossUrl}/common/res-success.png`"></image>
		<view class="group">
			<view class="item">
				<view class="caption">租车押金</view>
				<view class="value">￥{{payTheVoucherRentalCarDeposit}}</view>
			</view>
			<view class="item">
				<view class="caption">交易时间</view>
				<view class="value">{{payTheVoucherRentalCarDeposit}}</view>
			</view>
			<view class="item">
				<view class="caption">经办人</view>
				<view class="value">{{paymentVoucherHandler}}</view>
			</view>
		</view>
		<view v-show="false" class="bar"></view>
		<view v-show="false" class="group">
			<view class="item ">
				<view class="caption">退款</view>
				<view class="value">￥3000</view>
			</view>
			<view class="item line">
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
				payTheVoucherRentalCarDeposit: '',
				paymentVoucherHandler: '',
				paymentVoucherTransactionTime: ''
			}
		},
		onLoad(e) {
			if (e && e.payTheVoucherRentalCarDeposit) this.payTheVoucherRentalCarDeposit = e.payTheVoucherRentalCarDeposit
			if (e && e.paymentVoucherHandler) this.paymentVoucherHandler = e.paymentVoucherHandler
			if (e && e.paymentVoucherTransactionTime) this.paymentVoucherTransactionTime = e.paymentVoucherTransactionTime
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.depositReceived {
		padding-top: 60rpx;
		@include flex-col(flex-start);

		.bg {
			@include box(400rpx, 252rpx);
			margin-top: 60rpx;
			margin-bottom: 20rpx;
		}

		.group {
			@include box-w();
			padding: 0 32rpx;

			.item {
				@include box(100%, 118rpx);
				@include flex-row(space-between);

				&.line {
					border-bottom: 1px solid #EFF0F3;
				}

				&~.item {
					border-top: 1px solid #EFF0F3;
				}

				.caption {
					@include font-set(24rpx, #000, 500);
					line-height: 40rpx;
				}

				.value {
					@include font-set(28rpx, #999, 700);
					line-height: 40rpx;
				}
			}
		}

		.bar {
			@include box(100%, 20rpx, #EFF0F3);
		}
	}
</style>
