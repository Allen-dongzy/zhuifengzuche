<template>
	<view class="use-car-success">
		<view class="center">
			<image class="bg" :src="`${ossUrl}/common/res-success.png`" mode="aspectFill"></image>
			<view class="caption">用车成功！</view>
			<view class="info">祝您用车愉快</view>
		</view>
		<view class="btn" @click="confirm">确定</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ossUrl: this.$ossUrl, // oss
				from: '' // order  orderDetail
			}
		},
		onLoad(e) {
			if (e && e.from) this.from = e.from
		},
		methods: {
			confirm() {
				if (this.from === 'order') uni.$emit('orderRefresh')
				else if (this.from === 'orderDetail') uni.$emit('orderDetailRefresh')
				this.$close(3)
			}
		}
	}
</script>

<style lang="scss">
	@import '@/static/scss/_mixin.scss';

	.use-car-success {
		height: 100vh;

		.center {
			position: absolute;
			top: 40%;
			left: 50%;
			transform: translateX(-50%) translateY(-50%);
			@include flex-col(flex-start);

			.bg {
				@include box(400rpx, 252rpx);
			}

			.caption {
				@include font-set(32rpx, #000, 700);
				line-height: 44rpx;
				margin-top: 20rpx;
			}

			.info {
				margin: 20rpx auto 0;
				@include font-set(24rpx, #000);
				text-align: center;
				line-height: 34rpx;
				transform: translateX(-10rpx);
			}
		}

		.btn {
			position: fixed;
			bottom: 60rpx;
			left: 50%;
			transform: translateX(-50%);
			@include box(670rpx, 96rpx, #5A7EFF);
			@include flex-center;
			@include font-set(32rpx, #fff, 700);
			border-radius: 52rpx;
			margin-top: 60rpx;
		}
	}
</style>
